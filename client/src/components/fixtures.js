import React, { useState, useEffect } from 'react';
import Link from "react-router-dom";
const Fixture = (props) => (
    <tr>
      <td>{props.name_1_name}</td>
      <td>{props.name_2_name}</td>
      {/* <td>{props.fixture.}</td> */}
      {/* <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </td> */}
    </tr>
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
                    name_1_name = {fixture.name_1_name}
                    name_2_name = {fixture.name_2_name}
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