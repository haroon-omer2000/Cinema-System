import React, { useState } from 'react';

const Feedback=()=>{

    const [feedback,setFeedback]=useState('');

    const feedbackHandler=(e)=>{
        setFeedback(e.target.value);
    }

    const submitFeedback=async(a)=>{

        var userID=localStorage.getItem('UserID');
        var userName=localStorage.getItem('UserName');
        var userContact=localStorage.getItem('UserContact');
        var userEmail=localStorage.getItem('UserEmail');

        const feedbackObj={
            userID,
            userName,
            userEmail,
            userContact,
            feedback
        };

        const response=await fetch('/SubmitFeedback',{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(feedbackObj)
        }).then(response=>response.json().then(data=>{
            if(data['message']==="OK"){
                window.location.href="/";
            }
        }));


    }

    return(
        <div className="feedback-container">
            <br/>
            <h1 className="Now-Showing">Enter your feedback</h1>
            <br/>
            <textarea onChange={feedbackHandler} rows="10" className="feedback" placeholder="Your comments..."></textarea>
            <br/>
            <button type="button" className="confirm-login" onClick={async()=>{await submitFeedback("a")}} >Submit Feedback</button>
        </div>
    );
}

export default Feedback;