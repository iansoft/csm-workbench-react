import 'babel-polyfill'
//thunkMiddleware 不但能够让我们的action creator返回action object 还能返回函数
//允许我们 dispatch() 函数
import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
//applyMiddleware，在创建createStore的时候运用applyMiddleware
import { createStore, applyMiddleware } from 'redux'
//一个很便捷的 middleware，用来打印 action 日志
import createLogger from 'redux-logger'

//the todo demo
import todoApp from '../csm_widgets/todos/reducers/index'
import App from '../csm_widgets/todos/components/App'
import {addTodo, setVisibilityFilter, toggleTodo, VisibilityFilters} from '../csm_widgets/todos/actions/index'

//the reddit demo
import { selectReddit, fetchPosts } from '../csm_widgets/reddit/actions/index'
import redditReducers from '../csm_widgets/reddit/reducers/index'
import appReddit from '../csm_widgets/reddit/containers/App'


//第二个参数是可选的, 用于设置 state 初始状态。
//这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 
//那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。
//let store = createStore(todoApp, window.STATE_FROM_SERVER)

let store = createStore(todoApp)

let hello = (name)=>{
    return "hello," + name;
}

//App()

let demoElement = document.getElementById('demo')
render(
    <Provider store={store}>
        <App />
    </Provider>,
    demoElement
)


//运用Reddit Demo
console.log("运用Reddit Demo")
const loggerMiddleware = createLogger()

let redditStore = createStore(
    redditReducers,
    applyMiddleware(
        thunkMiddleware, // 允许我们 dispatch() 函数
        loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
    )
)

let redditElement = document.getElementById('reddit')
render(
    <Provider store={redditStorestore}>
        <App />
    </Provider>,
    redditElement
)


// let testFunc = (indexTag) =>{
//     switch(indexTag){
//         case 1:
//         case 2:
//         case 3:
//             console.log("Doing")
//             return "x"
//         default:
//             console.log("Default")
//             return "y"
//     }
// }

// console.log(testFunc(2)) 

//redditStore.dispatch(selectReddit('reactjs'))
// redditStore.dispatch(fetchPosts('reactjs')).then(() =>
//   console.log(redditStore.getState())
// )

// console.log(store);
// // 打印初始状态
// console.log(store.getState())

// // 每次 state 更新时，打印日志
// // 注意 subscribe() 返回一个函数用来注销监听器
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

// // 发起一系列 action
// store.dispatch(addTodo('Learn about actions'))
// store.dispatch(addTodo('Learn about reducers'))
// store.dispatch(addTodo('Learn about store'))
// store.dispatch(toggleTodo(0))
// store.dispatch(toggleTodo(1))
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// // 停止监听 state 更新
// unsubscribe();