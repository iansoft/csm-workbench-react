import React from 'react'
import Footer from './Footer'
import AddTodo  from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
    //console.log("Start TODO Widget!")
    <div>
        Hello World
        <AddTodo  tag="徐守安" />
        <VisibleTodoList />
        <Footer />
    </div>
)

export default App