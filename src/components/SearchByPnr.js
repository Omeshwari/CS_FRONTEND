import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from "axios";
import React, {Component} from "react";
import { Card, Form, Button, Table } from "react-bootstrap";

export default class SearchByPnr extends Component{

    constructor(props){
        super(props);
        this.state = {
            pnrNo:'',
            tickets:[]
        }
    };

    pnrSearch = (e) => {
        this.setState({pnrNo: e.target.value});
    };


    searchBooking = (e) => {
        e.preventDefault();
        console.log("Omu")
            axios.get("http://localhost:8092/booking/getby/"+this.state.pnrNo)
                .then(response =>{
                    console.log(response.data)
                    this.setState({tickets:response.data});    
                })
                .catch(Error => console.log(Error))
    };



    render(){
        return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>Search</Card.Header>
                    <Form onSubmit ={this.searchBooking}
                    action="/${pnrNo}">
                        <Form.Label>Search By PNR No.</Form.Label>
                        <Form.Control required autoComplete="off"
                            type="text" name="pnrNo"
                            value={this.state.pnrNo}
                            onChange={this.pnrSearch}
                            className={"bg-dark text-white"}
                            placeholder="Enter PNR No." />
                        <Card.Footer>
                            <Button size="sm" variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSearch} />Search 
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
                <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <h4>Your Searched ticketss</h4>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Passenger Name</th>
                                    <th>Sex</th>
                                    <th>Age</th>
                                    <th>Class</th>
                                    <th>Quota</th>
                                    <th>Address</th>
                                    <th>Adults</th>
                                    <th>Childrens</th> 
                                    <th>Date of Birth</th>
                                    <th>Pnr No.</th>
                                    <th>Payment Status</th>
                                    {/* <th>Train No.</th> */}
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tickets.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="9">{this.state.tickets.length} Booking Available..</td>
                                    </tr>:
                                        this.state.tickets.map((tickets) => (
                                        <tr key={tickets.passengerName}>
                                            <td>{tickets.passengerName}</td>
                                            <td>{tickets.passengerSex}</td>
                                            <td>{tickets.passengerAge}</td>
                                            <td>{tickets.passengerClass}</td>
                                            <td>{tickets.quota}</td>
                                            <td>{tickets.passengerAddress}</td>
                                            <td>{tickets.adults}</td>
                                            <td>{tickets.childrens}</td>
                                            <td>{tickets.dob}</td>
                                            <td>{tickets.pnrNo}</td>
                                            <td>{tickets.payment}</td>
                                            {/* <td>{tickets.trainNo}</td>    */}
                                            </tr>
                                    ))
                                }       
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </div>
        )
    }
}