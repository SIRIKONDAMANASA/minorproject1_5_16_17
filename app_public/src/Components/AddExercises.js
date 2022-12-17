import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function AddExercises(props) {

    let history = useHistory();
    const token = sessionStorage.getItem('userData');
    const trainer_id = sessionStorage.getItem('trainerid');
 
    
    const [mrng, setMrng] = useState("");
    const [evng, setEvng] = useState("");
    const location = useLocation();

    useEffect(() => {
    }, [location]);
    
    console.log(location.tid);
    const [trainee, setTrainee] = useState(location.tid);
    console.log(trainee);

    const editexercise = (event) => {

        event.preventDefault();

        var data = {

            trainee: event.target.trainee.value,
            mrngexs: event.target.mrng.value,
            evngexs: event.target.evng.value,
           
           
        }

        axios({
            method: 'post',
            url: '/addexercise',
            data: data,
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {

            console.log("Updating exercise=", res);
            alert("Exercise updated Successfully");
            history.push('/userprofile');

        }).catch((err) => {
            console.log("in catch");
            console.log(err);
        });

    }

    return (
        <>
            <p className="addtrainerdocuments-heading">Add Trainee Exercises</p>

            <div className="addtrainerdocuments-div">

                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Text>
                            <form onSubmit={editexercise} >

                                <p>Trainee : - <span><textarea id="trainee" name="trainee" placeholder={trainee} defaultValue={trainee}  required /></span></p>

                                <p>Morning Exercises : - <span><textarea id="mrng" name="mrng" placeholder="Enter Exercises for Morning" rows="1" cols="50" defaultValue={mrng} required /></span></p>

                                <p>Evening Exercises : - <span><textarea id="evng" name="evng" placeholder="Enter Exercises for Evening" defaultValue={evng} rows="1" cols="50" required /></span></p>

                                

                                <input type="submit" className="update-btn" value="Submit" />
                            </form>

                        </Card.Text>

                    </Card.Body>
                </Card>

            </div>

        </>
    );
}
