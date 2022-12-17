import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function EditProfile(props) {


    const api = '/userprofile';
    const token = sessionStorage.getItem('userData');
    let history = useHistory();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");

    React.useEffect(() => {
        axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {

                setFname(res.data.user.firstname);
                setLname(res.data.user.lastname);
                setGender(res.data.user.gender);
                setMobile(res.data.user.mobile_no);

            }).catch((error) => {
                console.log(error)
            });
    }, [])


    const updateClicked = (event) => {

        event.preventDefault();

        var profileImage = event.target.imageselect.files[0];

        var firstname = event.target.fname.value;
        var lastname = event.target.lname.value;
        var gender = event.target.gender.value;
        var mobile_no = event.target.phone.value;

        const data = new FormData();

        data.append("firstname", firstname);
        data.append("lastname", lastname);
        data.append("gender", gender)
        data.append("mobile_no", mobile_no);
        data.append("profileImage", profileImage);

        axios({
            method: 'post',
            url: api,
            data: data,
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" }
        }).then(res => {

            console.log("data=", res);
            history.push('/userprofile');

        }).catch((err) => {
            console.log("in catch");
            console.log(err);
        });
    }
    return (
        <>
            <p className="editprofile-heading">Edit Profile</p>

            <div className="userprofile-div">

                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Text>
                            <form onSubmit={updateClicked}>
                                <Form.Group controlId="formFileLg" className="mb-3">
                                    <Form.Label>Please Select Profile Photo : - </Form.Label>
                                    <Form.Control type="file" size="lg" name="imageselect" accept="image/*" />
                                </Form.Group>

                                <p>First Name : - <span><input type="Text" id="text" name="fname" placeholder="Enter First Name" defaultValue={fname} required /></span></p>
                                <p>Last Name : - <span><input type="Text" id="text" name="lname" placeholder="Enter Last Name" required defaultValue={lname} /></span></p>

                                {/* <p>Email : - <span><input type="email" id="email" name="email" placeholder="Enter Email" /></span></p> */}
                                <p>Gender : -
                                    <span>
                                        <input type="radio" id="male" name="gender" value="Male" required />
                                        <label htmlFor="male">Male</label>
                                        <input type="radio" id="female" name="gender" value="Female" />
                                        <label htmlFor="female">Female</label>
                                    </span></p>
                                <p>Mobile number : -
                                    <span>
                                        <input type="tel" id="phone" name="phone" placeholder="1234567890" pattern="[0-9]{10}" defaultValue={mobile} required />
                                        <small>Format: 1234567890</small>
                                    </span></p>
                                <input type="submit" className="update-btn" value="Update" />
                            </form>

                        </Card.Text>

                    </Card.Body>
                </Card>

            </div>

        </>
    );
}