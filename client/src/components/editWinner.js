import React from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

export default function EditWinner() {
    const params = useParams();
    const [winner, setWinner] = useState("") //default string is empty

    
    return (
        <div>
            You are here to edit {params.id}
            <div className="form">
                <label htmlFor="name">Winner: </label>
                <input
                    type="text"
                    className="form-control"
                    id="winner"
                    value={form.winner}
                    onChange={(e) => updateForm({ name: e.target.value })}
                />
            </div>
        </div>
    )
}