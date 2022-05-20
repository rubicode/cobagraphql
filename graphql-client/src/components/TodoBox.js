import React from 'react'
import { Link } from 'react-router-dom'
import TodoForm from '../containers/TodoForm'
import TodoList from '../containers/TodoList'


export default function TodoBox(props) {

    return (
        <div className="container">
            <Link to='/' className="btn btn-success">Kembali ke home</Link>
            <TodoForm />
            <TodoList />
        </div>
    )

}