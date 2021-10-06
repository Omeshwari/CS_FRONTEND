import React, {Component} from 'react';
import { Card, Form, Button, Row, Col} from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import MyToast from './MyToast';

export default class AddTrain extends Component{

    constructor(props){
        super(props);
        this.state = this.initailState;  //reference with respect to name
        this.state.isTrainCreated= false;
        this.trainChange = this.trainChange.bind(this);
        this.submitTrain = this.submitTrain.bind(this); 
        // this.state = {
        //                 // step 2
        //                 train_id: this.props.match.params.train_id,
        //                 train_name: '',
        //                 train_startStation:'', 
        //                 train_endStation:'', 
        //                 date:'', 
        //                 time_duration:'',
        //                 no_of_seats:'', 
        //                 sittingFare:'', 
        //                 sleeperFare:'', 
        //                 acFare:''
        //             }
    }

    initailState={
        train_id:'',
        train_name:'', 
        train_startStation:'', 
        train_endStation:'', 
        date:'', 
        time_duration:'',
        no_of_seats:'', 
        sittingFare:'', 
        sleeperFare:'', 
        acFare:'',
        isTrainCreated: false
    };

    // componentDidMount(){
    //     const trainId = +this.props.match.params.train_id;
    //     if(trainId){
    //         this.findTrainById(trainId);
    //     }
    // };

    // findTrainById = (trainId) => {
    //     axios.get("http://localhost:8091/trains/"+trainId)
    //             .then(response =>{
    //                 if(response.data != null){
    //                     this.setState({
    //                         train_id: response.data.train_id,
    //                         train_name: response.data.train_name,
    //                         no_of_seats: response.data.no_of_seats, 
    //                         train_startStation: response.data.train_startStation, 
    //                         train_endStation: response.data.train_endStation, 
    //                         date: response.data.date, 
    //                         time_duration: response.data.time_duration,
    //                         sittingFare: response.data.sittingFare, 
    //                         sleeperFare: response.data.sleeperFare,
    //                         acFare: response.data.acFare
    //                     });
    //                 }
    //             }).catch((error) => {
    //                 console.error("Error - "+error);
    //             });
    // }

    resetTrain = () => {
        this.setState(() => this.initailState);
    };

    submitTrain = event => {
        event.preventDefault();
        
        const train = {
            train_id: this.state.train_id,
            train_name: this.state.train_name,
            no_of_seats: this.state.no_of_seats, 
            train_startStation: this.state.train_startStation, 
            train_endStation: this.state.train_endStation, 
            date: this.state.date, 
            time_duration: this.state.time_duration,
            sittingFare: this.state.sittingFare, 
            sleeperFare: this.state.sleeperFare,
            acFare: this.state.acFare,
        };

        axios.post("http://localhost:8091/trains/addTrain", train)
            .then(response => {
                if(response.data != null){
                    this.setState({"isTrainCreated": true});
                    setTimeout(() => this.setState({"isTrainCreated": false}), 3000);
                }else{
                    this.setState({"isTrainCreated": false});
                }
            });
        this.setState(this.initailState);
    };

    trainChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    trianList = () =>{
        return this.props.history.push('/timetable');
    };

    render= () =>{
        const {train_id, train_name, time_duration, no_of_seats, train_startStation, train_endStation, date, sittingFare, sleeperFare, acFare}=this.state;  //reference with respect to value
        return(
            <div>
                <div style={{"display": this.state.isTrainCreated ? 'block': "none"}}>
                    <MyToast isTrainCreated={this.state.isTrainCreated} message={"Train added Successfully!!"} type={"success"}/>
                </div>
                <div>
                    <Card className="border bg-dark border-light text-light">
                        <CardHeader as="h5"><FontAwesomeIcon icon={faPlusSquare} /> Add Train </CardHeader>
                        <Form onReset={this.resetTrain} onSubmit={this.submitTrain} id="trainFormId">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formGridId">
                                            <Form.Label>Train Id</Form.Label>
                                            <Form.Control required autoComplete="off"
                                                type="text" name="train_id"
                                                value={train_id}
                                                onChange={this.trainChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Train Id." />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={10}>
                                        <Form.Group controlId="formGridTrainName">
                                            <Form.Label>Train Name</Form.Label>
                                            <Form.Control required autoComplete="off"
                                                type="text" name="train_name"
                                                value={train_name}
                                                onChange={this.trainChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Train Name" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formGridStartStation">
                                            <Form.Label>Start Station</Form.Label>
                                            <Form.Select aria-label="Default select example"
                                                name="train_startStation" 
                                                value={train_startStation} 
                                                onChange={this.trainChange}
                                                className={"bg-dark text-white"}>
                                                    <option value="Choose Option"> Choose Option </option>
                                                    <option value="Karachi City"> Karachi City </option>
                                                    <option value="Peshawar"> Peshawar </option>
                                                    <option value=" Karachi Cant"> Karachi Cant </option>
                                                    <option value=" Sialkot"> Sialkot </option>
                                                    <option value="Lahore"> Lahore </option>
                                                    <option value="Rawalpindi"> Rawalpindi </option>
                                                </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formGridEndStation">
                                            <Form.Label>End Station</Form.Label>
                                            <Form.Select aria-label="Default select example"
                                                name="train_endStation" 
                                                value={train_endStation} 
                                                onChange={this.trainChange}
                                                className={"bg-dark text-white"}>
                                                <option value="Choose Option"> Choose Option </option>
                                                    <option value="Karachi City"> Karachi City </option>
                                                    <option value="Lahore"> Lahore </option>
                                                    <option value="Multan"> Multan </option>
                                                    <option value="Rawalpindi"> Rawalpindi </option>
                                                    <option value="Quetta"> Quetta </option>
                                                    <option value="Mianwali"> Mianwali </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formGridDate">
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control required autoComplete="off"
                                                type="date" name="date"
                                                value={date}
                                                onChange={this.trainChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Date" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formGridDate">
                                            <Form.Label>Duration</Form.Label>
                                            <Form.Control required autoComplete="off"
                                                type="text" name="time_duration"
                                                value={time_duration}
                                                onChange={this.trainChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Duration" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formGridSeats">
                                            <Form.Label>No. of Seats</Form.Label>
                                            <Form.Control required autoComplete="off"
                                                type="text" name="no_of_seats"
                                                value={no_of_seats}
                                                onChange={this.trainChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter No. of Seats" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formGridSittingFare">
                                            <Form.Label>Sitting Fare</Form.Label>
                                            <Form.Control required autoComplete="off"
                                                type="text" name="sittingFare"
                                                value={sittingFare}
                                                onChange={this.trainChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Sitting Fare" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formGridSleeperFare">
                                            <Form.Label>Sleeper Fare</Form.Label>
                                            <Form.Control required autoComplete="off"
                                                type="text" name="sleeperFare"
                                                value={sleeperFare}
                                                onChange={this.trainChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Sleeper Fare" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formGridAcfare">
                                            <Form.Label>AC Fare</Form.Label>
                                            <Form.Control required autoComplete="off"
                                                type="text" name="acFare"
                                                value={acFare}
                                                onChange={this.trainChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter AC Fare" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer style={{ "textAlign": "right" }}>
                                <Button size="sm" variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSave} />Submit
                                </Button>{' '}
                                <Button size="sm" variant="info" type="reset">
                                    <FontAwesomeIcon icon={faUndo} />Reset
                                </Button>{' '}
                                <Button size="sm" variant="info" type="button" onClick={this.trianList.bind()}>
                                    <FontAwesomeIcon icon={faList} />Train List
                                </Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div> 
            </div>
        );
    };
}

