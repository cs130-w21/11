
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

<<<<<<< HEAD
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/homePage/homePage">Sportify</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/fillOutProfile/viewProfile" active="true">Profile</Nav.Link>
                        <Nav.Link href="/userGames/userGames">My Games</Nav.Link>
                    </Nav>
                    <Nav inline="true">
                        <Nav.Link href="/frontpage/Login">Logout</Nav.Link>
				    </Nav>
			    </Navbar>
=======
                <div className="navBar">
                <ul>
                    <li>
                        <Link href='/userGames/userGames' passHref>
                            <div className="myGames">
                                <a>My Games</a>
                            </div>
                        </Link>

                    </li>



                    <li>
                        <Link href='/fillOutProfile/viewProfile' passHref>
                            <div className="viewProfile">
                                <a>View my profile</a>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link href='/homePage/homePage' passHref>
                            <div className="homeDiv">
                                <a>Go home!</a>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link href='/' passHref>
                            <div className="logoutDiv">
                                <a>Logout!</a>
                            </div>
                        </Link>
                    </li>

                </ul>
            </div>

            <br />
            <br />

>>>>>>> 09b0905f600e7f326af782981a6d8f7507aa8634
                <h1> Here's your profile </h1>

                <div>

                    { /*  
			        <label>
			          Name: {' '}
			          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
			        </label>

			    	*/  }



                    <br />
                    <br />


                    <label>
                        Biography: {' '}
                        <h3>{this.state.aboutme}</h3>
                    </label>

                    <br />
                    <br />





                    <label>
                        Age:
                        <h1>{this.state.age}</h1>
                    </label>

                    <br />
                    <br />





                    { /*
			        <label>
			          Phone Number: {' '}
			          <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />

			    	*/ }

                    { /*
			        <label>
			          Email: {' '}
			          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />

			    	*/ }


                    <label>
                        Gender:
                        <h3>{this.state.gender}</h3>
                    </label>

                    <br />
                    <br />


                    <label>
                        Best Sport: {' '}
                        <h3>{this.state.sport}</h3>
                    </label>
                    <br />
                    <br />

                    <label>
                        Skill Level in Best Sport:
                        <h3>{this.state.skill_level}</h3>
                    </label>

                    <br />
                    <br />

                    <b>
                        Times available!
			        </b>

                    <br />
                    <br />


                    <label>
                        Monday:
                        <h4>{this.state.monday}</h4>
                    </label>

                    <br />
                    <br />

                    <label>
                        Tuesday:
                        <h4>{this.state.tuesday}</h4>
                    </label>

                    <br />
                    <br />
                    <label>
                        Wednesday:
                        <h4>{this.state.wednesday}</h4>
                    </label>

                    <br />
                    <br />

                    <label>
                        Thursday:
                        <h4>{this.state.thursday}</h4>
                    </label>

                    <br />
                    <br />

                    <label>
                        Friday:
                        <h4>{this.state.friday}</h4>
                    </label>

                    <br />
                    <br />

                    <label>
                        Saturday:
                        <h4>{this.state.saturday}</h4>
                    </label>

                    <br />
                    <br />

                    <label>
                        Sunday:
                        <h4>{this.state.sunday}</h4>
                    </label>

                    <br />
                    <br />





                    <br />




                    <Link href="/fillOutProfile/editProfile">
                        <button>Edit Profile</button>
                    </Link>






                </div>
            </div>

        );





    }
}

export default viewProfile;