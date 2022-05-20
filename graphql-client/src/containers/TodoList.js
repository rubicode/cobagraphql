import React, { useEffect } from 'react'
import TodoItem from '../components/TodoItem'

import { useSelector, useDispatch } from 'react-redux'
import { loadTodo, resendTodo, removeTodo } from '../actions/todo'

export default function TodoList(props) {
    const todos = useSelector((state) => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTodo())
    }, [dispatch])


    const nodeList = todos.map(item => (
        <TodoItem key={item._id} title={item.title} sent={item.sent} remove={() => dispatch(removeTodo(item._id))} resend={() => dispatch(resendTodo(item._id, item.title))} />
    ))
    return (
        <ol className="mt-3">
            {nodeList}
        </ol>
    )

}