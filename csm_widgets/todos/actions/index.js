let nextTodoId = 0

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const addTodo = (text) => {
    return {
        type:"ADD_TODO",
        id: nextTodoId++,//没增加一条数据，就会编号++
        text //es6会自动转化成 text:value
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type:"SET_VISIBILITY_FILTER",
        filter
    }
}

//隐藏显示数据
export const toggleTodo = (id) => {
    return {
        type:"TOGGLE_TODO",
        id
    }
}