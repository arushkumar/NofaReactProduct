import React from "react";
import './homepage.css';
import Card from "../components/basic/Card";
import {Col, FormGroup} from "reactstrap"

export default function Index() {

  
  return (
    <div>
      <div className="container text-center">
        <h1 className="masthead-heading text-uppercase mb-0">Nofa Applications</h1>
        <div className="border-bottom-4"></div>

        <FormGroup row>
          {/* <Card
            title="AB434 Master with Files Only"
            image="HCD_logo.png"
            drupalLink="/AB434Master/apply"
          /> */}
        
          <Card
            title="Program with Files Only"
            image="HCD_logo.png"
            drupalLink="/Program/apply"
          />
        
          {/* <Card
            title="AB434 100% Online"
            image="HCD_logo.png"
            drupalLink="/AB434Online/apply"
          /> */}

          <Card
            title="Homekey"
            image="homekey.png"
            // drupalLink="/Homekey20"
          />
          
        

        
       
          <Card
            title="Housing Accelerator"
            image="accelerator.png"
            // drupalLink="/housing-accelerator/create"
            
          />

          <Card
            title="CalHome Disaster"
            image="HCD_logo.png"
          />

         

          
          <Card
            title="CalHome General"
            image="HCD_logo.png"
          />
          
      
       
          <Card
            title="Joe Serna - Single Family"
            image="HCD_logo.png"
          />

          <Card
            title="Joe Serna - Multi-Family"
            image="HCD_logo.png"
          />
          <Card
            title="PLHA Formula"
            image="HCD_logo.png"
          />

        
          <Card
            title="LHTF"
            image="HCD_logo.png"
          />

          <Card
            title="PLHA Competitive"
            image="HCD_logo.png"
          />

      </FormGroup>

        
      </div>
    </div>
  );

}

