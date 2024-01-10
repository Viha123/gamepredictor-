import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const Fixture = (props) => (
<div className="p-6 max-w-sm mx-auto bg-green-100 rounded-xl shadow-md flex items-center space-x-4 hover:scale-105 transform transition duration-300 ease-in-out">
  <div>
    <div className="text-xl font-medium text-black">
      {props.team_1_name} vs {props.team_2_name}
    </div>
    <p className="text-gray-500">
      Winner: {props.winner}
    </p>
    <Link to={`${props.id}/update`} className="text-blue-500 hover:underline">
      Edit Winner
    </Link>
  </div>
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
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
                <Fixture 
                    team_1_name = {fixture.team_1_name}
                    team_2_name = {fixture.team_2_name}
                    winner = {fixture.winner}
                    key = {fixture._id}
                    id = {fixture._id}
                />
              </div>
                
            )
        })
    }
     
    return (
        <div className="flex flex-col justify-center items-center pt-24">
            <h1 className="mt-[7vh] text-4xl text-green-300">
                FIXTURES FOR CRICKET WORLD CUP 2023
            </h1>
            <div className="flex flex-wrap justify-center">
                {create_list()}
            </div>
        </div>


    )
}