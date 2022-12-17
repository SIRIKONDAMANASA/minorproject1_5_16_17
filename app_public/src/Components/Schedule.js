import React, { useState } from "react";
import {
  Tab,
  Row,
  Col,
  Card,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function Schedule(props) {

  const [schedulebyday, setScheduleByDay] = useState([]);
  const [dayselecteed, SetDayselected] = useState("Please Select a Day");

  function setdayidonclick(dayid) {

    const token = sessionStorage.getItem('userData');

    const schedulebydaysapi = '/schedule/' + dayid;

    axios.get(schedulebydaysapi, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {

        setScheduleByDay(res.data);

        SetDayselected(res.data.schedule[0].day_id.day_name);

      }).catch((error) => {
        console.log(error)
      });


  }

  let history = useHistory();

  function trainerDescriptionFn(trainerid) {
    history.push({
      pathname: '/trainerdetails',
      id: trainerid
    });
  }

  return (
    <>
      <div className="heroimage-div">
        <img src="../images/covers/schedule_main.jpeg" alt="" />
        <div className="centered">SCHEDULE</div>
      </div>

      <div className="schedule-div">
        <Tab.Container id="left-tabs-example" defaultActiveKey="monday">
          <Row>
            <Col className="schedule-days-nav">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link onClick={() => setdayidonclick("6248d908713b62f7cd3b1f6f")}>MONDAY</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => setdayidonclick("6248d908713b62f7cd3b1f70")}>TUESDAY</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => setdayidonclick("6248d908713b62f7cd3b1f71")}>WEDNESDAY</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => setdayidonclick("6248d908713b62f7cd3b1f72")}>THURSDAY</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => setdayidonclick("6248d908713b62f7cd3b1f73")}>FRIDAY</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => setdayidonclick("6248d908713b62f7cd3b1f74")}>SATURDAY</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => setdayidonclick("6248d908713b62f7cd3b1f75")}>SUNDAY</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col className="schedule-content" sm={9}>
              <div className="schedule-content-div">
                <Tab.Content>


                  {Object.keys(schedulebyday).length > 0 ? (
                    <>
                      <h2 className="day-name">{dayselecteed}</h2>
                      {schedulebyday.schedule.map((data,index) => (
                        <div key={index}>
                          <div onClick={() => trainerDescriptionFn(data.trainer_id._id)} className="schedule-items">
                            <Card>
                              <Card.Header as="h5">{data.trainer_id.user_id.firstname} {data.trainer_id.user_id.lastname}</Card.Header>
                              <Card.Body>
                                <Card.Text>Availability</Card.Text>
                                <Card.Text>{data.start_time} - {data.end_time}</Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                      ))}

                    </>

                  ) : (

                    <>
                      <h2 className="day-name">{dayselecteed}</h2>
                    </>
                  )}


                </Tab.Content>
              </div>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}
