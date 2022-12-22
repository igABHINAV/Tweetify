import React, { useContext } from 'react'
import AuthContext from '../context/ConTexT'
import { Link } from 'react-router-dom'
const NavBar = () => {
    let { userauth, logoutuser } = useContext(AuthContext)
    return (
        <div>

            {
                userauth ? (
                    <>
                        <div className="container">
                            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

                                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                                    <li><Link to="/" className="nav-link active px-2 link-secondary" >Home</Link></li>
                                    <li><Link to="/add" className="nav-link active px-2 link-secondary" >Add your Tweetie</Link></li>
                                    <li><Link to="/posts" className="nav-link active px-2 link-secondary" >Your Tweeties</Link></li>
                                </ul>
                                <div className="col-md-3 text-end">
                                    <button type="button" onClick={logoutuser} className="btn btn-primary">Log Out</button>
                                </div>

                            </header>
                        </div>

                    </>
                ) : (
                    <>
                        <div className="container">
                            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

                                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                                    <li><Link to="/" className="nav-link px-2  disabled link-secondary">Home</Link></li>
                                    <li><Link to="/add" className="nav-link px-2 disabled  link-secondary">Add your Tweetie</Link></li>
                                    <li><Link to="/posts" className="nav-link px-2 disabled  link-secondary">Your Tweeties</Link></li>
                                </ul>
                                <div className="col-md-3 text-end">
                                    <Link to='/login' className="btn btn-outline-primary me-2">Log In</Link>
                                    <Link to='/signup' className="btn btn-outline-primary me-2">Sign In</Link>
                                </div>

                            </header>
                        </div>
                    </>
                )
            }


        </div>
    )
}

export default NavBar
