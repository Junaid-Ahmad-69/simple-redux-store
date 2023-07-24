// 1) Store
// 2) createStore
// 3) CombinedReducer
// 4) Middleware
// 5) Redux Logger
// 6) Apply middleware
// 7) Redux-Thunk

// In fetching the data from an api using the store we have three action
// Actions are:
// 1) FETCH_USERS_REQUEST: Fetch the list of users
// 2) FETCH_USERS_SUCCESS: Fetch successful users
// 3) FETCH_USERS_FAILURE: Error fetching the list of users
//
const redux = require('redux');
const reduxLogger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()
const createStore = redux.createStore
const BUY_CAKE = "BUY_CAKE";
const BUY_ICE_CREAM = "BUY_ICE_CREAM";
const combineReducer = redux.combineReducers


function buyCake() {
    return {
        type: BUY_CAKE,
        info: "First Redux Action"
    }
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM,
    }
}

const initialCake = {
    numOfCake: 10,
    numOfIceCream: 20,
}
const initialIceCream = {
    numOfIceCream: 20,
}


const cakeReducer = (state = initialCake, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state, numOfCake: state.numOfCake - 1
            }
        case BUY_ICE_CREAM:
            return {
                ...state, numOfIceCream: state.numOfIceCream - 1
            }
        default:
            return state
    }
}
const iceReducer = (state = initialCake, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM:
            return {
                ...state, numOfIceCream: state.numOfIceCream - 1
            }
        default:
            return state
    }
}

const rootReducer = combineReducer({
    cake: cakeReducer, IceCream: iceReducer,
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()