import React, {Component} from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBookReader, faSave } from "@fortawesome/free-solid-svg-icons";
import Mytoastbook from './Mytoastbook';
import axios from "axios";
import { BrowserRouter, Redirect } from "react-router-dom";

export default class BookTicket extends Component{
     
    constructor(props){
        super(props);
        this.state = this.initialState;
        this.submitTicket = this.submitTicket.bind(this);
        this.bookTicket = this.bookTicket.bind(this);
    }

    initialState = {
        passengerName:'',
        passengerClass:'', 
        passengerSex:'', 
        passengerAddress:'', 
        quota:'', 
        adults:'',
        passengerAge:'', 
        childrens:'', 
        dob:'',
        pnrNo:'',
        payment: '',
        trainNo:'',
        isTicketBooked: false
    }

    submitTicket = event => {
        event.preventDefault();

        const bookTicket = {
            passengerName:  this.state.passengerName,
            passengerClass:  this.state.passengerClass,
            passengerSex:  this.state.passengerSex,
            passengerAddress: this.state.passengerAddress,
            quota: this.state.quota, 
            adults: this.state.adults,
            passengerAge: this.state.passengerAge,
            childrens: this.state.childrens,
            dob: this.state.dob,
            pnrNo: this.state.pnrNo,
            payment: this.state.payment,
            trainNo: this.state.trainNo
        };

        axios.post("http://localhost:8092/booking/book/add", bookTicket)
           .then(response => {
            if(response.data != null){
                this.setState({"isTicketBooked": true});
                setTimeout(() => this.setState({"isTicketBooked": false}), 3000);
            }else{
                this.setState({"isTicketBooked": false});
            }
        });
        this.setState(this.initialState);
    };
    
    bookTicket = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render(){
        if(this.state.isTicketBooked){
            <BrowserRouter>
                return <Redirect to = "/bookingredirect" />;
            </BrowserRouter>
        }
        const {passengerName, passengerClass, passengerSex, passengerAddress, quota, adults,passengerAge, childrens, dob } = this.state;
        return(    
            <div>
                <div style={{"display": this.state.isTicketBooked ? 'block': "none"}}>
                    <Mytoastbook isTrainCreated={this.state.isTrainCreated} message={"Ticket with PNR :"+ this.state.pnrNo+  "please proceed to payment!!"} type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faBookReader} />  Book Ticket</Card.Header>
                <Form onSubmit={this.submitTicket} id="bookTicketId">
                    <Card.Body>
                        <Row>
                            <Form.Group controlId="formGridPassengerName">
                            <Form.Label>Passenger Name</Form.Label>
                            <Form.Control required
                                type="text" name="passengerName"
                                className="bg-dark text-white"
                                value={passengerName}
                                onChange={this.bookTicket}
                                placeholder="Enter Passenger Name" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group controlId="formGridQuota">
                                <Form.Label>Quota</Form.Label>
                                    <Form.Select defaultValue="Choose.." required
                                        type="select" name="quota"
                                        value={quota}
                                        onChange={this.bookTicket}
                                        className="bg-dark text-white">
                                        <option>Choose..</option>
                                        <option value="General">General</option>
                                        <option value="Ladies">Ladies</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group controlId="formGridPassengerSex">
                                <Form.Label>Passenger Sex</Form.Label>
                                    <Form.Select defaultValue="Choose.." required
                                        type="select" name="passengerSex"
                                        value={passengerSex}
                                        onChange={this.bookTicket}
                                        className="bg-dark text-white">
                                        <option>Choose..</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group controlId="formGridPassengerClass">
                                <Form.Label>Passenger Class</Form.Label>
                                    <Form.Select defaultValue="Choose.." required
                                        type="select" name="passengerClass"
                                        value={passengerClass}
                                        onChange={this.bookTicket}
                                        className="bg-dark text-white">
                                        <option>Choose..</option>
                                        <option value="Sitting">Sitting</option>
                                        <option value="Sleeper">Sleeper</option>
                                        <option value="Ac">Ac</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group controlId="formGridPassengerAddress">
                            <Form.Label>Passenger Address</Form.Label>
                            <Form.Control required
                                type="text" name="passengerAddress"
                                value={passengerAddress}
                                onChange={this.bookTicket}
                                className="bg-dark text-white"
                                placeholder="Enter Passenger Address" />
                            </Form.Group>
                        </Row> 
                        <Row>
                            <Col>
                                <Form.Group controlId="formGridDob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control required
                                    type="date" name="dob"
                                    value={dob}
                                    onChange={this.bookTicket}
                                    className="bg-dark text-white"
                                     />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGridPassengerAge">
                                <Form.Label>Passenger Age</Form.Label>
                                <Form.Control required
                                    type="text" name="passengerAge"
                                    value={passengerAge}
                                    onChange={this.bookTicket}
                                    className="bg-dark text-white"
                                    placeholder="Enter Passenger Age" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGridAdults">
                                <Form.Label>No of Adults</Form.Label>
                                <Form.Control required
                                    type="text" name="adults"
                                    value={adults}
                                    onChange={this.bookTicket}
                                    className="bg-dark text-white"
                                    placeholder="Enter No. of Adults" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGridChildrens">
                                <Form.Label>No of Childrens</Form.Label>
                                <Form.Control required
                                    type="text" name="childrens"
                                    value={childrens}
                                    onChange={this.bookTicket}
                                    className="bg-dark text-white"
                                    placeholder="Enter No. of Childrens" />
                                </Form.Group>
                            </Col>
                        </Row>   
                    </Card.Body>
                    <Card.Footer style={{textAlign:"right"}}>
                        <Button variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} />    Book Ticket
                        </Button>{  }
                    </Card.Footer>
                </Form>
            </Card>
            </div>
            
           
        )
    }
}