import React from "react";

export default function About(props) {
  return (
    <>
      <div className="heroimage-div">
        <img src="../images/covers/aboutus_main.jpg" alt="" />
        <div className="centered">ABOUT US</div>
      </div>

      {/* about us description */}
      <div className="about-description-div">
        <div className="about-decription-text">
          <div>
            <h2>What Is Sweat4fit ?</h2>
            <p>
              Sweat4fit is the world's online fitness and nutrition community. The company started its journey as a final year Capstone project in Web Design and Development Program and decided to help those who struggle finding right Trainer and Nutritionist. Today, it is one of the most informative and engaging fitness communities where anyone from the world can conncet with our certified Trainers.
            </p>
            <p>
            An International Student who is passionate about fitness wants to create a collaborative environment for the General population to get them fit and adopt a good lifestyle. He always assists, guide, and share knowledge that could be helpful to any age on social media and WhatsApp.Hence, he decided to design an environment using the latest tech to give an excellent experience to his group members. You will wonder that all 3 of us are the only ones who did development, design, and Idea.
            </p>
            <p>
              The Sweat4fit web application serves as a one-stop solution for all health and fitness guidance and related needs. Through its freemium model, Sweat4fit offers free access to a host of industry-standard diet and training through trainers, a number of other cutting-edge features, and a community of fitness experts and enthusiasts. Users can get personalised guidance, customised plans and weekly follow-ups with one of Sweat4fit's 500+ certified coaches by paying a small premium.
            </p>

            <p>
              At Sweat4fit, we provide a safe space that is free of judgement. Till date, we have helped transform the health and lifestyle of more than ***** people from across the globe and from all walks of life.
            </p>
          </div>

        </div>
       
      </div>
    </>
  );
}
