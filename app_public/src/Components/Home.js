import React from "react";
import { Carousel } from "react-bootstrap";
import Card from "react-bootstrap/Card";

export default function Home(props) {

  return (
    <>
      {/* carousel */}
      <div className="carousel-div">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../images/covers/cover1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Build Your Body Strong</h3>
              <p>Ready to change your physique?</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../images/covers/cover2.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Make yourself healthy</h3>
              <p>Trust The Grounds Guys professionals to take care of your health</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../images/covers/cover3.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Talk to out professionals</h3>
              <p>
                Want to change your lifestyle but don't know where to start?
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* home description */}
      <div className="home-description-div">
        <div className="home-description_description">
          <h3>All About</h3>
          <h2>
            <b>
              <span style={{ color: "#FF5656" }}>YOUR</span> FITNESS
            </b>
          </h2>
          <p>
          If there is one word that best sums up the state of fitness today, it's “personalized.” The reason is simple. Everyone starts different and everyone has different goals. Women want to lose weight, men want to build muscle and both want to look their best. No matter what your goal, be it weight loss or bulking up, you will have a hard time achieving those without a proper workout routine.
          </p>
        </div>
        <div className="home-description_video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Z63w5PefxTQ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div>

      {/* testimonial */}
      <div className="testimonial-div">
        <h2 style={{ color: "#FF5656" }}>Our Happy Clients</h2>
        <Carousel>
          <Carousel.Item>
            <div className="testimonial-item">
              <p>Helped me a lot to change my lifestyle</p>
              <img
                style={{ width: "5rem" }}
                src="../images/testimonial/1.png"
                alt=""
              />
              <p>
                Me and my friend have been having joint session with a professional trainer on Sweat4fit for the past 3 weeks. I can't recommend him enough, He listened to what we both wanted and has worked with us both to set our individual targets. Over the past 10 weeks he has learnt what both our strangths and weaknesses are and set us program for us.
              </p>
              <img
                style={{ width: "2rem" }}
                src="../images/testimonial/quotes.png"
                alt=""
              />{" "}
              <br />
              <br />
              <p>
                <b>Celly Jordan</b>
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="testimonial-item">
              <p>Awesome Experience</p>
              <img
                style={{ width: "5rem" }}
                src="../images/testimonial/2.png"
                alt=""
              />
              <p>
                After years of almost-nearly-not quite getting back in to training. I knew i needed to seek out a Personal Trainer who woukd motivate me in the way i needed to keep coming back week after week.
              </p>
              <img
                style={{ width: "2rem" }}
                src="../images/testimonial/quotes.png"
                alt=""
              />{" "}
              <br />
              <br />
              <p>
                <b>Roberta</b>
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="testimonial-item">
              <p>Worth do it once</p>
              <img
                style={{ width: "5rem" }}
                src="../images/testimonial/3.png"
                alt=""
              />
              <p>
                i have been training with Sweat4fit for almost a year now. Trainer has some good understanding of my training objectives and has consistently designed programmers that meet my aims. He strikes a good balance between pushing me, making me feel i can always achieve more than i think. He is always attentive through each session, and i very much feel i get value for money.
              </p>
              <img
                style={{ width: "2rem" }}
                src="../images/testimonial/quotes.png"
                alt=""
              />{" "}
              <br />
              <br />
              <p>
                <b>Emma Shiafkou</b>
              </p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>      
  </>
  );
}
