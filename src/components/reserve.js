import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

export default class Reservation extends Component {
    state = {
        bookingId:'',
        passengerName:'', 
        passengerAddress:'', 
        passengerClass:'', 
        quota:'', 
        passengerSex:'',
        adults:'', 
        childrens:'', 
        pnrNo:'',
      isBookingCreated: false
    };

    handlebookingId = event => {
        const { value } = event.target;
        if (value != null) {
          this.setState({ bookingId: value.toUpperCase() });
        }
      };
      handlepassengerName = event => {
        const { value } = event.target;
        if (value != null) {
          this.setState({ passengerName: value.toUpperCase() });
        }
      };
      handlepassengerAddress = event => {
        const { value } = event.target;
        if (value != null) {
          this.setState({ date: value.toUpperCase() });
        }
      };
      handlename = event => {
        const { value } = event.target;
        if (value != null) {
          this.setState({ name: value.toUpperCase() });
        }
      };
      handlesex = event => {
        const { value } = event.target;
        if (value != null) {
          this.setState({ sex: value.toUpperCase() });
        }
      };
      handleage = event => {
        const { value } = event.target;
        if (value != null) {
          this.setState({ age: value.toUpperCase() });
        }
      };
      handleaddress = event => {
        const { value } = event.target;
        if (value != null) {
          this.setState({ address: value.toUpperCase() });
        }
      };
      handleno_of_seats = event => {
        const { value } = event.target;
        if (value != null) {
          this.setState({ no_of_seats: value.toUpperCase() });
        }
      };

      handleSubmit = event => {
        event.preventDefault();
  
        const newBooking = {
          bookingId: this.state.bookingId,
          passengerName: this.state.passengerName,
          date: this.state.date,
          name: this.state.name,
          sex: this.state.sex,
          age: this.state.age,
          address: this.state.address,
          no_of_seats: this.state.no_of_seats,
          
        
        };

        axios
        .post(
          "http://localhost:8093/bookingopr/reservation",
          newBooking
        )
        .then(response => response)
        .catch(error => error.message);
  
      window.alert("Your Reservation is added successfully");
      this.setState({
          bookingId: "",
          passengerName: "",
          date: "",
          name: "",
          sex: "",
          age: "",
          address: "",
          no_of_seats: "",
          isTrainCreated: true
      });
    };




    render() {
        if (this.state.isBookingCreated) {
          return <Redirect to="/bookingopr/reservation" />;
        }
    
        return (
            
          
            <div className="d-flex justify-content-center">
              <div className="card bg-light mb-3">
                <div className="card-header">
                  <h3 className="d-flex justify-content-center">Book your reservation</h3>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="bookingId">Enter bookingId</label>
                          <input
                            type="name"
                            className="form-control"
                            id="bookingId"
                            onChange={this.handlebookingId}
                            value={this.state.bookingId}
                            required
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="passengerName">Enter passengerName</label>
                          <input
                            type="name"
                            className="form-control"
                            id="passengerName"
                            onChange={this.handlepassengerName}
                            value={this.state.passengerName}
                            required
                          />
                        </div>
                      </div>
                      <br />
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="date">Enter Date</label>
                          <input
                            id="date"
                            className="form-control"
                            onChange={this.handledate}
                            value={this.state.date}
                            required
                          />
                        </div>
    
                        <div className="col">
                          <label htmlFor="name">Enter your name</label>
                          <input
                            id="name"
                            className="form-control"
                            onChange={this.handlename}
                            value={this.state.name}
                            required
                          />
                        </div>
                      </div>
                      <br />
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="sex">Gender</label>
                          <input
                            id="sex"
                            className="form-control"
                            onChange={this.handlesex}
                            value={this.state.sex}
                            required
                          />
                        </div>
    
                        <div className="col">
                          <label htmlFor="age">Age</label>
                          <input
                            id="age"
                            className="form-control"
                            onChange={this.handleage}
                            value={this.state.age}
                            required
                          />
                        </div>
                      </div>
                      <br />
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="address">Address</label>
                          <input
                            id="address"
                            className="form-control"
                            onChange={this.handleaddress}
                            value={this.state.address}
                            required
                          />
                        </div>
    
                        <div className="col">
                          <label htmlFor="no_of_seats">No of seats you wish to reserve</label>
                          <input
                            id="no_of_seats"
                            className="form-control"
                            onChange={this.handleno_of_seats}
                            value={this.state.no_of_seats}
                            required
                          />
                        </div>
                      </div>
                      <br />
                      
                  
                      <br />
                      <div>
                        <button
                          type="submit"
                          value="createBooking"
                          className="btn btn-dark btn-lg btn-block"
                        >
                          Book your reservation
                        </button>
                        
                        
                        
                      </div>
                    </form>
                  </h5>
                </div>
              </div>
            </div>
          
         
        );
      }
    }