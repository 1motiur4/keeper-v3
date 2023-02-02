import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Home = () => {
    let navigate = useNavigate();

    return (
        <div className='homeButtons'>
            <h3>Click one of the buttons below pls</h3>
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