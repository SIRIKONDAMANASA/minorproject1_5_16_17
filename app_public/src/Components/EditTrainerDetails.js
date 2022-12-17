import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function EditTrainerDetails(props) {

    let history = useHistory();
    const token = sessionStorage.getItem('userData');
    const trainer_id = sessionStorage.getItem('trainerid');
 
    const [experience, setExperience] = useState("");
    const [skills, setSkills] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        
        axios.get('/trainers/'+trainer_id, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {

                setExperience(res.data.trainer.experience);
                setSkills(res.data.trainer.skills);
                setDescription(res.data.trainer.description);
                setAge(res.data.trainer.age);

            }).catch((error) => {
                console.log(error)
            });
        },[]);


    const edittrainerdocuments = (event) => {

        event.preventDefault();

        var data = {

            experience: event.target.experience.value,
            skills: event.target.skills.value,
            description: event.target.description.value,
            age: event.target.age.value
        }

        axios({
            method: 'put',
            url: '/trainers/'+trainer_id,
            data: data,
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {

            console.log("Updating trainer details=", res);
            alert("Details updated Successfully");
            history.push('/userprofile');

        }).catch((err) => {
            console.log("in catch");
            console.log(err);
        });

    }

    return (
        <>
            <p className="addtrainerdocuments-heading">Edit Trainer's Details</p>

            <div className="addtrainerdocuments-div">

                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Text>
                            <form onSubmit={edittrainerdocuments} >

                                <p>Experience : - <span><input type="Number" id="experience" name="experience" placeholder="Enter Experience in number of years" defaultValue={experience} min="0" max="52" required /></span></p>

                                <p>Skills : - <span><textarea id="skills" name="skills" placeholder="Enter your Skills" rows="1" cols="50" defaultValue={skills} required /></span></p>

                                <p>Description : - <span><textarea id="description" name="description" placeholder="Enter your Description" defaultValue={description} rows="1" cols="50" required /></span></p>

                                <p>Age : - <span><input type="Number" id="age" name="age" placeholder="Enter your Age" min="18" max="70" defaultValue={age} required /></span></p>

                                <input type="submit" className="update-btn" value="Submit" />
                            </form>

                        </Card.Text>

                    </Card.Body>
                </Card>

            </div>

        </>
    );
}
