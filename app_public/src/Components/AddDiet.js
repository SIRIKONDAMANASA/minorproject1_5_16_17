import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function AddDiet(props) {

    let history = useHistory();
    const token = sessionStorage.getItem('userData');
    const trainer_id = sessionStorage.getItem('trainerid');
 
    
    const [lunch, setLunch] = useState("");
    const [breakfast, setBreakfast] = useState("");
    const [dinner, setDinner] = useState("");
    const location = useLocation();

    useEffect(() => {
    }, [location]);
    
    console.log(location.tid);
    const [trainee, setTrainee] = useState(location.tid);
    console.log(trainee);

    const editdiet = (event) => {

        event.preventDefault();

        var data = {

            trainee: event.target.trainee.value,
            breakfast: event.target.breakf.value,
            lunch: event.target.lunch.value,
            dinner: event.target.dinner.value
           
        }

        axios({
            method: 'post',
            url: '/adddiet',
            data: data,
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {

            console.log("Updating diet=", res);
            alert("Diet updated Successfully");
            history.push('/userprofile');

        }).catch((err) => {
            console.log("in catch");
            console.log(err);
        });

    }

    return (
        <>
            <p className="addtrainerdocuments-heading">Add Trainee Diet</p>

            <div className="addtrainerdocuments-div">

                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Text>
                            <form onSubmit={editdiet} >

                                <p>Trainee : - <span><textarea id="trainee" name="trainee" placeholder={trainee} defaultValue={trainee}  required /></span></p>

                                <p>BreakFast : - <span><textarea id="breakf" name="breakf" placeholder="Enter diet for Breakfast" rows="1" cols="50" defaultValue={breakfast} required /></span></p>

                                <p>Lunch : - <span><textarea id="lunch" name="lunch" placeholder="Enter diet for lunch" defaultValue={lunch} rows="1" cols="50" required /></span></p>

                                <p>Dinner : - <span><textarea  id="dinner" name="dinner" placeholder="Enter diet for dinner" min="18" max="70" defaultValue={dinner} required /></span></p>

                                <input type="submit" className="update-btn" value="Submit" />
                            </form>

                        </Card.Text>

                    </Card.Body>
                </Card>

            </div>

        </>
    );
}
