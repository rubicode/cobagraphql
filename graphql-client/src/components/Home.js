import React, { Fragment, useCallback } from 'react'

import { Link, useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate()

    const move = useCallback(() => {
        navigate('todo')
    })

    return (
        <Fragment>
            <h1>Selamat Datang di TODO APP</h1>
            <Link to="/todo">Ke aplikasi</Link>
            <button type="button" className="btn btn-warning" onClick={move}>Pindah ke todo</button>
        </Fragment>
    )
}