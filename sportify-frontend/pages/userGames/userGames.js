import React, {component, useState} from 'react'
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

const userGames = (props ) => {
	
	return (

		<div className="gameChallenges">
			
				<style jsx global>{`
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

						

		      `}</style>

			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/homePage/homePage">Sportify</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/fillOutProfile/viewProfile">Profile</Nav.Link>
					<Nav.Link href="/userGames/userGames" active="true">My Games</Nav.Link>
				</Nav>
				<Nav inline="true">
					<Nav.Link href="/frontpage/Login">Logout</Nav.Link>
				</Nav>
			</Navbar>

			<br />

		    <div className="informationDiv">
					<p>
						Here you will find the list of user games! You can join or unjoin games that you don't like!
					</p>
			</div>

			<br />
			<br />
			

			<Container fluid>
						<Row className="game">
							<Col>
							    <Box>
									<img src="/soccer.jpg" />
								</Box>
							</Col>


							<Col >
								<Box>
									
									<div> Event Name </div>
									<br />
									<div> Event Location </div>
									<br />
									<div> Event description </div>
									<br />

									<button onClick={(e)=>
										{

											e.target.innerHTML=(e.target.innerHTML=="Join the game!") ? 
											"Un-join the game!": "Join the game!";

										} }> Join the game! </button>

								</Box>

							</Col>


							<Col>
								<Box>
									<div> Start Time </div>
									<br />
									<div> End Time </div>
									<br />
									<div> Number of people allowed </div>
									<br />
									<div> Skill Levels allowed </div>
									<br />
									<div> Number of spots left! </div>
									<br />

								</Box>
							</Col>
						</Row>
			</Container>
		</div>
	)
};

export default userGames;
const Box = props => <div className="box">{props.children} </div>;
