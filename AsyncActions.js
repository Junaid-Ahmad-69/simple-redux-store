const redux = require('redux');
const axios = require('axios');
const applyMiddleware = redux.applyMiddleware
const thunkMiddleWare = require('redux-thunk').default;
const createStore = redux.createStore;


// My Observation About Thunk
const initialValue = {
    error: "",
    user: [],
    isLoading: false
}

const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            }
        case "requested":
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: "",
            }
        case "rejected":
            return {
                ...state,
                isLoading: false,
                user: [],
                error: action.payload
            }


        default:
            return state
    }
}


const fetchUser = () => {
    return function (dispatch) {

        dispatch({type: "loading"})
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => {
                const user = response.data.map(user => user.id)
                dispatch({type: "requested", payload: user})
            }).catch((error) => {
            dispatch({type: "rejected", payload: (error.message)})
        })
    }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleWare))
store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(fetchUser())