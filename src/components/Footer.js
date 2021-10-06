import React, {Component} from "react";

import {Navbar, Container, Col} from "react-bootstrap";

export default class Footer extends Component{
    render(){
        let month = new Date().getMonth();
        return(
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>{month}, Case Study on Pakistan Railways ticket booking</div>
                    </Col>
                </Container>
            </Navbar>
        )
    }
}

