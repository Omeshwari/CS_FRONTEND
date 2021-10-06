// import axios from 'axios';
// import React, { Component } from 'react';
// import { Card, Form, Button, Row, Col} from 'react-bootstrap';
// import CardHeader from 'react-bootstrap/esm/CardHeader';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import { faList, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons';
// import MyToast from './MyToast';

// class Update extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             // step 2
//             train_id: this.props.match.params.train_id,
//             train_name: '',
//             train_startStation:'', 
//             train_endStation:'', 
//             date:'', 
//             time_duration:'',
//             no_of_seats:'', 
//             sittingFare:'', 
//             sleeperFare:'', 
//             acFare:''
//         }
//         this.changeTrainNameTypeHandler = this.changeTrainNameTypeHandler.bind(this);
//         this.changeTrainStartHandler = this.changeTrainStartHandler.bind(this);
//         this.changeTrainEndHandler = this.changeTrainEndHandler.bind(this);
//         this.changeDateHandler = this.changeDateHandler.bind(this);
//         this.changeDurationHandler = this.changeDurationHandler.bind(this);
//         this.changeSeatsHandler = this.changeSeatsHandler.bind(this);
//         this.changeSittingFareHandler = this.changeSittingFareHandler.bind(this);
//         this.changeSleeperFareHandler = this.changeSleeperFareHandler.bind(this);
//         this.changeAcFareHandler = this.changeAcFareHandler.bind(this);
//         this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
//     }

//     // step 3
//     componentDidMount(){

//         // step 4
//         /*if(this.state.productid === '_add'){
//             return
//         }else{*/
//             axios.get("http://localhost:8091/trains/"+this.state.train_id)
//             .then( (res) =>{
//                 let trains = res.data;
//                 this.setState({
//                     train_id: trains.train_id,
//                     train_name: trains.train_name,
//                         train_startStation: trains.train_startStation,
//                         train_endStation: trains.train_endStation,
//                         no_of_seats: trains.no_of_seats,
//                         date: trains.date,
//                         time_duration: trains.time_duration,
//                         sittingFare: trains.sittingFare,
//                         sleeperFare: trains.sleeperFare,
//                         acFare: trains.acFare
//                 });
//             });
//         }        
    
//     saveOrUpdateProduct = (event) => {
//         event.preventDefault();
        
//         const train = {
//             train_id: this.state.train_id,
//             train_name: this.state.train_name,
//             no_of_seats: this.state.no_of_seats, 
//             train_startStation: this.state.train_startStation, 
//             train_endStation: this.state.train_endStation, 
//             date: this.state.date, 
//             time_duration: this.state.time_duration,
//             sittingFare: this.state.sittingFare, 
//             sleeperFare: this.state.sleeperFare,
//             acFare: this.state.acFare,
//         };

//         axios.put(`http://localhost:8091/trains/update/"${this.state.train_id}`)
//             .then(response => {
//                 if(response.data != null){
//                     this.setState({"isTrainCreated": true});
//                     alert("Train updated");
//                     // setTimeout(() => this.setState({"isTrainCreated": false}), 3000);
//                     // setTimeout(() => this.trianList(), 3000);
//                 }else{
//                     this.setState({"isTrainCreated": false});
//                 }
//             });
//         this.setState(this.initailState);
//     }
    
//     changeTrainNameTypeHandler= (event) => {
//         this.setState({train_name: event.target.value});
//     }

//     changeTrainStartHandler= (event) => {
//         this.setState({train_startStation: event.target.value});
//     }

//     changeTrainEndHandler= (event) => {
//         this.setState({train_endStation: event.target.value});
//     }

//     changeDateHandler= (event) => {
//         this.setState({date: event.target.value});
//     }

//     changeDurationHandler= (event) => {
//         this.setState({time_duration: event.target.value});
//     }
//     changeSeatsHandler= (event) => {
//         this.setState({no_of_seats: event.target.value});
//     }
//     changeSittingFareHandler= (event) => {
//         this.setState({sittingFare: event.target.value});
//     }
//     changeSleeperFareHandler= (event) => {
//         this.setState({sleeperFare: event.target.value});
//     }
//     changeAcFareHandler= (event) => {
//         this.setState({acFare: event.target.value});
//     }


//     // cancel(){
//     //     this.props.history.push('/products');
//     // }

//     // getTitle(){
//     //     /*if(this.state.productid === '_add'){
//     //         return <h3 className="text-center">Add Products</h3>
//     //     }else{*/
//     //         return <h3 className="text-center">Update Train</h3>
//     //     //}
//     // };

//     trianList = () =>{
//         return this.props.history.push('/timetable');
//     };

//     render() {
//         const {train_id, train_name, time_duration, no_of_seats, train_startStation, train_endStation, date, sittingFare, sleeperFare, acFare}=this.state;  //reference with respect to value
//         return (
            
