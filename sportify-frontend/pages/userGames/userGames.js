import React, { component, useState, useEffect } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Geocode from 'react-geocode'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'
import Router from 'next/router';

const sportToImage = {
	'Baseball': '/baseball.png',
	'Soccer': '/soccer.jpg',
	'Sprinting': '/sprinting.jpg',
	'Volleyball': '/volleyball.jpg',
	'Tennis': '/tennis.jpg',
	'Badminton': '/badminton.jpg',
	'American Football': '/football.png',
	'Basketball': '/basketball.jpg'
};

const genderToImage = {
	'M': '/maleProfile.png',
	'F': '/femaleProfile.png',
	'O': '/other.png'
};

const sportToNumber = {
	'Basketball': 1, 'Tennis': 2, 'Soccer': 3, 'Badminton': 4,
	'Baseball': 5, 'Sprinting': 6, 'Volleyball': 7, 'American Football': 8
}

const numberToSport = {
	1: 'Basketball', 2: 'Tennis', 3: 'Soccer', 4: 'Badminton',
	5: 'Baseball', 6: 'Sprinting', 7: 'Volleyball', 8: 'American Football'
}


const userGames = (props) => {



	async function getAddress(jsonElement) {
		console.log(jsonElement.location.coordinates[1], jsonElement.location.coordinates[0])
		let addressDisplayed = "Unknown address"
		if (jsonElement.location) {
			// Get address from latitude & longitude.
			await Geocode.fromLatLng(`${jsonElement.location.coordinates[1]}`, `${jsonElement.location.coordinates[0]}`).then(
				(response) => {
					const address = response.results[0].formatted_address;
					console.log(response.results[0])
					console.log(address, address.tagName, address.type);
					console.log("Good response")
					addressDisplayed = address;
					console.log("addressDisplayed", addressDisplayed)
					//return address;
				},
				(error) => {
					console.error(error);
					console.log("Ugh")
					//return "Unknown address"
				}
			);
		}

		return addressDisplayed;
	};

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

		if (loggedInUser) {

			console.log("Get user games")
			fetch(`http://localhost:8000/user/getUsersGames/${JSON.parse(loggedInUser)}`, {
				//mode: "no-cors",
				method: "GET",
				headers: {
					'Content-type': 'application/json',
					"Access-Control-Allow-Origin": '*',

				},
				//query: JSON.stringify({game_id: parseInt(homeGameId)})

			})
				.then(response => response.json())
				.then(async json => {
					console.log(json);
					setListOfGames(json);
					console.log(foundUser, foundUserName)
					const listOfE = await Promise.all(json.map(async (jsonElement) => (
						<Container fluid key={jsonElement.id}>
							<Card bg="dark" key={jsonElement.id} className="text-center" style={{boxShadow: "1px 1px 3px black"}}>
								<Card.Header>
											<Card.Title><div className="cardText">Game</div></Card.Title>
								</Card.Header>
								<Card.Body>
									<Row className="align-items-center">
										<Col md={{ span: 3 }}>
											<Image src={jsonElement.sport in numberToSport ?
												sportToImage[numberToSport[jsonElement.sport]] : '/questionMark.png'} roundedCircle />
										</Col>
										<Col md={{ span: 5 }}>
											<ListGroup>
												<ListGroup.Item>Location: {await getAddress(jsonElement)}</ListGroup.Item>
												<ListGroup.Item>Description: {jsonElement.comments}</ListGroup.Item>
												<ListGroup.Item>Start Time: {(jsonElement.time)}</ListGroup.Item>
											</ListGroup>
										</Col>
										<Col md={{ span: 4 }}>
											<ListGroup>
												<ListGroup.Item>Minimum Skill Level: {jsonElement.skill_level}</ListGroup.Item>
												<ListGroup.Item>Max Group Size: {jsonElement.max_group_size}</ListGroup.Item>
												<ListGroup.Item>Spots Left If I Stay In This Game: {jsonElement.max_group_size - jsonElement.current_group_size} </ListGroup.Item>
											</ListGroup>
										</Col>
									</Row>
								</Card.Body>
								<Card.Footer>
									<Row className="align-items-center">
										<Col>
											<Button variant="secondary" onClick={(e) => {
												const requestOptions = {
													method: 'PUT',
													headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": '*' },
													body: JSON.stringify({ user_id: JSON.parse(loggedInUser), game_id: jsonElement.id })
												};
												if (e.target.innerHTML == "Join Game") {

													fetch(process.env.backend_url + '/games/joinGame/', requestOptions)
														.then(response => response.json())
														.then(data => {
															console.log(data);
															e.target.innerHTML = "Leave Game";
														})
														.catch(error => { console.log(error) })
												}
												else if (e.target.innerHTML == "Leave Game") {
													fetch(process.env.backend_url + '/games/leaveGame/', requestOptions)
														.then(response => response.json())
														.then(data => {
															console.log(data);
															e.target.innerHTML = "Join Game";
														})
														.catch(error => { console.log(error) })
												}
											}}>Leave Game</Button>
										</Col>
										<Col>
											<Button variant="secondary" onClick={(e) => {
												localStorage.setItem('homeGameId', `${jsonElement.id}`)
												Router.push("../userGames/gameParticipants")
											}}>View Participants </Button>
										</Col>
									</Row>
								</Card.Footer>
							</Card>
							<br />
							<br />
						</Container>
					)
					));
					setListOfElements(listOfE);
				})
				.catch(errorMessage => {
					console.log(errorMessage);
					console.log("Bye")

				});

		}
	}, []);

	const [foundUser, setUser] = useState("");
	const [foundUserName, setUsername2] = useState("");
	const [listOfGames, setListOfGames] = useState([]);
	const [listOfElements, setListOfElements] = useState([])


	return (

		<div className="userGames">

			<style jsx global>{`
								       ul.navBar {
						  list-style-type: none;
						  margin: 0;
						  padding: 0;
						  overflow: hidden;
						  background-color: #333;
						}

						li.navBar {
						  float: left;
						}

						li a.navBar {
						  display: block;
						  color: white;
						  text-align: center;
						  padding: 14px 16px;
						  text-decoration: none;
						}

						/* Change the link color to #111 (black) on hover */
						li a.navBar:hover {
						  background-color: #111;
						}

						body {
							background-color: #D2D2D2;
							

						}

						.informationDiv {
							margin: auto;
							text-align: center;
							background-color: purple;
						}

						.game {
							background-color: grey;
						}

						.cardText {
							color: white;
						}

		      `}</style>

			<Navbar bg="dark" variant="dark" sticky="top">
				<Navbar.Brand href="/homePage/homePage">Sportify</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/fillOutProfile/viewProfile">Profile</Nav.Link>
					<Nav.Link href="/userGames/userGames" active="true">My Games</Nav.Link>
				</Nav>
				<Nav inline="true">
					<Nav.Link href="/">Logout</Nav.Link>
				</Nav>
			</Navbar>

			<br />

			<Container fluid>
				<Row>
					{listOfElements}
				</Row>
			</Container>
		</div>
	)
};

export default userGames;
const Box = props => <div className="box">{props.children} </div>;
