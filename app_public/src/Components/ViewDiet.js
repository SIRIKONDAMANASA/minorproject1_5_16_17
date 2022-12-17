import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function ViewDiet(props) {
  
  
  
    const [breakfast, setBreakfast] = useState("idli");
    const [lunch, setLunch] = useState("");
    const [dinner, setDinner] = useState("");
    const [trainer_id, setTrainerId] = useState("");
    
  const token = sessionStorage.getItem('userData');

    const api = '/getalldiet';
    

    
   
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
                setBreakfast(res.data[res.data.length-1].breakfast);
                setLunch(res.data[res.data.length-1].lunch);
                setDinner(res.data[res.data.length-1].dinner);
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
                        <Card.Title>Your Today's Diet</Card.Title>
                        <Card.Text>
                            <p>BreakFast : - {breakfast}</p>
                            <p>Lunch : - {lunch}</p>
                            <p>Dinner : - {dinner}</p>
                        </Card.Text>

                       





                    </Card.Body>
                </Card>

            </div>
        </>
    );
}
