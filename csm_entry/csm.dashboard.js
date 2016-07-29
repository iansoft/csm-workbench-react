import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from '../csm_widgets/todos/reducers/index'
import App from '../csm_widgets/todos/components/App'
import {addTodo, setVisibilityFilter, toggleTodo, VisibilityFilters} from '../csm_widgets/todos/actions/index'

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