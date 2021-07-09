import React, { useState } from 'react';

const Register=()=>{

    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [contact,setContact]=useState('');
    const [email,setEmail]=useState('');
    const [isRegistered,setIsregistered]=useState("");

    const handleUserName=(e)=>{
        setUserName(e.target.value);
    }

    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }

    const handleContact=(e)=>{
        setContact(e.target.value);
    }

    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }

    return(
        <div className="Login-base-container" >
            
            <br/>
            <div className="Login-header">Enter Information</div>
            
                <div className="Login-content">
            
                    <div className="Login-form">
                        
                        <div className="form-group">
                            <label className="login-register" htmlFor="username" style={{color:"white"}} >Full Name</label>
                            <input value={username} onChange={handleUserName} type="text" name="username" placeholder="your name" />
                        </div>
                        
                        <div className="form-group">
                            <label className="login-register" htmlFor="password"  style={{color:"white"}}>Password</label>
                            <input value={password} onChange={handlePassword} type="password" name="password" placeholder="password" />
                        </div>

                        <div className="form-group"> 
                            <label className="login-register" htmlFor="contact" style={{color:"white"}}>Contact</label>
                            <input value={contact} onChange={handleContact} type="text" name="contact" placeholder="contact" />
                        </div>
                        
                        <div className="form-group">
                            <label className="login-register" htmlFor="email" style={{color:"white"}}>Email</label>
                            <input value={email} onChange={handleEmail} type="email" name="email" placeholder="email" />
                        </div>

                        <div>
                            {(isRegistered==="SUCCESS")?<h3 style={{color:"white"}} >SUCCESSFULLY REGISTERED, YOU MAY LOGIN FROM THE HOME PAGE</h3>:false}
                            {(isRegistered==="FAILURE")?<h3 style={{color:"white"}} >A USER WITH THAT EMAIL ALREADY EXISTS, TRY CHANGING YOUR EMAIL</h3>:false}
                        </div>
                    
                    </div>
                </div>
  
            <div className="Login-footer">
            
                <button type="button" className="confirm-login" onClick={
                    async()=>{
                        const User={
                            username,
                            password, 
                            contact,
                            email
                        };
                        const response=await fetch('/Register',{
                            method: "POST",
                            headers: {
                                "Content-Type":"application/json"
                            },
                            body: JSON.stringify(User)
                        }).then(response=>response.json().then(data=>{
                            console.log(data['message'])

                            if(data['message']==="SUCCESS"){
                                setIsregistered("SUCCESS");
                            }else{
                                setIsregistered("FAILURE");
                            }

                        }));
    
                        /*if(response.ok){
                            console.log('HAHA response is working',response);
                        }
                        
                        else{
                            console.log('HAHA not successful');
                        }*/
                        
                    }
                } >
                    Register
                </button>
            
            </div>
      </div>
    );
}

export default Register;