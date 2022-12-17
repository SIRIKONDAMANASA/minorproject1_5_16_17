import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TrainerDetails(props) {

    const location = useLocation();

    useEffect(() => {
    }, [location]);


    const api = '/trainers/' + location.id;

    const token = sessionStorage.getItem('userData');

    const [image, setImage] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    React.useEffect(() => {
        axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                
                setImage(res.data.trainer.user_id.profileImage);
                setFname(res.data.trainer.user_id.firstname);
                setLname(res.data.trainer.user_id.lastname);
                setSkills("" + res.data.trainer.skills);
                setExperience(res.data.trainer.experience);
                setAge(res.data.trainer.age);
                setDescription(res.data.trainer.description);
                setEmail(res.data.trainer.user_id.email);
                setMobile(res.data.trainer.user_id.mobile_no);

            }).catch((error) => {
                console.log(error)
            });
    }, [])


    return (
        <>
            <p className="trainerdetails-heading">Trainer Details</p>

            <div className="trainerdetails-div">
                <dir className="trainerdetails-image">
                    <img src={image} style={{ backgroundImage: "url('../images/profile.png')", width: "20rem", height: "30rem", backgroundSize: 'cover', overflow: 'hidden' }} alt="user image" />
                </dir>
                <div className="trainerdetails-text">
                    <div>
                        <h2>{fname} {lname}</h2>
                        <p><b>Skills</b> : - <span>{skills}</span></p>
                        <p><b>Experience</b> : - <span>{experience} Years</span></p>
                        <p><b>Age</b> : - <span>{age} Years</span></p>
                        <p><b>Email</b> : - <span>{email}</span></p>
                        <p><b>Mobile</b> : - <span>{mobile}</span></p>
                        <p><b>Description</b> : - <span>{description}</span></p>
                    </div>
                </div>
            </div>

        </>
    );
}
