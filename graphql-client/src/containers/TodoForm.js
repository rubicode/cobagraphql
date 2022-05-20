import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../actions/todo'

export default function TodoForm(props) {
    const [title, setTitle] = useState('')

    const dispatch = useDispatch()

    const titleChange = useCallback((event) => {
        setTitle(event.target.value)
    }, [])

    const onSave = useCallback((event) => {
        event.preventDefault()
        dispatch(addTodo(title))
        setTitle('')
    }, [title, props, dispatch])

    return (
        <form onSubmit={onSave}>
            <input className="form-control mb-3" type="text" name="title" value={title} onChange={titleChange} />
            <button className="btn btn-success" type="submit">simpan</button>
        </form>
    )

}