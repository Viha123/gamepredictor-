import  React, {useState, useEffect} from 'react';
import Link from "react-router-dom";

export default function(){
    // const [users, setUsers] = useState([]);
    // useEffect(() => {
    //     async function getUsers() {
    //       const response = await fetch(`http://localhost:3000/users/`);
     
    //       if (!response.ok) {
    //         const message = `An error occurred: ${response.statusText}`;
    //         window.alert(message);
    //         return;
    //       }
     
    //       const predictions = await response.json();
    //       setUsers(predictions);
    //       console.log(predictions);
    //     }
    //     console.log("here");
    //     getUsers();
    //     return;
    //   }, [users.length]);
    return(
        <h1>
            PERSONALIZED PREDICTION PAGE FOR USERNAME
        </h1>
    )
}