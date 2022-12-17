import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Trainers(props) {

  let history = useHistory();

  const [alldata, setData] = useState([]);

  const api = '/trainers/';
  const token = sessionStorage.getItem('userData');


  React.useEffect(() => {

    axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {

        setData(res.data);

      }).catch((error) => {
        console.log(error)
      });

  }, [])


  function trainerDescriptionFn(trainerid) {
    history.push({
      pathname: '/trainerdetails',
      id: trainerid
    });
  }


  return (
    <>
      <div className="heroimage-div">
        <img src="../images/covers/all_trainer_main.jpg" alt="" />
        <div className="centered">TRAINERS</div>
      </div>

      <div className="trainers-div">

        {alldata.map((data,index) => (
          <div key={index}>
            <div className="trainer-item" onClick={() => trainerDescriptionFn(data._id)}>
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={data.user_id.profileImage} style={{ backgroundImage: "url('../images/profile.png')", width: "100%", height: "15rem", backgroundSize: 'cover', overflow: 'hidden' }} />
                <Card.Body>
                  <Card.Title>{data.user_id.email}</Card.Title>
                  <Card.Text>
                    {data.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        ))}

      </div>
    </>
  );
}