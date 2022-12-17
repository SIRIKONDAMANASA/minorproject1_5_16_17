import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function ViewExercise(props) {
  
  
  
    const [mrng, setMrng] = useState("");
    const [evng, setEvng] = useState("");
   
    const [trainer_id, setTrainerId] = useState("");
    
  const token = sessionStorage.getItem('userData');

    const api = '/getallexercises';
    

    
   
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
   

    React.useEffect(() => {
        axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {

                //sessionStorage.setItem('trainee_id', res.data.trainee_id);
                //console.log(res.data.user)
                //setBreakfast(res.data.user.breakfast);
                //setLunch(res.data.user.dinner);
                //setTrainerId(res.data.user.trainer_id)
                setMrng(res.data[res.data.length-1].MrngExercises);
                setEvng(res.data[res.data.length-1].EvngExercises);
                
                setTrainerId(res.data[res.data.length-1].trainer_id)
                console.log(res.data)
                console.log(res.data[res.data.length-1])
                const api1 = '/trainers/' + trainer_id;
                console.log(trainer_id);
                return axios.get(api1, { headers: { "Authorization": `Bearer ${token}` } });
               
            }).then(res => {
              console.log(res.data[0])
              setFname(res.data[0].user_id.firstname);
              setLname(res.data[0].user_id.lastname);
              

          }).catch((error) => {
              console.log(error)
          });

    }, [])


   
   

    
   

    return (
        <>
            <p className="userprofile-heading">Your Trainer: {fname} {lname}</p>
            <div className="userprofile-div">

                <Card style={{ width: '18rem' }}>
                    
                    <hr />
                    <Card.Body>
                        <Card.Title>Your Today's exercises</Card.Title>
                        <Card.Text>
                            <p>Morning Exercises : - {mrng}</p>
                            <p>Evening Exercises : - {evng}</p>
                        </Card.Text>

                       





                    </Card.Body>
                </Card>

            </div>
        </>
    );
}
