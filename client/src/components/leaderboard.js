import  React, {useState, useEffect} from 'react';
import Link from "react-router-dom";

export default function(){
    const [leaderboard, setLeaderboard] = useState([]);
    useEffect(() => {
        async function getLeaderboard() {
          const response = await fetch(`http://localhost:3000/users/group/leaderboard`);
    
          if (!response.ok) {
            console.log("error");
            return;
          }
          const data = await response.json();
          console.log(data);
          setLeaderboard(data);
        }
        getLeaderboard();
    }, [])
    function showLeaderboard(){
        return leaderboard.map((user, index) => {
            
            return <li key = {index}>{user.username} {user.score}</li>
        })
    }
    return(
        <h1>
            Leaderboard 
            <ul>
                {showLeaderboard()}
            </ul>
        </h1>
    )
}