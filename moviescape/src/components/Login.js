import React, { useState } from 'react';

const Login=({LoggedAs,setLoggedAs,SetLoggedAsFunc})=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }

    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }



    return(
        <div className="Login-base-container" >
            
            <br/>
            <div className="Login-header">Login</div>
            
                <div className="Login-content">
                
                    <div className="Login-form">
                        
                        <div className="form-group">
                            <label className="login-register" htmlFor="username" style={{color:"white"}} >Email</label>
                            <input type="text" name="username" placeholder="email" value={email} onChange={handleEmail} />
                        </div>
                        
                        <div className="form-group">
                            <label className="login-register" htmlFor="password" style={{color:"white"}} >Password</label>
                            <input value={password} onChange={handlePassword} type="password" name="password" placeholder="password" />
                        </div>

                        <div>
                            {(localStorage.getItem('No_User_Found')==='true')?
                              <h3 style={{color:"white"}} >INVALID CREDENTIALS, TRY AGAIN </h3>
                              :false                            
                            }
                        </div>
                    
                    </div>
                </div>
  
            <div className="Login-footer">
            
                <button type="button" className="confirm-login" onClick={
                    async()=>{
                        const LoginInfo={
                            email,
                            password
                        };
                        const response=await fetch('/Login',{
                            method: "POST",
                            headers: {
                                "Content-Type":"application/json"
                            },
                            body: JSON.stringify(LoginInfo)
                        }).then(response=>response.json().then(data=>{
                            
                            if(data['message'].length!==13){
                                localStorage.setItem('type',data['message'][5]);
                                localStorage.setItem('No_User_Found','false');
                                localStorage.setItem('UserID',data['message'][0]);
                                localStorage.setItem('UserName',data['message'][1]);
                                localStorage.setItem('UserContact',data['message'][3]);
                                localStorage.setItem('UserEmail',data['message'][4]);
                                window.location.href="/";
                            }

                            else{
                                localStorage.setItem('No_User_Found','true');
                                window.location.href='/Login';
                            }

                        }));

                    }

                } >
                    Login
                </button>
            
            </div>
      </div>
    );
}

export default Login;