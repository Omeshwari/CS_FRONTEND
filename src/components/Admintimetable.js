import React, {Component} from 'react';
import { ButtonGroup, Card, Table, Button} from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faList, faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

export default class Admintimetable extends Component{

    constructor(props){
        super(props);
        this.state ={
            train: []
        };
    }

    componentDidMount(){
        this.findAllTrains();       
    };

    showTrainDetails(train_id){
        this.props.history.push(`/update/${train_id}`);
        this.updateTrain(train_id);
    }

    updateTrain = (train_id) =>{
        axios.put("http://localhost:8091/trains/update/"+train_id)
            .then(response => {
                if(response.data != null){
                    this.setState({"isTrainCreated": true});
                    setTimeout(() => this.setState({"isTrainCreated": false}), 3000);
                    setTimeout(() => this.trianList(), 3000);
                }else{
                    this.setState({"isTrainCreated": false});
                }
            });
        this.setState(this.initailState);
    }

    findAllTrains(){
        axios.get("http://localhost:8091/trains")
            .then(response => response.data)
            .then((data) => {
                this.setState({train: data})
            });  
    };

    deleteTrain = (trainId) => {
        axios.delete("http://localhost:8091/trains/delete/"+trainId)
            .then(response => {
                if(response.data != null){
                            this.setState({"isTrainCreated": true});
                            setTimeout(() => this.setState({"isTrainCreated": false}), 3000);
                            this.findAllTrains();
                        }else{
                            this.setState({"isTrainCreated": false});
                        }
            });
    };

    render(){
        return(
            <div>
                <div style={{"display": this.state.isTrainCreated ? 'block': "none"}}>
                    <MyToast isTrainCreated= {this.state.isTrainCreated} message={"Train deleted Successfully!!"} type={"danger"}/>
                </div>
                <Card className="border bg-dark border-light text-light">
                <CardHeader as="h5"><FontAwesomeIcon icon={faList}/> Train Timetable</CardHeader>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.train.length === 0 ?
                                <tr align="center">
                                    <td colSpan="9">{this.state.train.length} Trains Available..</td>
                                </tr>:
                                this.state.train.map((train) => (
                                    <tr key={train.id}>
                                        <td>{train.train_id}</td>
                                        <td>{train.train_name}</td>
                                        <td>{train.train_startStation}</td>
                                        <td>{train.train_endStation}</td>
                                        <td>{train.date}</td>
                                        <td>{train.time_duration}</td>
                                        <td>{train.no_of_seats}</td>
                                        <td>{train.sittingFare}</td>
                                        <td>{train.sleeperFare}</td>
                                        <td>{train.acFare}</td>   
                                        <td>
                                            <ButtonGroup>
                                                {/* <Button size="sm" variant="outline-info" onClick={this.showTrainDetails.bind(this, train.train_id)}><FontAwesomeIcon icon={faUserEdit}/>Update</Button> */}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteTrain.bind(this, train.train_id)}><FontAwesomeIcon icon={faTrash}/>Delete</Button>
                                            </ButtonGroup>
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
