import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddContact = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState("");
    const [mob, setMob] = useState("");
    const [address, setAddress] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        const url = "/api/v1/addbooks/create";

        const body = {
            name,
            age,
            gender,
            mob,
            address
        };


        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((response) => navigate("/"))
            .catch((error) => console.log(error.message));
    };

    return (
        <div className="main-con container-fluid d-flex justify-content-center align-items-center h-100vh  bg-info" style={{ backgroundImage: "linear-gradient(to right,rgb(106 171 222), rgb(100 149 194 / 87%), rgb(71 109 148 / 90%), rgb(77 107 141), rgb(79 99 127 / 94%), rgb(68 89 117), rgb(75 93 119 / 95%), rgb(72 93 123 / 80%), rgb(74 105 147), rgb(49, 79, 115), rgb(90 135 187), rgb(67 121 177));)" }}>
            <div className="col-md-6 mt-5">
                <div className="col-md-12">
                    <h1>Add Contact Information</h1></div>
                <div className="card">
                    <div className="card-body"></div>
                    <form >
                        
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="nameInput"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ageInput" className="form-label">
                                Age
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="ageInput"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genderInput" className="form-label">
                                Gender
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="genderInput"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobInput" className="form-label">
                                Mobile
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="mobInput"
                                value={mob}
                                onChange={(e) => setMob(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressInput" className="form-label">
                                Address
                            </label>
                            <textarea
                                className="form-control"
                                id="addressInput"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
                            Submit
                        </button>

                    </form >
                </div>
            </div>
        </div>
    
    );
};

export default AddContact;
