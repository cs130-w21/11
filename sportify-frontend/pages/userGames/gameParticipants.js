import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { component, useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const gameParticipants = (props) => {

	const [foundUser, setUser] = useState("");
	const [foundUserName, setUsername2] = useState("");
	const [gameId, setGameId] = useState("")
	const [players, setPlayers] = useState([])

	useEffect(() => {
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

		const homeGameId = localStorage.getItem('homeGameId');
		if (homeGameId) {
			const homeGameIdCopy = (homeGameId);
			setGameId(parseInt(homeGameIdCopy))

			console.log("Get game id", parseInt(homeGameId))
			fetch(`http://localhost:8000/games/getGame/${parseInt(homeGameId)}`, {
				//mode: "no-cors",
				method: "GET",
				headers: {
					'Content-type': 'application/json',
					"Access-Control-Allow-Origin": '*',

				},
				//query: JSON.stringify({game_id: parseInt(homeGameId)})

			})
				.then(response => response.json())
				.then(json => {
					console.log(json);
					setPlayers(json.users);
				})
				.catch(errorMessage => {
					console.log(errorMessage);
					console.log("Bye")

				});
		}

	}, []);



	return (

		<div className="gameParticipants">

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

						
						.informationDiv, .backToUserGames, .backToHome {
							margin: auto;
							text-align: center;
						}

						

						.participant {
							background-color: aqua;
						}

						

		      `}</style>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/homePage/homePage">Sportify</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/fillOutProfile/viewProfile">Profile</Nav.Link>
					<Nav.Link href="/userGames/userGames">My Games</Nav.Link>
				</Nav>
				<Nav inline="true">
					<Nav.Link href="/">Logout</Nav.Link>
				</Nav>
			</Navbar>
			<br />

			<Container className="text-center">
				<Jumbotron className="h2 jumbo">
					Game Participants
				</Jumbotron>
			</Container>

			<br />

			<Container fluid>

				<Table variant="dark" striped bordered hover className="text-center" style={{boxShadow: "1px 1px 3px black"}}>
					<thead>
						<tr>
							<th>Username</th>
							<th>Gender</th>
							<th>Age</th>
						</tr>
					</thead>
					<tbody>
						{players.map(jsonElement =>
						(
							<tr key={jsonElement.id}>
								<td>{jsonElement.username ? jsonElement.username : "Unknown"}</td>
								<td>{jsonElement.gender ? jsonElement.gender : "Gender not known"}</td>
								<td>{jsonElement.age ? jsonElement.age : " Age not known"}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>
		</div>
	)
};

export default gameParticipants;
const Box = props => <div className="box">{props.children} </div>;


