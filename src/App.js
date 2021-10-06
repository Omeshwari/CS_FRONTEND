import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import { Switch, Route, Link} from 'react-router-dom';

import AddTrain from './components/AddTriain';
import Admintimetable from './components/Admintimetable';
// import Update from './components/Update';
import BookingRedirect from './components/BookingRedirect';
import Footer from './components/Footer';
import SearchTrain from './components/SearchTrain';
import BookTicket from './components/BookTicket';
import CancelTicket from './components/CancelTicket';
import SearchByPnr from './components/SearchByPnr';
import StripeButton from './components/stripebutton.component';
import Checkout from './components/Checkout.component';

// 

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showUserBoard: user.roles.includes("ROLE_USER")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
  
    const { currentUser , showAdminBoard , showUserBoard} = this.state;

    return (
      <div className="header">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
           &nbsp;&nbsp;&nbsp;Pakistan Railways 
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/searchtrain"} className="nav-link">
                Home
              </Link>
            </li>
            
            {showAdminBoard && (
              <li className="nav-item">
              <Link to={"/timetable"} className="nav-link">
                Train List
              </Link>
            </li>
              
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/addTrain"} className="nav-link">
                  Add Train
                </Link>
              </li>
              
            )}
            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/bookTicket"} className="nav-link">
                  Book Ticket
                </Link>
              </li>
              
            )}
            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/bookingredirect"} className="nav-link">
                  All
                </Link>
              </li>
              
            )}
            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/cancelTicket"} className="nav-link">
                  Cancel Ticket
                </Link>
              </li>
              
            )}
            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/pnrEnquiry"} className="nav-link">
                  PNR Enquiry
                </Link>
              </li>
              
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link" >
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/timetable" component={Admintimetable} />
            <Route path="/addTrain" component={AddTrain} />
            <Route path="/edit/:id" component={AddTrain} />
            <Route path="/cancelTicket" component={CancelTicket} />
            <Route path="/pnrEnquiry" component={SearchByPnr} />
            <Route path="/bookTicket" component={BookTicket} />
            <Route path="/searchtrain" component={SearchTrain} />
            <Route path="/searchByPnr" component={SearchByPnr} />
            <Route path="/bookingredirect" component={BookingRedirect}/>
            <Route path="/checkout" component={Checkout} />
            <Route path="/stripebutton" component={StripeButton}/>
            
            </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;