import React, { Component } from 'react';
import axios from 'axios';
import {Form, Card, Table, Row, Col, Button} from "react-bootstrap";
import {  faBox, faSearch } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

export default class SearchTrain extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      train_startStation: "",
      train_endStation: "",
      date: "",
      tickets:[]
    }
  }

  changeHandler1 = (e) =>{
    this.setState({
        train_startStation: e.target.value,
    });
}

changeHandler2 = (e) =>{
    this.setState({
        train_endStation: e.target.value
    });
}

dateHandler = (e) =>{
    this.setState({
        date: e.target.value
    });
}


submitHandler=(e) => {
  e.preventDefault()
  console.log("Omu")
    axios.get("http://localhost:8091/trains/getby/"+this.state.train_startStation+"/"+this.state.train_endStation+"/"+this.state.date)
    .then(response => 
      {console.log(response.data)
      this.setState({tickets:response.data});
    })
    .catch(err=> console.log(err))
  }

  
  render() {
    return (
      <div>
        <Form
        onSubmit={this.submitHandler} action={"/${train_startStation}/${train_endStation}/${departureDate}"}>
            <Card className = "border bg-dark border-light text-light">
              <Card.Body>
                <Row>
                  <Col>
                    <label> Source </label>
                        <Form.Select aria-label="Default select example"
                      name="train_startStation" 
                      value={this.state.train_startStation} 
                      onChange={this.changeHandler1}>
                        <option value="Choose Option"> Choose Option </option>
                        <option value="Karachi City"> Karachi City </option>
                          <option value="Peshawar"> Peshawar </option>
                          <option value=" Karachi Cant"> Karachi Cant </option>
                          <option value=" Sialkot"> Sialkot </option>
                          <option value="Lahore"> Lahore </option>
                          <option value="Rawalpindi"> Rawalpindi </option>
                        </Form.Select>
                  </Col><br />

                  <Col>
                    <label> Destination </label>
                      <Form.Select aria-label="Default select example"
                      name="train_endStation" 
                      value={this.state.train_endStation} 
                      onChange={this.changeHandler2}>
                      <option value="Choose Option"> Choose Option </option>
                        <option value="Karachi City"> Karachi City </option>
                        <option value="Lahore"> Lahore </option>
                        <option value="Multan"> Multan </option>
                        <option value="Rawalpindi"> Rawalpindi </option>
                        <option value="Quetta"> Quetta </option>
                        <option value="Mianwali"> Mianwali </option>
                      </Form.Select>
                  </Col><br />

                  <Col>
                      <label>Date</label>
                      <Form.Select aria-label="Default select example"  
                          name="departureDate" 
                          value={this.state.date} 
                          onChange={this.dateHandler}>
                        <option value="Choose Option"> Choose Option </option>
                        <option value="2021-09-20"> 2021-09-20 </option>
                        <option value="2021-07-15"> 2021-07-15 </option>
                        <option value="2021-08-01"> 2021-08-01 </option>
                        <option value="2021-04-30"> 2021-04-30 </option>
                        <option value="2021-06-09"> 2021-06-09 </option>
                        <option value="2021-03-08"> 2021-03-08 </option>
                      </Form.Select>
                  </Col><br />
                </Row>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" variant="success" type="submit">
                  <FontAwesomeIcon icon={faSearch} /> Search 
                </Button>
              </Card.Footer>
             
          </Card>
        </Form>
        <br/>

                  <div className="trainsSearch">
                  <Card className = "border bg-dark border-light text-light">

                    <h4>Your Searched Trains</h4>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr align="center">
                                <th>Train Id</th>
                                <th>Train Name</th>
                                <th>Start Station</th>
                                <th>End Station</th>
                                <th>Date</th>
                                <th>Duration</th> 
                                <th>No of Seats</th>
                                <th>Sitting Fare</th>
                                <th>Sleeper Fare</th>
                                <th>Ac Fare</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tickets.length === 0 ?
                                <tr align="center">
                                    <td colSpan="9">{this.state.tickets.length} Trains Available..</td>
                                </tr>:
                                this.state.tickets.map((train) => (
                                    <tr key={train.id} align="center">
                                        <td>{train.train_id}</td>
                                        <td>{train.train_name}</td>
                                        <td>{train.train_startStation}</td>
                                        <td>{train.train_endStation}</td>
                                        <td>{train.date}</td>
                                        <td>{train.time_duration}</td>
                                        <td>{train.no_of_seats}</td>
                                        <td>
                                          {train.sittingFare}&nbsp;
                                          <Link to={"/bookTicket"} className="btn btn-outline-primary btn-sm"><FontAwesomeIcon icon={faBox} /> Book </Link>
                                        </td>
                                        <td>
                                          {train.sleeperFare}&nbsp;
                                          <Link to={"/bookTicket"} className="btn btn-outline-primary btn-sm"><FontAwesomeIcon icon={faBox} /> Book </Link>
                                          </td>
                                        <td>
                                          {train.acFare}&nbsp;
                                          <Link to={"/bookTicket"} className="btn btn-outline-primary btn-sm"><FontAwesomeIcon icon={faBox} /> Book </Link>
                                          </td>   
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