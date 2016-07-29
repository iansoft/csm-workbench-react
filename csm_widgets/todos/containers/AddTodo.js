import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions/index'

//这里的参数dispatch,newState都是props
let AddTodo = ({ dispatch, newState, tag})=>{
    let ctlText
    console.log(tag);
    return (
        <div>
            <form onSubmit={e=>{
                e.preventDefault()
                if(!ctlText.value.trim()){
                    return
                }
                dispatch(addTodo(ctlText.value))
                ctlText.value = ''
                console.log("add the todo");
                console.log(newState);
            }}>
                <input ref={node=>{
                    ctlText = node
                }} />
                <button type="submit"> Add Todo </button>
            </form>
        </div>
    )
}

const getNewStateAfterAddTodo = (state) => {
    //newState是以props形式传入的
    return {
        newState: state
    }
}

AddTodo = connect(getNewStateAfterAddTodo)(AddTodo)

export default AddTodo