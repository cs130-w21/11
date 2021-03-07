import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, { component, useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

const gameParticipants = (props ) => {

	const [foundUser, setUser] = useState("");
	const [foundUserName, setUsername2] = useState("");
	const [gameId, setGameId]=useState("")
	const [players, setPlayers]=useState([])

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
            .catch (errorMessage =>{
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
					<ul className="navBar">
						<li className="navBar">
							<Link href='/userGames/userGames' passHref>
								<div className="myGames">
									<a className="navBar">My Games</a>
								</div>
							</Link>

						</li>

						<li className="navBar">
							<Link href='/fillOutProfile/viewProfile' passHref>
								<div className="viewOrEditProfile">
									<a className="navBar">View/Edit my profile</a>
								</div>
							</Link>
						</li>

						<li className="navBar">
					        <Link href='/homePage/homePage' passHref>
					        	<div className="homeDiv">
									<a className="navBar">Go home!</a>
								</div>
							</Link>
						</li>

						<li className="navBar">
					        <Link href='/' passHref>
					        	<div className="logoutDiv">
									<a className="navBar">Logout!</a>
								</div>
							</Link>
						</li>

					</ul>
				</div>

				<br/>

		      <Alert variant='primary' className="informationDiv">List of People in this Game!</Alert>

		      <br/>

		     
		     <Container fluid>
		     	<ul className="ul">
			     	{players.map(jsonElement=>
		                (
		                	<li key={jsonElement.id}>
			                	<Row className='participant'>
						     		<Col>
						     			<Alert variant='secondary' className='text-center'>
						     			{jsonElement.username ? jsonElement.username : "Username not known"}, {jsonElement.gender ? jsonElement.gender : "Gender not known"}, 
						     			{jsonElement.age ? jsonElement.age : " Age not known"}</Alert>
						     		</Col>
					     		</Row>
				     		</li>

		                ))}
		     	</ul>


		    
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


