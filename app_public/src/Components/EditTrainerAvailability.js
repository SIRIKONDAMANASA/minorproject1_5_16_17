import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function EditTrainerAvailability(props) {

    const token = sessionStorage.getItem('userData');

    const getavailabilityapi = '/gettraineravailability';

    const [traineravailability, setAvailability] = useState([]);

    React.useEffect(() => {

        axios.get(getavailabilityapi, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {

                setAvailability(res.data);

            }).catch((error) => {
                console.log(error)
            });

    }, [])

    const addavailabilityapi = '/addtraineravailability';

    const addavailability = (event) => {

        var body = {
            day_id: event.target.days.value,
            start_time: event.target.starttime.value,
            end_time: event.target.endtime.value
        }

        event.preventDefault();

        axios({
            method: 'post',
            url: addavailabilityapi,
            data: body,
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {

            alert("Your day slot is updated!!!!!");
            window.location.reload(false);

        }).catch((err) => {
            console.log(err)
        });
    }


    function deleteavailability(availabilityid) {
        const deleteavailabilityapi = '/deletetraineravailability/' + availabilityid;

        axios.delete(deleteavailabilityapi, { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {

            alert("Slot Deleted Successfully");
            window.location.reload(false);


        }).catch((error) => {
            console.log(error)
        });
    }


    return (
        <>
            <p className="edittraineravailability-heading">Edit Trainer Availability</p>

            <div className="edittraineravailability-div">

                <div className="edittraineravailability-display">
                    <p className="edittraineravailability-div-heading">Availability</p>

                    {traineravailability.map(data => (
                        <div className="edittraineravailability-items">
                            <Card>
                                <Card.Header as="h5">{data.day_id.day_name}</Card.Header>
                                <Card.Body>
                                    <Card.Text>{data.start_time} -{data.end_time}</Card.Text>

                                    <Button onClick={() => deleteavailability(data._id)} variant="primary">Delete</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}


                </div>

                <div className="edittraineravailability-addavailability">
                    <p className="edittraineravailability-div-heading">Add Availability</p>

                    <form onSubmit={addavailability} className="edittraineravailability-addavailability-item">
                        <p>Select Day : -
                            <span>
                                <select name="days" id="days">
                                    <option value="6248d908713b62f7cd3b1f6f" selected>MONDAY</option>
                                    <option value="6248d908713b62f7cd3b1f70">TUESDAY</option>
                                    <option value="6248d908713b62f7cd3b1f71">WEDNESDAY</option>
                                    <option value="6248d908713b62f7cd3b1f72">THURSDAY</option>
                                    <option value="6248d908713b62f7cd3b1f73">FRIDAY</option>
                                    <option value="6248d908713b62f7cd3b1f74">SATURDAY</option>
                                    <option value="6248d908713b62f7cd3b1f75">SUNDAY</option>
                                </select>
                            </span>
                        </p>

                        <p>Enter Start Time : -
                            <span>
                                <input type="time" id="appt" name="starttime" min="00:00" max="24:00" required />
                            </span>
                        </p>

                        <p>Enter End Time : -
                            <span>
                                <input type="time" id="appt" name="endtime" min="00:00" max="24:00" required />
                            </span>
                        </p>

                        <input type="submit" className="add-btn" value="Add" />
                    </form>

                </div>

            </div>

        </>
    );
}
