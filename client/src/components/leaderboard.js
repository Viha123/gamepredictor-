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
        <div className="flex flex-col items-center pt-24 min-h-[100vh]">
            <h1 className="mt-[7vh] text-4xl text-green-300">
                Leaderboard
            </h1>
            <ul>
                {showLeaderboard()}
            </ul>
        </div>
    )
}