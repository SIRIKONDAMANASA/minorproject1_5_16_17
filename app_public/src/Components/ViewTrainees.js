import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ViewTrainees(props) {

  let history = useHistory();

  const [alldata, setData] = useState([]);

  const api = '/gettrainees';
  const token = sessionStorage.getItem('userData');
  console.log(token);
  


  React.useEffect(() => {

    axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {

        setData(res.data);
        console.log(res.data);

      }).catch((error) => {
        console.log(error)
      });

  }, [])


  function addingdietFn(traineeid) {
    console.log(traineeid);
    history.push({
      pathname: '/adddiet',
      tid: traineeid
    });
  }
  function addingexerciseFn(traineeid) {
    console.log(traineeid);
    history.push({
      pathname: '/addexercises',
      tid: traineeid
    });
  }


  return (
    <>
      <div className="heroimage-div">
        <img src="../images/covers/all_trainer_main.jpg" alt="" />
        <div className="centered">TRAINEES</div>
      </div>

      <div className="trainers-div">

        {alldata.map((data,index) => (
          <div key={index}>
            <div className="trainer-item" >
              <Card style={{ width: "20rem" }}>
                <Card.Body>
                  <Card.Title >{data.firstname} {data.lastname}</Card.Title>
                  <Card.Text>{data.email}</Card.Text>
                  <Card.Text>{data.gender}</Card.Text>
                  <Button variant="danger" onClick={() => addingdietFn(data._id)}>
                    Add diet
                  </Button>
                  <Button variant="danger" onClick={() => addingexerciseFn(data._id)}>
                    Add Exercise
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        ))}

      </div>
    </>
  );
}