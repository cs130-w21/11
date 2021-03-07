import React, { component, useState, useEffect } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Alert from 'react-bootstrap/Alert'
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
import LazyHero from 'react-lazy-hero';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';

const sportToImage = {
	'Baseball': '/baseball.png',
	'Soccer': '/soccer.jpg',
	'Sprinting': '/sprinting.jpg',
	'Volleyball': '/volleyball.jpg',
	'Tennis': '/tennis.jpg',
	'Badminton': '/badminton.jpg',
	'American Football': 'football.png',
	'Basketball': 'basketball.jpg'
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

const HomePage = (props) => {

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



	const [searchSport, setSearchSport] = useState('No selection');
	const [minSkillLevel, setMinSkillLevel] = useState('No selection');
	const [weeksAhead, setWeeksAhead] = useState('');
	const [radius, setRadius] = useState('');

	const [typeSelected, setTypeSelected] = useState("Games");
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [groupNumber, setGroupNumber] = useState('');
	const [minAge, setMinAge] = useState('');
	const [foundUser, setUser] = useState("");
	const [foundUserName, setUsername2] = useState("");
	const [gendersSelected, setGendersSelected] = useState([]);
	const [skillsSelected, setSkillsSelected] = useState([]);
	const [listOfUsers, setListOfUsers] = useState([]);
	const [listOfGames, setListOfGames] = useState([]);



	const skillsFunction = (e) => {
		let setOfSkills = Array.from(event.target.selectedOptions, (item) => item.value);
		setSkillsSelected(setOfSkills);
		console.log(setOfSkills);
	};

	const gendersFunction = (e) => {
		let setOfGenders = Array.from(event.target.selectedOptions, (item) => item.value);
		setGendersSelected(setOfGenders);
		console.log(setOfGenders);
	};

	let optionalMinimumSkillLevelForGame = (typeSelected == "Games") ? (
		<Form>
			<Form.Label>Minimum Skill Level</Form.Label>
			<FormControl as="select" value={minSkillLevel} onChange={(e) => setMinSkillLevel(e.target.value)}>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6 </option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
			</FormControl>
		</Form>
	) : '';


	let userSkillLevels = (typeSelected == "People") ? (
		<Form>
			<Form.Label>Minimum Skill Level</Form.Label>
			<FormControl as="select" multiple value={skillsSelected} onChange={skillsFunction}>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6 </option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
			</FormControl>
		</Form>
	) : '';


	let optionalGenderSelection = typeSelected == "People" ? (
		<Form>
			<Form.Label>Gender</Form.Label>
			<FormControl as="select" multiple value={gendersSelected} onChange={gendersFunction}>
				<option value="Men">Men</option>
				<option value="Women">Women</option>
				<option value="Other">Other</option>
			</FormControl>
		</Form>
	) : '';

	let optionalUserSelection = typeSelected == "People" ? (
		<Form>
			<Form.Label>Username</Form.Label>
			<FormControl type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
		</Form>
	) : '';

	let optionalEmailSelection = typeSelected == "People" ? (
		<Form>
			<Form.Label>Email</Form.Label>
			<FormControl type="email" min={1} value={email} onChange={(e) => setEmail(e.target.value)} />
		</Form>
	) : '';



	let optionalDateSelection = typeSelected == "Games" ? (
		<Form>
			<Form.Label>Within how many weeks</Form.Label>
			<FormControl type="number" min={1} value={weeksAhead} onChange={(e) => setWeeksAhead(e.target.value)} />
		</Form>
	) : '';






	let optionalMinAge = typeSelected == "People" ? (
		<Form>
			<Form.Label>Minimum Age</Form.Label>
			<FormControl type="number" min={1} value={minAge} onChange={(e) => setMinAge(e.target.value)} />
		</Form>
	) : '';

	let optionalMaxGroupSize = typeSelected == "Games" ? (
		<Form>
			<Form.Label>Max Group Size</Form.Label>
			<FormControl type="number" min={2} value={groupNumber} onChange={(e) => setGroupNumber(e.target.value)} />
		</Form>
	) : '';



	return (
		<div>
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

						.cardText {
							color: white;
						}
						.informationDiv, .searchDiv, .createGame, .searchHeading {
							margin: auto;
							text-align: center;
						}

						.game {
							background-color: #cce7ff;
						}

						.person {
							background-color: tan;
						}

						.gameParticipants {
							color: black;
						}

						.hero {
							color: white;
							text-shadow: 1px 1px 5px black;
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
			<LazyHero imageSrc="/homePageBgImage.jpg" opacity={0.5} color="black" parallaxOffset={50} isCentered={true} minHeight="85vh">
				<div className="hero">
					<h1>Sportify</h1>
					<p >Play sports the way you want to</p>
					<Button href='/homePage/createGame' variant="secondary">
						Create game
					</Button>
				</div>
			</LazyHero>

			<br />


			<div className="informationDiv">
				<h1>Discover your next challenge</h1>
			</div>


			<div className="searchDiv">
				<Container fluid>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridPeopleOrGames">
								<Form.Label>Type</Form.Label>
								<Form.Control as="select" value={typeSelected} onChange={(e) => setTypeSelected(e.target.value)}>
									<option value="People"> People </option>
									<option value="Games"> Games </option>
								</Form.Control>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridSport">
								<Form.Label>Sport</Form.Label>
								<Form.Control as="select" value={searchSport} onChange={(e) => setSearchSport(e.target.value)}>
									<option value="No selection">No Selection</option>
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
							<Form.Group as={Col} controlId="formGridSport">
								<Form.Label>Radius (in miles)</Form.Label>
								<Form.Control type="number" min={0} value={radius} onChange={(e) => setRadius(e.target.value)} />
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridGameSkillLevelOrUsername">
								{(typeSelected == "Games") ? optionalMinimumSkillLevelForGame : optionalUserSelection}
							</Form.Group>
							<Form.Group as={Col} controlId="formGridGroupSizeOrEmail">
								{(typeSelected == "Games") ? optionalMaxGroupSize : optionalEmailSelection}
							</Form.Group>
							<Form.Group as={Col} controlId="formGridDateOrAge">
								{(typeSelected == "Games") ? optionalDateSelection : optionalMinAge}
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridGender">
								{(typeSelected == "People") ? optionalGenderSelection : null}
							</Form.Group>
							<Form.Group as={Col} controlId="formGridUserSkillLevel">
								{(typeSelected == "People") ? userSkillLevels : null}
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridSubmit">
								<Button variant="secondary" className="submitSearchFilters" onClick={(e) => {
									e.preventDefault();
									// let lati=34.0689;
									// let long=-118.4452;

									let lati;
									let long;
									console.log("In submit filters handler function!");
									let monday, tuesday, wednesday, thursday, friday, saturday, sunday;






									console.log("Get user location")
									fetch(process.env.backend_url + `/user/getUserLocation/${foundUser}`, {
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
											console.log("Hi")
											if (json) {
												lati = json[0]
												long = json[1]
											}


										})
										.catch(errorMessage => {
											console.log(errorMessage);
											console.log("Bye")

										});

									//console.log(lati, long);

									///games/getGames?sports[]=4&sports[]=3&username=person&


									if (typeSelected == "People") {
										let baseUrlPeople = process.env.backend_url + "/user/getUsers?"
										if (skillsSelected != null) {
											for (let i = 0; i < skillsSelected.length; i++) {
												if (i == 0) {
													baseUrlPeople += (`skill_levels[]=${skillsSelected[i]}`)
												}
												else {
													baseUrlPeople += (`&skill_levels[]=${skillsSelected[i]}`)
												}
											}
										}
										if (gendersSelected != null) {
											for (let i = 0; i < gendersSelected.length; i++) {
												let genderVariable = gendersSelected[i];
												let genderChar;
												if (genderVariable == "Men")
													genderChar = 'M';
												else if (genderVariable == "Women")
													genderChar = 'F'
												else if (genderVariable == "Other")
													genderChar = 'O'

												baseUrlPeople += (`&genders[]=${genderChar}`)
											}
										}
										if (username != '')
											baseUrlPeople += (`&username=${username}`);
										if (email != '')
											baseUrlPeople += (`&email=${email}`);
										if (minAge != '')
											baseUrlPeople += (`&age=${minAge}`);

										if (searchSport != 'No selection') {
											let sportNumber = sportToNumber[searchSport]
											baseUrlPeople += (`&sport=${sportNumber}`)
										}
										if (radius != '')
											baseUrlPeople += (`&radius=${radius}`);

										if (long != null)
											baseUrlPeople += (baseUrlPeople, `&userLng=${long}`)

										if (lati != null)
											baseUrlPeople += (baseUrlPeople, `&userLat=${lati}`)

										baseUrlPeople += (baseUrlPeople, `&currentUser=${foundUserName}`)
										console.log(baseUrlPeople)

										async function getSchedule(jsonElement)
										{
											let schedule;
											console.log("Get user schedule")
											let theSchedule=await fetch(process.env.backend_url + `/schedule/getSchedule/${jsonElement.id}`, {
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
													schedule = json;
													return json;

												})
												.catch(errorMessage => {
													console.log(errorMessage);
													console.log("Bye")
													schedule=[];
													return [];
												});
											return theSchedule;
										}

										fetch(baseUrlPeople, {
											//mode: "no-cors",
											method: "GET",
											headers: {
												'Content-type': 'application/json',
												"Access-Control-Allow-Origin": '*'
											},

										})
											.then(response => response.json())
											.then(async json => {
												console.log(json);

												const peopleList = await Promise.all(json.map(async (jsonElement) => {

													const userSchedule=await getSchedule(jsonElement);
		   
													return (
													<Container fluid key={jsonElement.id}>
														<Card bg="dark" key={jsonElement.id} style={{boxShadow: "1px 1px 3px black"}} className="text-center">
															<Card.Header className="align-items-center">
																<Card.Title><div className="cardText">User</div></Card.Title>
															</Card.Header>
															<Card.Body>
																<Row className="align-items-center">
																	<Col md={{ span: 3 }}>
																		<Image src={(jsonElement.gender ? genderToImage[jsonElement.gender] : '/questionMark.png')} roundedCircle />
																	</Col>
																	<Col md={{ span: 4 }}>
																		<ListGroup>
																			<ListGroup.Item style={{ fontWeight: "bold" }}>@{jsonElement.username}</ListGroup.Item>
																			<ListGroup.Item>{jsonElement.about_me ? jsonElement.about_me : "No bio"}</ListGroup.Item>
																			<ListGroup.Item>Plays {jsonElement.sport ? numberToSport[jsonElement.sport] : "potentially all sports?!"}</ListGroup.Item>
																			<ListGroup.Item>Skill Level: {jsonElement.skill_level ? jsonElement.skill_level : "None specified"}</ListGroup.Item>
																		</ListGroup>
																	</Col>
																	<Col md={{ span: 1 }}></Col>
																	<Col md={{ span: 4 }}>
																		<Table variant="light" striped borderless hover>
																			<thead>
																				<tr>
																					<th>Day</th>
																					<th>Availability</th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr>
																					<td>Monday</td>
																					<td>{(userSchedule.length != 0 && userSchedule[0].monday) ? userSchedule[0].monday : 'No times listed'}</td>
																				</tr>
																				<tr>
																					<td>Tuesday</td>
																					<td>{(userSchedule.length != 0 && userSchedule[0].tuesday) ? userSchedule[0].tuesday : 'No times listed'}</td>
																				</tr>
																				<tr>
																					<td>Wednesday</td>
																					<td>{(userSchedule.length != 0 && userSchedule[0].wednesday) ? userSchedule[0].wednesday : 'No times listed'}</td>
																				</tr>
																				<tr>
																					<td>Thursday</td>
																					<td>{(userSchedule.length != 0 && userSchedule[0].thursday) ? userSchedule[0].thursday : 'No times listed'}</td>
																				</tr>
																				<tr>
																					<td>Friday</td>
																					<td>{(userSchedule.length != 0 && userSchedule[0].friday) ? userSchedule[0].friday : 'No times listed'}</td>
																				</tr>
																				<tr>
																					<td>Saturday</td>
																					<td>{(userSchedule.length != 0 && userSchedule[0].saturday) ? userSchedule[0].saturday : 'No times listed'}</td>
																				</tr>
																				<tr>
																					<td>Sunday</td>
																					<td>{(userSchedule.length != 0 && userSchedule[0].sunday) ? userSchedule[0].sunday : 'No times listed'}</td>
																				</tr>
																			</tbody>
																		</Table>
																	</Col>

																</Row>
															</Card.Body>
															<Card.Footer>
																<Row className="align-items-center">
																	<Col>
																		<Button variant="secondary" onClick={(e) => {
																				console.log(e.target.className);											
																				let splitClasses = e.target.className.split(" ")
																				let splitInfo = splitClasses[0].split('-')
																				console.log(splitInfo);
																				localStorage.setItem('localOpponentSport', splitInfo[2])
																				localStorage.setItem('localOpponentName', splitInfo[1])
																				localStorage.setItem('localOpponentId', splitInfo[0])
																				console.log(splitInfo)
																				Router.push("createOneOnOne")
																		}} className={`${jsonElement.id}-${jsonElement.username}-${jsonElement.sport ? jsonElement.sport : 'Soccer'}`}>
																			Challenge
																		</Button>
																	</Col>
																</Row>
															</Card.Footer>
														</Card>
														<br />
														<br />
													</Container>
												)}));

												setListOfUsers(peopleList);





											})
											.catch(errorMessage => {
												console.log(errorMessage);

											});


									}
									else {
										let baseUrlGames = process.env.backend_url + "/games/getGames?"

										if (groupNumber != '')
											baseUrlGames += (`max_group_size=${groupNumber}`)

										// console.log(minSkillLevel);
										// console.log(groupNumber)



										if (minSkillLevel != 'No selection')
											baseUrlGames += (`&skill_levels=${minSkillLevel}`)

										if (searchSport != 'No selection') {
											let sportNumber = sportToNumber[searchSport]
											baseUrlGames += (`&sports=${sportNumber}`)
										}

										if (radius != '')
											baseUrlGames += (`&radius=${radius}`);

										if (weeksAhead != '')
											baseUrlGames += (`&weeksAhead=${weeksAhead}`);

										if (long != null)
											baseUrlGames += (baseUrlGames, `&userLng=${long}`)

										if (lati != null)
											baseUrlGames += (baseUrlGames, `&userLat=${lati}`)

										console.log(baseUrlGames)

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

										fetch(baseUrlGames, {
											//mode: "no-cors",
											method: "GET",
											headers: {
												'Content-type': 'application/json',
												"Access-Control-Allow-Origin": '*'
											},

										})
											.then(response => response.json())
											.then(async json => {
												console.log(json);
												const filteredGames = json.filter((jsonElement) =>
													(jsonElement.is_full == false)
												);
												console.log(filteredGames);
												const furtherFilteredGames = filteredGames.filter((jsonElement) =>

													(!(jsonElement.users.some(user => user.id == foundUser)))
												)
												console.log("Further filtered games: " + furtherFilteredGames)

												const gamesList = await Promise.all(furtherFilteredGames.map(async (jsonElement) => (
													<Container fluid key={jsonElement.id}>
														<Card bg="dark" key={jsonElement.id} style={{boxShadow: "1px 1px 3px black"}}>
															<Card.Header className="align-items-center">
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
																			<ListGroup.Item>Spots Left If I Join This Game: {jsonElement.max_group_size - jsonElement.current_group_size-1} </ListGroup.Item>
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
																				body: JSON.stringify({ user_id: foundUser, game_id: jsonElement.id })
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
																		}}>Join Game</Button>
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

												setListOfGames(gamesList);





											})
											.catch(errorMessage => {
												console.log(errorMessage);

											});




									}




								}}>Search</Button>
							</Form.Group>
						</Form.Row>
					</Form>

					<Container fluid>
						<Row>
							{typeSelected == "Games" ? listOfGames : listOfUsers}
						</Row>
					</Container>
				</Container>
			</div>
		</div >
	);
};


export default HomePage;
const Box = props => <div className="box">{props.children} </div>;

