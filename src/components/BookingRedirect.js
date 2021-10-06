import Button from "@restart/ui/esm/Button";
import React, {Component} from "react";
import { Card ,Table,} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBabyCarriage, faList, faMehBlank, faPallet, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import axios from "axios";


export default class BookingRedirect extends Component{
   
    constructor(props){
        super(props);
        this.state = {
            pnrNo:'',
            tickets:[]
        }
    };

    componentDidMount(){
        this.findAllBooking();
    };

    findAllBooking = (e) =>{
        axios.get("http://localhost:8092/booking/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({tickets: data})
            }); 
    };
    render(){
        return(
            <div>
                <Card className="border bg-dark border-light text-light">
                <Card.Header as="h5"><FontAwesomeIcon icon={faList}/> Booking Details </Card.Header>
                <Card.Body>
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
                                    <th>Action</th>
                                
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
                                            {/* <td>{tickets.trainNo}</td>  */}
                                            <td>
                                            <Link to={"/checkout"} className="btn btn-outline-primary btn-sm"><FontAwesomeIcon icon={faPiggyBank} /> Pay </Link>    
                                            </td>  
                                            </tr>
                                    ))
                                }       
                            </tbody>
                        </Table>
                </Card.Body>
                </Card>
            </div>
        );
    }
}