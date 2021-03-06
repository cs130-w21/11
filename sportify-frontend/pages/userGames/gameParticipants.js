import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, { component, useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

const gameParticipants = (props ) => {

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

		const homeGameId=localStorage.getItem('homeGameId');
		if (homeGameId)
		{
			const homeGameIdCopy=(homeGameId);
			setGameId(parseInt(homeGameIdCopy))

		   console.log("Get game id")
           fetch(`http://localhost:8000/games/getGame?game_id=${homeGameIdCopy}`, {
            //mode: "no-cors",
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            },
            
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                userSchedule=json;

            })
            .catch (errorMessage =>{
            	console.log(errorMessage);
            	console.log("Bye")
            	
            });
		}

	}, []);

	const [foundUser, setUser] = useState("");
	const [foundUserName, setUsername2] = useState("");
	const [gameId, setGameId]=useState("")
	const [gameUsernames, setGameUsernames]=useState([])
	
	return (

		<div className="gameParticipants">
			
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
							background-color: teal;
							

						}

						
						.informationDiv, .backToUserGames, .backToHome {
							margin: auto;
							text-align: center;
						}

						

						.participant {
							background-color: aqua;
						}

						

		      `}</style>

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
							<Link href='/fillOutProfile/viewOrEditProfile' passHref>
								<div className="viewOrEditProfile">
									<a>View/Edit my profile</a>
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
					        <Link href='/frontpage/Login' passHref>
					        	<div className="logoutDiv">
									<a>Logout!</a>
								</div>
							</Link>
						</li>

					</ul>
				</div>

				<br/>

		      <Alert variant='primary' className="informationDiv">List of People in this Game!</Alert>

		      <br/>

		     
		     <Container fluid>
		     	<Row className='participant'>
		     		<Col>
		     			<Alert variant='secondary' className='text-center'>John, Male, 32</Alert>
		     		</Col>
		     	</Row>

		     	<Row className='participant'>
		     		<Col>
		     			<Alert variant='secondary' className='text-center'>Gilda, Female, 21</Alert>
		     		</Col>
		     	</Row>

		     	<Row className='participant'>
		     		<Col>
		     			<Alert variant='secondary' className='text-center'>Aerin, Other, 22</Alert>
		     		</Col>
		     	</Row>


		    
			</Container>

			<br />
			<br />

			<Link href='/userGames/userGames' passHref>
					<div className="backToUserGames">
						<button> <a>Back to user games! </a> </button>
					</div>
			</Link>

			<Link href='/homePage/homePage' passHref>
					<div className="backToHome">
						<button> <a>Back to home! </a> </button>
					</div>
			</Link>
		</div>
	)
};

export default gameParticipants;
const Box = props => <div className="box">{props.children} </div>;


