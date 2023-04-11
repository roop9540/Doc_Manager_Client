import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Userlogg } from '../App'
// import Logo from '../images/'





function Navbar() {
    let { loggedIn, setLoggedIn } = useContext(Userlogg)
    let {token, setToken} = useContext(Userlogg)


    return (
        <>

            <div className='bg-primary  opacity-100 navbar h-50'>

                <nav className="navbar container navbar-expand-lg py-2  sticky-top" data-bs-theme="dark">
                    <div className="container">
                        <div className='d-flex w-100 align-items-center justify-content-between'>
                            <div className='icon'>
                                <a className="navbar-brand" href="/"><img src={"/images/logo-no-background.png"} className="py-2" style={{width: '12rem'}}/></a>
                                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <img src='../images/logo-no-background.png' />
                                </button> */}
                            </div>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center ">
                                 {token?<li className="nav-item m-3 fs-5" style={{textDecoration:"none"}}>
                                        {/* <a className="nav-link active" aria-current="page" href="/home">Home</a> */}
                                        <NavLink to="/home"  style={{ textDecoration: 'none' }}>Home</NavLink>

                                        {/* <NavLink to="/home" >Home</NavLink> */}
                                    </li>:""}   
                                {!token?
                                        <li className="nav-item m-3 fs-5">
                                            {/* <a className="nav-link" href="/about">LogIn</a> */}
                                            <NavLink to="/"  style={{ textDecoration: 'none' }}>   LogIn</NavLink>
                                        </li> :
                                         <li className="nav-item m-3 fs-5" onClick={() => {
                                            localStorage.clear();
                                            setToken("")
                                        }} >
                                            {/* <a className="nav-link" href="/about">LogIn</a> */}
                                            <NavLink to="/" style={{ textDecoration: 'none' }}>Logout</NavLink>
                                        </li>}
                                        {!token?
                                    <li className="nav-item m-3 fs-5">
                                        {/* <a className="nav-link" href="/services">Register</a> */}
                                        <NavLink to="/register" style={{ textDecoration: 'none' }}>Register</NavLink>
                                    </li> :""}

                                    {/* <li className="nav-item m-3 fs-5">
                                        <a className="nav-link" href="/contact">Contact</a>
                                    </li> */}

                                </ul>

                            </div>
                        </div>
                    </div>
                </nav>
            </div>

    
        </>
    )
}

export default Navbar
