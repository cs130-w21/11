import React, { component, useState, useEffect } from 'react'
import Router from "next/router"

import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Geocode from 'react-geocode';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LazyHero from 'react-lazy-hero';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const sportToNumber = {
	'Basketball': 1, 'Tennis': 2, 'Soccer': 3, 'Badminton': 4,
	'Baseball': 5, 'Sprinting': 6, 'Volleyball': 7, 'American Football': 8
};
//API key: AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE

const CreateOneOnOne = (props) => {

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

		const localOpponentSport = localStorage.getItem("localOpponentSport")
		if (localOpponentSport) {
			const copyLocalOpponentSport = localOpponentSport;
			setOpponentSport(copyLocalOpponentSport);
		}

		const localOpponentName = localStorage.getItem("localOpponentName");
		if (localOpponentName) {
			const copyLocalOpponentName = (localOpponentName);
			setOpponentName(copyLocalOpponentName);

		}

		const localOpponentId = localStorage.getItem("localOpponentId")
		if (localOpponentId) {
			const copyLocalOpponentId = (localOpponentId);
			setOpponentId(copyLocalOpponentId);
		}

	}, []);

	//const geoCoder=Maps.newGeocoder();

	const [foundUser, setUser] = useState("");
	const [foundUserName, setUsername2] = useState("");
	const [opponentName, setOpponentName] = useState("")
	const [opponentSport, setOpponentSport] = useState('');
	const [opponentSkillLevel, setOpponentSkillLevel] = useState('')
	const [opponentId, setOpponentId] = useState('')



	const [description, setDescription] = useState('');

	//number of people is automatically 2	

	//min skill level is automatically 1 in a 1 on 1 challenge, 

	const [startTime, setStartTime] = useState(new Date());

	let [address, setAddress] = React.useState('')

	console.log(opponentSport);


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
					<Card style={{ width: "50em" }}>
						<Card.Header>
							<Card.Title>
								Set Up Your Challenge
							</Card.Title>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={(e) => handleSubmit(e)}>
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

												let long = -118.4452; // UCLA 
												let lat = 34.0689; // UCLA

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

												const sportNumber = Number(opponentSport);
												console.log(sportNumber);
												const reactData = { "latitude": lat, "longitude": long, "dateString": startTime, "skill_level": 1, "max_group_size": 2, "comments": description, "sport": sportNumber, "user": foundUser }

												console.log(reactData);
												console.log(foundUser, opponentId)

												fetch(process.env.backend_url + '/games/createGame', {
													//mode: "no-cors",
													method: "POST",
													headers: {
														'Content-type': 'application/json',
														"Access-Control-Allow-Origin": '*'
													},
													body: JSON.stringify(reactData)
												})
													.then(response => response.json())
													.then(json => {
														console.log("Here checking")
														console.log(json)
														let gameId = json.usr_gm.gameId;


														console.log(gameId, opponentId)
														return gameId;

													})
													.then((gameId) => {
														console.log(gameId, opponentId);
														const requestOptions = {
															method: 'PUT',
															headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": '*' },
															body: JSON.stringify({ user_id: parseInt(opponentId), game_id: gameId })
														};
														console.log(requestOptions);
														fetch(process.env.backend_url + '/games/joinGame/', requestOptions)
															.then(response => response.json())
															.then(data => {
																console.log(data);


															})

													})
													.catch(error => { console.log(error) })



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

export default CreateOneOnOne;

