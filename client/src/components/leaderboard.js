import  React, {useState, useEffect} from 'react';
import Link from "react-router-dom";
const ListMember = (props) => (
    <tr 
        key = {props.index}
        className="even:bg-zinc-600 odd:bg-zinc-700">
            <td className="text-left">{props.user.username}</td>
            <td className="text-left">{props.user.score}</td> 
    </tr>
    );
    
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
            
            return <ListMember index = {index} user = {user}/>
        })
    }
    return(
        <div className="flex flex-col items-center pt-24 min-h-[100vh]">
            <h1 className="mt-[7vh] text-4xl text-green-300">
                Leaderboard
            </h1>
            <table className="border-solid w-[30vw]" >
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {showLeaderboard()}
                    
                </tbody>
                
            </table>
            
        </div>
    )
}