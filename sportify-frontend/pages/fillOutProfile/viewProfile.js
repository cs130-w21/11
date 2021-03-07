
import React, { useState, useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Geocode from 'react-geocode'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Table from 'react-bootstrap/Table';
import LazyHero from 'react-lazy-hero';
//API key: AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE




class viewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            username: '',
            gender: '',
            age: '',
            sport: '',
            aboutme: '',
            skill_level: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
        }
    };


    componentDidMount() {
        const loggedInUser = localStorage.getItem("user-id");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            if (foundUser) {

                this.state.user_id = foundUser

            }


        }
        const loggedInUserName = localStorage.getItem("username");
        if (loggedInUserName) {
            this.state.username = loggedInUserName

        }

        this.getProfile()
        this.getSchedule()
    }
    getProfile() {

        const url = process.env.backend_url;
        console.log("Before_url")
        console.log(url)
        fetch(process.env.backend_url + '/user/getProfile/' + parseInt(this.state.user_id) + '/', {
            //mode: "no-cors",
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            },
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)

                if (json) {

                    if (json.skill_level) {
                        this.setState({
                            skill_level: json.skill_level
                        })
                    }
                    if (json.about_me) {
                        this.setState({
                            aboutme: json.about_me
                        })
                    }
                    if (json.age) {
                        this.setState({
                            age: json.age
                        })
                    }

                    if (json.gender === "F") {
                        this.setState({
                            gender: "Woman"

                        })
                    }
                    if (json.gender === "M") {
                        this.setState({
                            gender: "Man"
                        })
                    }
                    if (json.gender === "O") {
                        this.setState({
                            gender: "Other"
                        })

                    }

                    if (json.sport === 1) {
                        this.setState({
                            sport: "Basketball"
                        })

                    }
                    if (json.sport === 2) {
                        this.setState({
                            sport: "Tennis"
                        })
                    }

                    if (json.sport === 3) {
                        this.setState({
                            sport: "Soccer"
                        })

                    }
                    if (json.sport === 4) {
                        this.setState({
                            sport: "Badminton"
                        })
                    }


                    if (json.sport === 5) {
                        this.setState({
                            sport: "Baseball"
                        })

                    }
                    if (json.sport === 6) {
                        this.setState({
                            sport: "Sprinting"
                        })
                    }

                    if (json.sport === 7) {
                        this.setState({
                            sport: "Volleyball"
                        })

                    }
                    if (json.sport === 8) {
                        this.setState({
                            sport: "American Football"
                        })
                    }
                }



            })

    }
    getSchedule() {
        fetch(process.env.backend_url + '/schedule/getSchedule/' + parseInt(this.state.user_id) + '/', {
            //mode: "no-cors",
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            },
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                console.log(json[0])
                if (typeof json !== undefined) {

                    if (typeof (json[0].monday) !== 'undefined') {
                        this.setState({
                            monday: json[0].monday
                        })
                    }
                    if (json[0].tuesday) {
                        this.setState({
                            tuesday: json[0].tuesday
                        })
                    }
                    if (json[0].wednesday) {
                        this.setState({
                            wednesday: json[0].wednesday
                        })
                    }
                    if (json[0].thursday) {
                        this.setState({
                            thursday: json[0].thursday
                        })
                    }
                    if (json[0].friday) {
                        this.setState({
                            friday: json[0].friday
                        })
                    }
                    if (json[0].saturday) {
                        this.setState({
                            saturday: json[0].saturday
                        })
                    }
                    if (json[0].sunday) {
                        this.setState({
                            sunday: json[0].sunday
                        })
                    }
                }




            })

    }
    render() {
        var image = null;
        if (this.state.gender == "Man")
            image = <Image src="/maleProfile.png" roundedCircle />;
        else if (this.state.gender == "Woman")
            image = <Image src="/femaleProfile.png" roundedCircle />;
        else if (this.state.gender == "Other")
            image = <Image src="/other.png" roundedCircle />;
        else
            image = <Image src="/questionMark.png" roundedCircle />;
        return (
            <div>
                <style jsx global>{`
					body {
						background-color: #D2D2D2;
						align: auto;
						text-align: center;
					}

					 ul {
						  list-style-type: none;
						  margin: 0;
						  padding: 0;
						  overflow: hidden;
						  background-color: #333;
						}

						li {
						  float: left;
						}

						li a {
						  display: block;
						  color: white;
						  text-align: center;
						  padding: 14px 16px;
						  text-decoration: none;
						}

						/* Change the link color to #111 (black) on hover */
						li a:hover {
						  background-color: #111;
						}
					
				`}</style>

                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand href="/homePage/homePage">Sportify</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/fillOutProfile/viewProfile" active="true">Profile</Nav.Link>
                        <Nav.Link href="/userGames/userGames">My Games</Nav.Link>
                    </Nav>
                    <Nav inline="true">
                        <Nav.Link href="/frontpage/Login">Logout</Nav.Link>
                    </Nav>
                </Navbar>
                <LazyHero imageSrc="/viewProfileBgImage.jpg" opacity={0.5} color="black" parallaxOffset={50} isCentered={true} minHeight="120vh">
                    <br />
                    <Container>
                        <Row>
                            <Col></Col>
                            <Col>
                                {image}
                            </Col>
                            <Col></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col></Col>
                            <Col>
                                <Button variant="secondary" href="/fillOutProfile/editProfile">Edit Profile</Button>
                            </Col>
                            <Col></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col></Col>
                            <Col>
                                <Card style={{ width: '40rem', boxShadow: "1px 1px 3px black" }}>
                                    <Card.Header>
                                        <Card.Title>@{this.state.username}</Card.Title>
                                        <Card.Text>
                                            {this.state.aboutme}
                                        </Card.Text>
                                    </Card.Header>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Age: {this.state.age}</ListGroupItem>
                                        <ListGroupItem>Best Sport: {this.state.sport}</ListGroupItem>
                                        <ListGroupItem>{this.state.sport} Skill Level: {this.state.skill_level}</ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>
                            <Col></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col></Col>
                            <Col>
                                <Card style={{ width: "50em", boxShadow: "1px 1px 3px black" }}>
                                    <Card.Header>
                                        <Card.Title>Availability</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table variant="light" striped borderless hover>
                                            <thead>
                                                <tr>
                                                    <th>Monday</th>
                                                    <th>Tuesday</th>
                                                    <th>Wednesday</th>
                                                    <th>Thursday</th>
                                                    <th>Friday</th>
                                                    <th>Saturday</th>
                                                    <th>Sunday</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{this.state.monday}</td>
                                                    <td>{this.state.tuesday}</td>
                                                    <td>{this.state.wednesday}</td>
                                                    <td>{this.state.thursday}</td>
                                                    <td>{this.state.friday}</td>
                                                    <td>{this.state.saturday}</td>
                                                    <td>{this.state.sunday}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                    <br />
                </LazyHero>
            </div>

        );





    }
}

export default viewProfile;