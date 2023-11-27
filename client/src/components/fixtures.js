import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const Fixture = (props) => (

    <div>
      <h3> 
        {props.team_1_name} vs {props.team_2_name} -> Winner: {props.winner} 
        <Link to = {`${props.id}/update`}>Edit Winner</Link>
        <button>View Details</button>  
      </h3>
      
    </div>
   );

   
   
export default function Fixtures() {
    const [fixtures, setFixtures] = useState([]);
    useEffect(() => {
        async function getFixtures() {
          const response = await fetch(`http://localhost:3000/fixtures/`);
     
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
     
          const fixtures = await response.json();
          setFixtures(fixtures);
        }
     
        getFixtures();
     
        return;
      }, [fixtures.length]);

    function create_list(){
        return fixtures.map((fixture)=>{
            return (
                <Fixture 
                    team_1_name = {fixture.team_1_name}
                    team_2_name = {fixture.team_2_name}
                    winner = {fixture.winner}
                    key = {fixture._id}
                    id = {fixture._id}
                />
            )
        })
    }
     
    return (
        <div>
            <h1>
                FIXTURES FOR CRICKET WORLD CUP 2023
            </h1>
            <div>
                {create_list()}
            </div>
        </div>


    )
}