//             <div>
//             <div style={{"display": this.state.isTrainCreated ? 'block': "none"}}>
//                 <MyToast isTrainCreated={this.state.isTrainCreated} message={"Train updated Successfully!!"} type={"success"}/>
//             </div>
//             <div>
//                 <Card className="border bg-dark border-light text-light">
//                     <CardHeader as="h5"><FontAwesomeIcon icon={faEdit} /> Update Train </CardHeader>
//                     <Form onReset={this.resetTrain} id="trainFormId">
//                         <Card.Body>
//                             <Row>
//                                 <Col>
//                                     <Form.Group controlId="formGridId">
//                                         <Form.Label>Train Id</Form.Label>
//                                         <Form.Control required autoComplete="off"
//                                             type="text" name="train_id"
//                                             value={train_id}
//                                             //onChange={this.}
//                                             className={"bg-dark text-white"}
//                                             placeholder="Enter Train Id." />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col sm={10}>
//                                     <Form.Group controlId="formGridTrainName">
//                                         <Form.Label>Train Name</Form.Label>
//                                         <Form.Control required autoComplete="off"
//                                             type="text" name="train_name"
//                                             value={train_name}
//                                             onChange={this.changeTrainNameTypeHandler}
//                                             className={"bg-dark text-white"}
//                                             placeholder="Enter Train Name" />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                     <Form.Group controlId="formGridStartStation">
//                                         <Form.Label>Start Station</Form.Label>
//                                         <Form.Control required
//                                             type="text" name="train_startStation"
//                                             value={train_startStation}
//                                             onChange={this.changeTrainStartHandler}
//                                             className={"bg-dark text-white"}
//                                             placeholder="Enter Start Station" />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId="formGridEndStation">
//                                         <Form.Label>End Station</Form.Label>
//                                         <Form.Control required
//                                             type="text" name="train_endStation"
//                                             value={train_endStation}
//                                             onChange={this.changeTrainEndHandler}
//                                             className={"bg-dark text-white"}
//                                             placeholder="Enter End Station" />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                     <Form.Group controlId="formGridDate">
//                                         <Form.Label>Date</Form.Label>
//                                         <Form.Control required autoComplete="off"
//                                             type="text" name="date"
//                                             value={date}
//                                             onChange={this.changeDateHandler}
//                                             className={"bg-dark text-white"}
//                                             placeholder="Enter Date" />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId="formGridDate">
//                                         <Form.Label>Duration</Form.Label>
//                                         <Form.Control required autoComplete="off"
//                                             type="text" name="time_duration"
//                                             value={time_duration}
//                                             onChange={this.changeDurationHandler}
//                                             className={"bg-dark text-white"}
//                                             placeholder="Enter Date" />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId="formGridSeats">
//                                         <Form.Label>No. of Seats</Form.Label>
//                                         <Form.Control required autoComplete="off"
//                                             type="text" name="no_of_seats"
//                                             value={no_of_seats}
//                                             onChange={this.changeSeatsHandler}
//                                             className={"bg-dark text-white"}
//                                             placeholder="Enter No. of Seats" />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                     <Form.Group controlId="formGridSittingFare">
//                                         <Form.Label>Sitting Fare</Form.Label>
//                                         <Form.Control required autoComplete="off"
//                                             type="text" name="sittingFare"
//                                             value={sittingFare}
//                                             onChange={this.changeSittingFareHandler}
//                                             className={"bg-dark text-white"}
//                                             placeholder="Enter Sitting Fare" />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId="formGridSleeperFare">
//                                         <Form.Label>Sleeper Fare</Form.Label>
//                                         <Form.Control required autoComplete="off"
//                                             type="text" name="sleeperFare"
//                                             value={sleeperFare}
//                                             onChange={this.changeSleeperFareHandler}
//                                             className={"bg-dark text-white"}
//                                             placeholder="Enter Sleeper Fare" />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId="formGridAcfare">
//                                         <Form.Label>AC Fare</Form.Label>
//                                         <Form.Control required autoComplete="off"
//                                             type="text" name="acFare"
//                                             value={acFare}
//                                             onChange={this.changeAcFareHandler}
//                                             className={"bg-dark text-white"}
//                                             placeholder="Enter AC Fare" />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         </Card.Body>
//                         <Card.Footer style={{ "textAlign": "right" }}>
//                             <Button size="sm" variant="success" type="submit" onClick={this.saveOrUpdateProduct}>
//                                 <FontAwesomeIcon icon={faSave} />update
//                             </Button>{' '}
//                             <Button size="sm" variant="info" type="reset">
//                                 <FontAwesomeIcon icon={faUndo} />Reset
//                             </Button>{' '}
//                             <Button size="sm" variant="info" type="button" onClick={this.trianList.bind()}>
//                                 <FontAwesomeIcon icon={faList} />Train List
//                             </Button>
//                         </Card.Footer>
//                     </Form>
//                 </Card>
//             </div> 
//         </div>
//         )
//     }
// }

// export default Update;