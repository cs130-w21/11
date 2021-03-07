
import React, { useState, useEffect, Router } from "react";
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
import Card from "react-bootstrap/Card";
import LazyHero from "react-lazy-hero";
import FormControl from "react-bootstrap/FormControl";

//API key: AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE




const editProfile = (props) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [age, setAge] = useState(1);
	const [password, setPassword] = useState('');

	let [latitude, setLatitude] = React.useState(0.1)
	let [longitude, setLongitude] = React.useState(0.1)
	let [address, setAddress] = React.useState('')
	//const [phoneNumber, setPhoneNumber]=useState("(000) 000-0000");
	//const [email, setEmail]=useState("blah@blah.com");
	const [gender, setGender] = useState("M");
	// const [currentSetOfSports, setCurrentSetOfSports]=useState(new Object());
	const [foundUser, setUser] = useState("")
	const [foundUserName, setUsername2] = useState("")
	const [currentSport, setSport] = useState('1');
	const [bestSportSkillLevel, setBestSportSkillLevel] = useState(1);

	const [dayTimes, setDayTimes] = useState(["", "", "", "", "", "", ""]);

	const handleScheduleEvent = (e) => {
		console.log(e.target.getAttribute('type'));
		if (e.target.getAttribute('type') == 'text') {
			console.log(e.target);
			let copyTimes = [...dayTimes];
			let newTimeString = e.target.value;

			let dayIndex = e.target.className;
			let tempClassNames = dayIndex.split(" ");
			console.log(newTimeString, dayIndex);
			copyTimes[(tempClassNames[0] - '0')] = newTimeString;
			setDayTimes(copyTimes);
			console.log(dayTimes);
		}
	}

	useEffect(() => {
		Geocode.setApiKey("AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE");
		Geocode.setLanguage("en");

		const loggedInUser = localStorage.getItem("user-id");
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setUser(foundUser);

		}
		const loggedInUserName = localStorage.getItem("username");
		if (loggedInUserName) {
			const foundUserName = (loggedInUserName);
			setUsername2(foundUserName);

		}

	}, []);

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
			<LazyHero imageSrc="/viewProfileBgImage.jpg" opacity={0.5} color="black" parallaxOffset={50} isCentered={true} minHeight="110vh">
				<Container>
					<Card style={{ width: "70em" }}>
						<Card.Header>
							<Card.Title>Edit Profile</Card.Title>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={(e) => handleSubmit(e)}>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridBiography">
										<Form.Label>Biography</Form.Label>
										<Form.Control placeholder="A little about me..." type="textArea" value={description} onChange={(e) => setDescription(e.target.value)} />
									</Form.Group>
								</Form.Row>
								<Form.Group controlId="formGridAddress">
									<Form.Label>Address</Form.Label>
									<Form.Control required placeholder="330 De Neve Drive, Los Angeles, CA" type="textArea" value={address}
										onChange={(e) => setAddress(e.target.value)} />
								</Form.Group>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridAge">
										<Form.Label>Age</Form.Label>
										<Form.Control type="number" min={1} value={age} onChange={(e) => setAge(e.target.value)} />
									</Form.Group>
									<Form.Group as={Col} controlId="formGridGender">
										<Form.Label>Gender</Form.Label>
										<Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
											<option value="M">Man</option>
											<option value="F">Woman</option>
											<option value="O">Other </option>
										</Form.Control>
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridSport">
										<Form.Label>Best Sport</Form.Label>
										<Form.Control as="select" value={currentSport} onChange={(e) => setSport(e.target.value)}>
											<option value="1">Basketball</option>
											<option value="2">Tennis</option>
											<option value="3">Soccer</option>
											<option value="4">Badminton</option>
											<option value="5">Baseball</option>
											<option value="6">Sprinting</option>
											<option value="7">Volleyball</option>
											<option value="8">American Football</option>
										</Form.Control>
									</Form.Group>
									<Form.Group as={Col} controlId="formGridSkillLevel">
										<Form.Label>Skill Level in Best Sport</Form.Label>
										<Form.Control type="number" value={bestSportSkillLevel} min={1} max={10} onChange={(e) => setBestSportSkillLevel(e.target.value)} />
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridMonday">
										<Form.Label>Monday</Form.Label>
										<Form.Control type="text" placeholder="Available times..." className='0' value={dayTimes[0]} onChange={handleScheduleEvent} />
									</Form.Group>
									<Form.Group as={Col} controlId="formGridTuesday">
										<Form.Label>Tuesday</Form.Label>
										<Form.Control type="text" placeholder="Available times..." className='1' value={dayTimes[1]} onChange={handleScheduleEvent} />
									</Form.Group>
									<Form.Group as={Col} controlId="formGridWednesday">
										<Form.Label>Wednesday</Form.Label>
										<Form.Control type="text" placeholder="Available times..." className='2' value={dayTimes[2]} onChange={handleScheduleEvent} />
									</Form.Group>
									<Form.Group as={Col} controlId="formGridThursday">
										<Form.Label>Thursday</Form.Label>
										<Form.Control type="text" placeholder="Available times..." className='3' value={dayTimes[3]} onChange={handleScheduleEvent} />
									</Form.Group>
									<Form.Group as={Col} controlId="formGridFriday">
										<Form.Label>Friday</Form.Label>
										<Form.Control type="text" placeholder="Available times..." className='4' value={dayTimes[4]} onChange={handleScheduleEvent} />
									</Form.Group>
									<Form.Group as={Col} controlId="formGridSaturday">
										<Form.Label>Saturday</Form.Label>
										<Form.Control type="text" placeholder="Available times..." className='5' value={dayTimes[5]} onChange={handleScheduleEvent} />
									</Form.Group>
									<Form.Group as={Col} controlId="formGridSunday">
										<Form.Label>Sunday</Form.Label>
										<Form.Control type="text" placeholder="Available times..." className='6' value={dayTimes[6]} onChange={handleScheduleEvent} />
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Col>
										<Button href='/homePage/homePage' variant="secondary" type="submit">
											Cancel
										</Button>
									</Col>
									<Col>
										<Link href="/homePage/homePage">
											<Button variant="secondary" type="submit" onClick={(e) => {
												// Get latitude & longitude from address.
												Geocode.fromAddress(address).then(
													(response) => {
														const { lat, lng } = response.results[0].geometry.location;
														console.log(lat, lng);


														const reactData = { "age": age, "latitude": lat, "longitude": lng, "skill_level": bestSportSkillLevel, "gender": gender, "about_me": description, "sport": currentSport, "username": foundUserName, "password": password }
														const reactData2 = { "id": String(foundUser), "monday": dayTimes[0], "tuesday": dayTimes[1], "wednesday": dayTimes[2], "thursday": dayTimes[3], "friday": dayTimes[4], "saturday": dayTimes[5], "sunday": dayTimes[6] }

														console.log("The body is")
														console.log(JSON.stringify(reactData2))
														fetch(process.env.backend_url + '/user/updateProfile/' + parseInt(foundUser) + '/', {
															//mode: "no-cors",
															method: "PUT",
															headers: {
																'Content-type': 'application/json',
																"Access-Control-Allow-Origin": '*'
															},
															body: JSON.stringify(reactData)
														})
															.then(response => {

																if (response.status === 200) {
																	console.log("Result Here Lol")
																	console.log("here" + response.json)


																	//Router.push("../homePage/homePage")
																}
																else {
																	console.log("here" + response.json)

																}



															})
															.then(

																fetch(process.env.backend_url + '/schedule/createUpdateSchedule', {

																	//mode: "no-cors",
																	method: "POST",
																	headers: {
																		'Content-type': 'application/json',
																		"Access-Control-Allow-Origin": '*'
																	},
																	body: JSON.stringify(reactData2)
																})
																	.then(response => {

																		if (response.status === 200) {
																			console.log("Result Here Schedule")
																			console.log("here" + response.json)
																		}
																		else {
																			console.log("here" + response.json)
																		}
																	})
															)
													},
													(error) => {
														console.error(error);
													}
												);
											}}> Submit </Button>
										</Link>

									</Col>
								</Form.Row>
							</Form>
						</Card.Body>
					</Card>
				</Container>

			</LazyHero>
		</div>

	);
};

export default editProfile;