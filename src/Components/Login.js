import axios from 'axios';
import React, { useState, createContext, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Userlogg } from '../App';

// let logg;

function Login() {
    let { loggedIn, setLoggedIn } = useContext(Userlogg)
    let {token, setToken} = useContext(Userlogg)
    // let loggedIn = userLogged.loggedIn;
    let [update, setUpdate] = useState(0);

    const navigate = useNavigate();


    let [username, setusername] = useState("");
    let [password, setpassword] = useState("");
    
    // logg = loggedIn;

    // console.log(logg)
    async function handleSubmit(e) {
        e.preventDefault();
        // alert("came")
      
        try {
            const res = await axios.post(process.env.REACT_APP_API_BASE_URL + 'user/login', { username: username, password: password })

            if (res.status === 200) {

                alert("post successfully")
                setUpdate(update+1)
                // alert(Object.keys(res))
                navigate("/home")
                let verify = await axios.get(process.env.REACT_APP_API_BASE_URL+'user/profile', {
                    headers: {
                        Authorization: res?.data?.token
                    }
                })
                if (verify.status == 200) {
                    // setLoggedIn(verify?.data?.user?.id);
                    // setToken(verify?.data?.token);
                    localStorage.setItem("userId", verify?.data?.user?.id)
                    localStorage.setItem("token", verify?.data?.token)
                    // alert("Welcome " + verify?.data?.user?.name)
                    window.location.reload();
                    
                    
                   
                }
               

            }
        } catch (err) {

            console.log(err)

            alert("login failed")
        }

    }
    
    

    return (
        <>
            {/* {console.log(loggedIn)} */}

            <div className='home-bg vh-100' >
                <div className='container' >
                    <h1 className='text-center' >Login Form</h1>
                    
                    <div className='d-grid gap-2 col-8 mx-auto mt-3' >
                        <form onSubmit={handleSubmit} >
                           
                            <div className="  mb-3">
                                <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" name='username'
                                    onChange={(e) => { setusername(e.target.value) }}
                                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3">
                                <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" name='password'
                                    onChange={(e) => setpassword(e.target.value)}
                                    className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className='d-grid gap-2 col-8 mx-auto mt-3' > <button type="submit" className="btn btn-primary rounded-pill mt-3">Submit</button></div>

                        </form>
                      
                    </div>
                </div>
            </div>

        </>

    )
}

export default Login

