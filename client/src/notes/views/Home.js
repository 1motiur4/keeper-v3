import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <p className='homeTitle'>Just click one of the buttons below pls</p>
            <Link to="/login" className='loginLink'>Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Home