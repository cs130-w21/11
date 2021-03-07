import React, { component, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Geocode from 'react-geocode';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import LazyHero from 'react-lazy-hero';
import Card from 'react-bootstrap/Card';

//API key: AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE

const CreateGame = (props) => {

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

	//const geoCoder=Maps.newGeocoder();

	const [sport, setSport] = useState('');
	//const [name, setName]=useState('');
	const [description, setDescription] = useState('');
	const [numberOfPeopleIncludingYou, setNumberOfPeopleIncludingYou] = useState(2);
	const [minSkillLevel, setMinSkillLevel] = useState(1);
	// const [maxSkillLevel, setMaxSkillLevel]=useState(10);
	const [startTime, setStartTime] = useState(new Date());

	// let [latitude, setLatitude] = React.useState(0.1)
	//    let [longitude, setLongitude] = React.useState(0.1)
	let [address, setAddress] = React.useState('')
	const [foundUser, setUser] = useState("")
	const [foundUserName, setUsername2] = useState("")
	// const [endTime, setEndTime]=useState(new Date());
	// const [gendersAllowed, setGendersAllowed]=useState("Both Men And Women");

	const handleSubmit = (e) => {
		e.preventDefault();


	};

	return (
		<div className="superContainer">

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

						hero-text{
							color: white;
						}
				`}</style>

			<Navbar bg="dark" variant="dark" sticky="top">
				<Navbar.Brand href="/homePage/homePage">Sportify</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/fillOutProfile/viewProfile">Profile</Nav.Link>
					<Nav.Link href="/userGames/userGames">My Games</Nav.Link>
				</Nav>
				<Nav inline="true">
					<Nav.Link href="/">Logout</Nav.Link>
				</Nav>
			</Navbar>
			<LazyHero imageSrc="/createGameBgImage.jpg" opacity={0.5} color="black" parallaxOffset={50} isCentered={true} minHeight="100vh">
				<Container>
					<Card style={{width: "50em"}}>
						<Card.Header>
							<Card.Title>
								Create Game
							</Card.Title>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={(e) => handleSubmit(e)}>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridSport">
										<Form.Label>Sport</Form.Label>
										<Form.Control as="select" value={sport} onChange={(e) => setSport(e.target.value)}>
											<option value="Basketball">Basketball</option>
											<option value="Tennis">Tennis</option>
											<option value="Soccer">Soccer</option>
											<option value="Badminton">Badminton</option>
											<option value="Baseball">Baseball</option>
											<option value="Sprinting">Sprinting</option>
											<option value="Volleyball">Volleyball</option>
											<option value="American Football">American Football</option>
										</Form.Control>
									</Form.Group>
								</Form.Row>

								<Form.Group controlId="formGridAddress">
									<Form.Label>Address</Form.Label>
									<Form.Control placeholder="330 De Neve Drive, Los Angeles, CA" type="textArea" value={address}
										onChange={(e) => setAddress(e.target.value)} />
								</Form.Group>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridDescription">
										<Form.Label>Description</Form.Label>
										<Form.Control placeholder="Let's play soccer on the IM field!" type="textArea" value={description} onChange={(e) => setDescription(e.target.value)} />
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridSkillLevel">
										<Form.Label>Minimum Skill Level</Form.Label>
										<Form.Control type="number" value={minSkillLevel} min={1} max={10} onChange={(e) => setMinSkillLevel(e.target.value)} />
									</Form.Group>

									<Form.Group as={Col} controlId="formGridMaxGroupSize">
										<Form.Label>Maximum Group Size</Form.Label>
										<Form.Control type="number" value={numberOfPeopleIncludingYou} min={2} onChange={(e) => setNumberOfPeopleIncludingYou(e.target.value)} />
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridMaxGroupSize">
										<Form.Label>Start Time</Form.Label>
										<Form.Control type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Col>
										<Button href='/homePage/homePage' variant="secondary" type="submit">
											Cancel
							</Button>
									</Col>
									<Col>
										<Link href='/homePage/homePage' passhref="true">

											<Button variant="secondary" type="submit" onClick={(e) => {
												var lat = -76
												var long = -148

												// Get latitude & longitude from address.
												Geocode.fromAddress(address).then(
													(response) => {
														lat, long = response.results[0].geometry.location;
														console.log(lat, long);

													},
													(error) => {
														console.error(error);
													}
												)
												var currSport = 0
												switch (sport) {
													case "Basketball":
														currSport = 1
														break;
													case "Tennis":
														currSport = 2
														break
													case "Soccer":
														currSport = 3
														break
													case "Badminton":
														currSport = 4
														break
													case "Baseball":
														currSport = 5
														break
													case "Sprinting":
														currSport = 6
														break
													case "Volleyball":
														currSport = 7
														break
													case "American Football":
														currSport = 8
														break

												}
												console.log("wtf is going on")



												const reactData = { "latitude": lat, "longitude": long, "dateString": startTime, "skill_level": Number(minSkillLevel), "max_group_size": Number(numberOfPeopleIncludingYou), "comments": description, "sport": currSport, "user": foundUser }
												console.log(reactData);

												fetch('http://localhost:8000/games/createGame', {
													//mode: "no-cors",
													method: "POST",
													headers: {
														'Content-type': 'application/json',
														//"Access-Control-Allow-Origin": '*'
													},
													body: JSON.stringify(reactData)
												})
													.then(response => response.json())
													.then(json => {
														if (json.message === "Signin successful") {
															console.log("Result Here")
															console.log(json)
															Router.push("../homePage/homePage")
														}
														else {
															console.log("here" + json)
															console.log(json.message)
														}



													})

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

export default CreateGame;