import React, {component, useState, useEffect} from 'react'
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
import Router from 'next/router';

const sportToImage = {
	'Baseball': '/baseball.jpg',
	'Soccer': '/soccer.jpg',
	'Football': '/football.png',
	'Sprinting': '/sprinting.jpg',
	'Volleyball': '/volleyball.jpg',
	'Tennis': '/tennis.jpg',
	'Badminton': '/badminton.jpg',
	'American Football': 'football.png'
};

const genderToImage = {
	'M': '/maleProfile.png',
	'F': '/femaleProfile.png',
	'O': '/other.png'
};

const sportToNumber={'Basketball': 1, 'Tennis': 2, 'Soccer': 3, 'Badminton': 4, 
'Baseball': 5, 'Sprinting': 6, 'Volleyball': 7, 'American Football': 8 }

const numberToSport={ 1:'Basketball',  2:'Tennis', 3: 'Soccer', 4: 'Badminton', 
5: 'Baseball', 6: 'Sprinting', 7: 'Volleyball', 8: 'American Football'}


const userGames = (props ) => {

	

	async function getAddress(jsonElement)
		{
			console.log(jsonElement.location.coordinates[1], jsonElement.location.coordinates[0])
			let addressDisplayed="Unknown address"
			if (jsonElement.location)
			{
				// Get address from latitude & longitude.
				await Geocode.fromLatLng(`${jsonElement.location.coordinates[1]}`, `${jsonElement.location.coordinates[0]}`).then(
				  (response) => {
				    const address = response.results[0].formatted_address;
				   console.log(response.results[0])
				    console.log(address, address.tagName, address.type);
				    console.log("Good response")
				    addressDisplayed=address;
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

	useEffect(()=>{
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

		if (loggedInUser)
		{

		   console.log("Get user games")
           fetch(`http://localhost:8000/user/getUsersGames/${localStorage.getItem("user-id")}`, {
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
                const listOfE=await Promise.all(json.map(async (jsonElement) => (
											  <li key={jsonElement.id}>
											    <Container fluid>
													<Row className="game">
														<Col>
															<Box>
																<img src={jsonElement.sport in numberToSport ? 
																sportToImage[numberToSport[jsonElement.sport]] : '/questionMark.png' } />
															</Box>
														</Col>


														<Col >
															<Box>

																<div> Event Location: {await getAddress(jsonElement)} </div>
																<br />
																<div> Event description: {jsonElement.comments} </div>
																<br />

																<button onClick={(e) => {
																	const requestOptions = {
																	        method: 'PUT',
																	        headers: { 'Content-Type': 'application/json',  "Access-Control-Allow-Origin": '*' },
																	        body: JSON.stringify({ user_id: localStorage.getItem("user-id"), game_id: jsonElement.id})
																	    };
																	if (e.target.innerHTML=="Join the game!")
																	{

																		fetch('http://localhost:8000/games/joinGame/', requestOptions)
																        .then(response => response.json())
																        .then(data => {
																        	console.log(data);
																        	e.target.innerHTML="Un-join the game!";
																        })
																        .catch ( error => {console.log(error)})
																	}
																	else if (e.target.innerHTML=="Un-join the game!")
																	{
																		fetch('http://localhost:8000/games/leaveGame/', requestOptions)
																        .then(response => response.json())
																        .then(data => {
																        	console.log(data);
																        	e.target.innerHTML="Join the game!";
																        })
																        .catch ( error => {console.log(error)})
																	}
				

																}}>Un-join the game!</button>

																
																	<div className="gameParticipants">
																		<button onClick={(e)=>
																		{
																			localStorage.setItem('homeGameId', `${jsonElement.id}`)
																			Router.push("../userGames/gameParticipants")
																		}}>View game participants! </button>
																	</div>



															</Box>

														</Col>


														<Col>
															<Box>
																<div> Start Time: {(jsonElement.time)}</div>
																<br />
																
																<div> Minimum Skill Level Allowed: {jsonElement.skill_level}</div>
																<br />
																<div> Number of people allowed in game: {jsonElement.max_group_size} </div>
																<br />
																<div> Number of spots left assuming {localStorage.getItem("username")} stays: {jsonElement.max_group_size-jsonElement.current_group_size} </div>
																<br />	

															</Box>
														</Col>
													</Row>

													

												</Container>
												<br />
												<br />
											  </li> )
											));
											setListOfElements(listOfE);



            })
            .catch (errorMessage =>{
            	console.log(errorMessage);
            	console.log("Bye")
            	
            });
            
		}
    }, []);

    const [foundUser, setUser] = useState("");
	const [foundUserName, setUsername2] = useState("");
	const [listOfGames, setListOfGames]=useState([]);
	const [listOfElements, setListOfElements]=useState([])

	
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

						

		      `}</style>

<<<<<<< HEAD
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
=======
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
>>>>>>> 09b0905f600e7f326af782981a6d8f7507aa8634

			<br />

		    <div className="informationDiv">
					<p>
						Here you will find the list of user games! You can join or unjoin games that you don't like!
					</p>
			</div>

			<br />
			<br />
			

			<ul className="listOfResults">
				{listOfElements}
			</ul>
		</div>
	)
};

export default userGames;
const Box = props => <div className="box">{props.children} </div>;
