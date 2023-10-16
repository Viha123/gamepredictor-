import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export default function EditWinner() {
    const params = useParams();
    const navigate = useNavigate();

    const [winner, setWinner] = useState("") //default string is empty

    function updateWiner(val) {
        return (
            setWinner(val)
        )
    }
    async function onSubmit(e) {
        e.preventDefault();
        alert(winner)
        await fetch(`http://localhost:3000/fixtures/${params.id}/update`, {  // Enter your IP address here

            method: 'POST',
            mode: "cors",
            body: JSON.stringify({winner: winner}),
            headers: {
                'Content-Type': 'application/json'
              },
         
        });

        navigate("/fixtures");


    }
    return (
        <div>
            You are here to edit {params.id}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Winner: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="winner"
                        value={winner}
                        onChange={(e) => updateWiner(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Winner"
                        className="btn btn-primary"
                    />
                </div>
            </form>

        </div>
    )
}