import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Register() {
  const history = useHistory();
  const getDetails = (event) => {

    event.preventDefault();
    var lastName;
    const fName = event.target.fName.value;
    const lName = event.target.lName.value;
    const email = event.target.email.value;
    const mobile = event.target.mobileno.value;
    const password = event.target.password.value;
    const gender = event.target.inlineRadioOptions.value;
    const role_id = event.target.role.value;

    axios.post('/register', {
      firstname: fName,
      lastname: lName,
      email: email,
      mobile_no: mobile,
      password: password,
      gender: gender,
      role_id: role_id
    }).then(res => {
      if (res.request.status == '201') {
        alert("Successful registered");
        history.push('/login');
        console.log('posting data', res.request.status);

        const authObject = { 'Private-Key': '176c5eb2-ca45-470e-92de-2cdedd1b6827' }

        // post request to create user
        try {
          if(role_id == 1){
            lastName = lName+' -Trainer'
          }
          axios.post(
            "https://api.chatengine.io/users/",
            {
              'username': fName+'_'+lName,
              'secret': password,
              'email': email,
              'first_name': fName,
              'last_name': lastName
            }, // Body object
            { 'headers': authObject } // Headers object
          ).then(r => { console.log(r) })
        } catch (error) {
          console.log(error)
        }
      }

    }).catch(err => {
      alert("Email is already registered.");
      document.getElementById("register-form").reset();
    }
    );
  }

  return (
    <div className="container my-3">

      <h2 className="page-title">Register</h2>
      <form id='register-form' onSubmit={getDetails}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" className="form-control" name="fName" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" className="form-control" name="lName" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="mobileno">Mobile No:</label>
          <input type="number" className="form-control" name="mobileno" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password(Minimun 8 characters):</label>
          <input type="password" className="form-control" name="password" minLength="8" required />
        </div>


        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Male" required />
          <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Female" required />
          <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Others" required />
          <label className="form-check-label" htmlFor="inlineRadio3">Others</label>
        </div>
        <div className="form-group">
          <label htmlFor="roleid">Role:</label>
          <select name="role" required>
            <option value="2">Trainee</option>
            <option value="1">Trainer</option>
          </select>

        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  )
}
