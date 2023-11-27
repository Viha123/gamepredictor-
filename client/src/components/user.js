import React, { useState, useEffect} from 'react';
import Link from "react-router-dom";
import { useParams, useNavigate } from "react-router";

export default function User() {

    const params = useParams();
    const navigate = useNavigate();

    const [username, setUserName] = useState(""); //for now the username method is simple

    const [createusername, setCreateusername] = useState("");
    function updateUserName(val) {
        return(
            setUserName(val)
        )
    }
    function toggleCreateUserName(val) {
        return(
            setCreateusername(val)
        )
    }
    async function onSubmitSignIn(e) {
        e.preventDefault();
        alert(`Sign in to account: ${username}`);
    }
    async function onSumbitCreate(e) {
        e.preventDefault();
        //alert(`Create account: ${createusername}`);
        //send create request
        
        navigate("/predictions");
        console.log("reached here?");
        var payload = {
            username: createusername,
            email: "dummyemail@gmail.com",
            predictions: []
        };
        const response = await fetch(`http://localhost:3000/users/create`, {  // Enter your IP address here

            method: 'POST',
            mode: "cors",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
              },
         
        });
        const docDetails = await response.json();
        
        //get id of user here?


    }
    return (
        <div>
            <h1>
                Sign In
            </h1>
            <form onSubmit={onSubmitSignIn}>
                <div className = "form-group">
                    <label>Username: </label>
                    <input 
                        type = "text"
                        className = "form-control"
                        id = "userSignIn"
                        value = {username}
                        onChange={(e)=>updateUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type = "submit"
                        value = "Submit"
                    />
                </div>
            </form>
            <h1>
                OR Create an Account
            </h1>
            <form onSubmit={onSumbitCreate}>
                <div className = "form-group">
                    <label>Create User: </label>
                    <input 
                        type = "text"
                        className = "form-control"
                        id = "userCreate"
                        value = {createusername}
                        onChange={(e)=>toggleCreateUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type = "submit"
                        value = "Submit"
                    />
                </div>
            </form>
        </div>

    )
}