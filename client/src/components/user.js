import React, { useState, useEffect } from "react";
import Link from "react-router-dom";
import { useParams, useNavigate } from "react-router";

export default function User() {
  const params = useParams();
  const navigate = useNavigate();

  const [username, setUserName] = useState(""); //for now the username method is simple

  const [createusername, setCreateusername] = useState("");
  const [createEmail, setEmail] = useState(""); //don't need email while signing in
  const [pass, setPass] = useState("");
  const [signInPass, setSignInPass] = useState("");
  const [signUpdone, setSignUpdone] = useState(false);
  function updateUserName(val) {
    return setUserName(val);
  }
  function toggleCreateUserName(val) {
    return setCreateusername(val);
  }
  function toggleCreateEmail(val) {
    return setEmail(val);
  }
  async function onSubmitSignIn(e) {
    e.preventDefault();
    alert(`Sign in to account: ${username}`);
    //before this we need to authenticate the user. 
    //send username and password to server and check if it is correct
    const postres = await fetch(`http://localhost:3000/users/user/auth`, {
      // Enter your IP address here
      method: "POST",
      mode: "cors",
      body: JSON.stringify({username: username, password: signInPass}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(postres);
    if (postres.status == 400){
      alert("Incorrect Password");
      return;
    }
    const response = await fetch(`http://localhost:3000/users/data/${username}`);

    //response has the data of the username
    const data = await response.json();
    console.log(data)
    if (data.length == 0){
      alert(`This username does not exist, Sign Up first`)

    }
    else{
      const id = data[0]._id;
      navigate(`${id}/predictions`);
    }
    


  }
  async function onSumbitCreate(e) {
    e.preventDefault();
    //alert(`Create account: ${createusername}`);
    //send create request

    console.log("reached here?");
    var payload = {
      username: createusername,
      email: createEmail,
      password: pass,
    };
    const response = await fetch(`http://localhost:3000/users/create`, {
      // Enter your IP address here

      method: "POST",
      mode: "cors",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const docDetails = await response.json();
    console.log(docDetails);
    setSignUpdone(true);
    //get id of user here?
  }
  return (
    <div className="flex flex-col items-center pt-24 min-h-[100vh]">
      <h1 className="mt-[7vh] text-4xl text-green-300">Sign In</h1>
      <form onSubmit={onSubmitSignIn}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            className="form-control bg-zinc-900 border-2 border-green-300 text-green-300"
            id="userSignIn"
            value={username}
            onChange={(e) => updateUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className="form-control bg-zinc-900 border-2 border-green-300 text-green-300"
            id="signInPass"
            value={signInPass}
            onChange={(e) => setSignInPass(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input 
          type="submit" 
          value="Submit" 
          className="m-3 bg-green-300 hover:scale-110 text-black font-bold py-2 px-4 transform active:scale-90 transition duration-150 "

        />
        </div>
      </form>
      {signUpdone ? (<div> Sign Up Done! </div>) : (<div> Create an account to get started :)</div>)}

      <h1>OR Create an Account</h1>
      <form onSubmit={onSumbitCreate}>
        <div className="form-group">
          <label>Create User: </label>
          <input
            type="text"
            className="form-control bg-zinc-900 border-2 border-green-300 text-green-300"
            id="userCreate"
            value={createusername}
            onChange={(e) => toggleCreateUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>User Email: </label>
          <input
            type="text"
            className="form-control bg-zinc-900 border-2 border-green-300 text-green-300"
            id="emailCreate"
            value={createEmail}
            onChange={(e) => toggleCreateEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className="form-control bg-zinc-900 border-2 border-green-300 text-green-300"
            id="passCreate"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Submit"
          className="m-3 bg-green-300 hover:scale-110 text-black font-bold py-2 px-4 transform active:scale-90 transition duration-150 "
          />
        </div>
      </form>
    </div>
  );
}
