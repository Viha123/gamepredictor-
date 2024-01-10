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
      predictions: [],
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
    navigate(`${docDetails._id}/predictions`);
    //get id of user here?
  }
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={onSubmitSignIn}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            id="userSignIn"
            value={username}
            onChange={(e) => updateUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
      <h1>OR Create an Account</h1>
      <form onSubmit={onSumbitCreate}>
        <div className="form-group">
          <label>Create User: </label>
          <input
            type="text"
            className="form-control"
            id="userCreate"
            value={createusername}
            onChange={(e) => toggleCreateUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>User Email: </label>
          <input
            type="text"
            className="form-control"
            id="emailCreate"
            value={createEmail}
            onChange={(e) => toggleCreateEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
