import React, { Component } from "react";
import { Card } from "react-bootstrap";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    
    return (
      <div className="container" style={{ margin: 30, backgroundColor: " green " }}>
        <Card className={"border bg-dark border-light text-light"}>
          <Card.Header><h6>
            <strong> Pakistan </strong> <br/> Railways</h6>
          </Card.Header>
          <Card.Body>
              <div>
              <p>Pakistan Railways (reporting mark PR) (Urdu: پاکستان ریلویز‎) is the national,
                 state-owned railway company of Pakistan.<br/> Founded in 1861 (when Pakistan was part
                  of British India ) and headquartered in Lahore, it owns 7,791 kilometres (4,841 miles)
                   of track across Pakistan from Torkham to Karachi, offering both freight and passenger 
                   services.</p></div>
              <div>
              <p><strong>History: </strong>
              In 1855, during the British Raj, several railway companies began laying track and operating in Sindh and Punjab.
               The country's railway system was originally a patchwork of local rail lines operated by small, private companies, 
               including the Scinde Railway, Punjab Railway, Delhi Railway and Indus Flotilla. In 1870, the four companies combined 
               to form the Scinde, Punjab & Delhi Railway. Several other rail lines were soon built, including the Indus Valley State Railway, 
               Punjab Northern State Railway, Sind–Sagar Railway, Sind–Pishin State Railway, Trans–Baluchistan Railway and Kandahar State Railway. 
               These six companies merged with the Scinde, Punjab & Delhi Railway to form the North Western State Railway in 1880. 
               Between 1880 and 1947, the North Western State Railway expanded throughout Punjab and Sindh. Locomotives were standardised following 
               a report from the Locomotive Committee on Standard Locomotives for Indian Railways, published in 1910.
              </p>
              <p>For more information <a href="https://en.wikipedia.org/wiki/Pakistan_Railways">click here</a></p>
              </div>
          </Card.Body>
        </Card>
      </div>
      
    );
  }
}