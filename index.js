// 1) What is redux ?
// In simple words, Redux is a popular JavaScript library used to manage the state of an application
// in a predictable and organized way. It is often used with React, but it can be used with other front-end frameworks as well.

// Imagine your application's state as a single object that holds all the data relevant to your app.
// This state represents the current condition of your app and can be modified as users interact with it. In a small application,
// managing this state might not be too difficult, but as your app grows in complexity, it can become challenging to handle state
// changes and ensure everything stays consistent.

// Redux steps in to solve this problem by providing a centralized store where all your applications
// state is kept. The state in the Redux store is read-only, which means the only way to change it is by
// dispatching specific actions.



// 2) What is action in redux ?
// An action is a plain JavaScript object that describes what happened in your app,
// and it contains a type and optional payload (additional data).

// 3) What is  Reducer ?
// To update the state, you create functions called reducers. These reducers take the current state and the dispatched action,
// and based on the action type, they produce a new updated state. Crucially, reducers are pure functions, meaning they don't
// modify the original state but instead create a new state object reflecting the changes.

// 4) What is combinedReducer ?
// If you have multiple reducers and assign to one store to first make one root reducer to using combineReducers and also import the combineReducers
// example
// import { combineReducers } from 'redux';
// const rootReducer = combineReducers({
//     user: userReducer,
//     product: productReducer,
// });
// const store = createStore(rootReducer);

// 5) What is createStore ?
// createStore is a function provided by Redux, a popular JavaScript library for managing application state.
// It is used to create a Redux store, which is the central data repository that holds the state of your entire application.
// The createStore function is a core part of Redux and is typically called only once in your application to create the store.
// It takes a single argument, which is the root reducer of your application. The root reducer is a combined reducer that you create using combineReducers

// 6) What is store.getState() ?
// store.getState() is a method provided by Redux that allows you to access the current state stored in the Redux store.
// The Redux store holds the complete state tree of your application, which represents the current condition of your app.
// The store.getState() method is used to retrieve this state at any given point in your application.
// It does not take any arguments and simply returns the current state object.


// 7)  What is subscribe in redux ?
// In Redux, subscribe is a method provided by the Redux store that allows components or other parts of your application to listen for
// changes to the state. When the state in the Redux store updates, all the subscribed listeners are notified, enabling them to react
// to the state changes and update their views accordingly.
// The subscribe method returns a function unsubscribe, which you can call later if you want to stop listening to state changes.
// It's not always necessary to explicitly unsubscribe, but it can be helpful to avoid unnecessary updates if a component is no longer in use

// 8) What is Middleware in redux ?
// In Redux, middleware is a powerful extension point that allows you to augment the behavior of the Redux store
// and intercept actions before they reach the reducers. It sits between the dispatching of an action and the moment
// it reaches the reducers, enabling you to add extra functionality to the Redux data flow.
// Middleware in Redux follows a concept known as "function composition," where each middleware receives the dispatch and
// getState functions as arguments and returns a function that takes the next middleware in the chain.
// The last middleware in the chain will receive the actual dispatch function, which sends the action to the reducers.
// The middleware can perform various tasks, such as logging actions, making asynchronous API calls, modifying actions,
// or dispatching additional actions based on certain conditions. Common use cases for middleware include handling asynchronous
// actions, logging, error reporting, and routing.

// 9) Apply middleware
// applyMiddleware is a function provided by Redux that allows you to enhance the behavior of the Redux store by
// applying middleware to it. Middleware in Redux is a way to intercept and modify actions before they reach the reducers,
// enabling you to add extra functionality to the data flow.
// The applyMiddleware function takes one or more middleware functions as arguments and returns a store enhancer.
// A store enhancer is a higher-order function that extends the capabilities of the Redux store. When you apply middleware
// using applyMiddleware, it wraps the dispatch method of the store and intercepts the actions before passing them on to the next middleware or the reducers.

// 1) Store
// 2) createStore
// 3) CombinedReducer
// 4) Middleware
// 5) Redux Logger
// 6) Apply middleware
// 7) Redux-Thunk
//8) Subscribe

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