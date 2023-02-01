import React from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Home = () => {
    let navigate = useNavigate();

    return (
        <div className='homeButtons'>
            <p className='homeTitle'>Just click one of the buttons below pls</p>


            <div className="container">
                <div className="col">
                    <Button
                        onClick={() => { navigate("/login") }}>
                        Login
                    </Button>
                    <Button
                        onClick={() => { navigate("/register") }}>
                        Register
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home