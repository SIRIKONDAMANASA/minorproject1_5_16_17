import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

export default function ContactUs(props) {

  const popUp = (event)=>
  {
    alert("your query has been submitted");
  }
  return (
    <>
      <div className="heroimage-div">
        <img src="../images/covers/contactus_main.jpg" alt="" />
        <div className="centered">CONTACT US</div>
      </div>

      <div className="contactus-div">
        <div className="contactus-form-div">
          <Form onSubmit={popUp}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter your Name" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="Subject" placeholder="Enter Subject" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as= "textarea" rows={8} placeholder="Enter Message" required/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="contactus-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.3856086862706!2d-80.40696748505678!3d43.38986907743759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b9018e9e89adf%3A0x2043c24369ede07e!2sConestoga%20College%20Kitchener%20-%20Doon%20Campus!5e0!3m2!1sen!2sca!4v1648517817312!5m2!1sen!2sca"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            width={600}
            height={450}
            title="myFrame"
          />
        </div>
      </div>
    </>
  );
}
