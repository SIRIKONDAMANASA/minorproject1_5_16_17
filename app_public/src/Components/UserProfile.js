import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function UserProfile(props) {

    const [image, setImage] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [trainer, setTrainerId] = useState("");

    const api = '/userprofile';
    const token = sessionStorage.getItem('userData');

    React.useEffect(() => {
        axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {

                sessionStorage.setItem('trainerid', res.data.trainer_id);

                setImage(res.data.user.profileImage);
                setFname(res.data.user.firstname);
                setLname(res.data.user.lastname);
                setRole(res.data.user.role_id);
                setEmail(res.data.user.email);
                setGender(res.data.user.gender);
                setMobile(res.data.user.mobile_no);
                setTrainerId(res.data.trainer_id);
                setId(res.data.user._id);

            }).catch((error) => {
                console.log(error)
            });

    }, [])
    console.log(trainer);
    let history = useHistory();

    const [uderid, setId] = useState([]);

    return (
        <>
            <p className="userprofile-heading">Profile</p>

            <div className="userprofile-div">

                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={image} style={{ backgroundImage: "url('../images/profile.png')", width: "15rem", height: "15rem", backgroundSize: 'cover', overflow: 'hidden' }} />
                    <hr />
                    <Card.Body>
                        <Card.Title>{fname} {lname}</Card.Title>
                        <Card.Text>
                            <p>Role : -  {role == 1 ? (
                                "Trainer"
                            ) : (
                                "Trainee"
                            )}</p>
                            <p>Email : - {email}</p>
                            <p>Gender : - {gender}</p>
                            <p>Mobile number : - {mobile}</p>
                        </Card.Text>

                        <Link className="nav-link" aria-current="page" to="/editprofile">
                            Edit Profile
                        </Link>
                        <Link className="nav-link" aria-current="page" to="/resetpassword">
                            Reset Password
                        </Link>
                        {role == 1 ? (
                            <>
                                {trainer == null ? (
                                    <>
                                        <Link className="nav-link" to="/addtrainerdocuments">
                                            Add Trainer Details
                                        </Link>

                                    </>
                                ) : (
                                    <>
                                        <Link className="nav-link" to="/edittrainer">
                                            Edit Trainer Details
                                        </Link>
                                        <Link className="nav-link" aria-current="page" to="/edittraineravailability">
                                            Edit Availability
                                        </Link>
                                        <Link className="nav-link" aria-current="page" to="/viewtrainees">
                                            View Trainees
                                        </Link>
                                       
                                    </>

                                )}

                            </>
                        ) : (
                            <>
                                                            </>

                        )}
                          {role == 2 ? (
                            <>
                                {(
                                    <>
                                        <Link className="nav-link" to="/viewdiet">
                                            ViewDiet
                                        </Link>
                                        <Link className="nav-link" to="/viewexercises">
                                            ViewExercises
                                        </Link>
                                        
                                    </>

                                )}

                            </>
                        ) : (
                            <>
                                                            </>

                        )}
                         
                            
                           





                    </Card.Body>
                </Card>

            </div>
        </>
    );
}
