import React, {component, useState, useEffect} from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Geocode from 'react-geocode'
import Router from 'next/router';


const userGames = (props ) => {

	const [foundUser, setUser] = useState("");
	const [foundUserName, setUsername2] = useState("");

	useEffect(()=>{
        Geocode.setApiKey("AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE");
        Geocode.setLanguage("en");

        const loggedInUser = localStorage.getItem("user-id");
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setUser(foundUser);

		}

		if (loggedInUser)
		{

		   console.log("Get user games")
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
		const loggedInUserName = localStorage.getItem("username");
		if (loggedInUserName) {
			const foundUserName = (loggedInUserName);
			setUsername2(foundUserName);

		}
    }, []);

	
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
							background-color: green;
							

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
