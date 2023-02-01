import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Home = () => {
    return (
        <div>
            <p className='homeTitle'>Just click one of the buttons below pls</p>
            <div className="homeButtons">
                <Link to="/login"><button>Login</button></Link>
                <Link to="/register">Register</Link>

                
            </div>

            <Button variant="primary">Primary</Button>
        </div>
    )
}

export default Home