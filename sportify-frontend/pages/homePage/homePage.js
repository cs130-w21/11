import React, { component, useState, useEffect } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
		<label>
			Minimum Skill Level in the Game: {' '}
			<select onChange={(e) => setMinSkillLevel(e.target.value)} value={minSkillLevel}>
				<option value="No selection">No selection</option>
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
			</select>
			{'    '}
		</label>
	) : '';


	let userSkillLevels = (typeSelected == "People") ? (
		<label>
			Skill Levels allowed: {' '}
			<select multiple onChange={skillsFunction} value={skillsSelected}>
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
			</select>
			{'    '}
		</label>
	) : '';


	let optionalGenderSelection = typeSelected == "People" ? (

		<label>
			Genders: {' '}
			<select multiple onChange={gendersFunction} value={gendersSelected} >
				<option value="Men">Men</option>
				<option value="Women">Women</option>
				<option value="Other">Other</option>
			</select>
			{'    '}
		</label>
	) : '';

	let optionalUserSelection = typeSelected == "People" ? (
		<label>
			Username: {' '}
			<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
			{'    '}
		</label>
	) : '';

	let optionalEmailSelection = typeSelected == "People" ? (
		<label>
			Email: {' '}
			<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
			{'    '}
		</label>
	) : '';



	let optionalDateSelection = typeSelected == "Games" ? (
		<label>
			Select Within How Many Weeks Ahead the Games Should Be: {' '}
			<input type="number" min={1} value={weeksAhead} onChange={(e) => setWeeksAhead(e.target.value)} />
			{'    '}
		</label>
	) : '';






	let optionalMinAge = typeSelected == "People" ? (
		<label>
			Minimum Age of Participants: {' '}
			<input type="number" min={1} value={minAge} onChange={(e) => setMinAge(e.target.value)} />
			{'   \t'}
		</label>
	) : '';

	let optionalMaxGroupSize = typeSelected == "Games" ? (
		<label>
			Max Number of people in group game (including creator): {' '}
			<input type="number" min={2} value={groupNumber} onChange={(e) => setGroupNumber(e.target.value)} />
			{'   '}
		</label>
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
							background-color: yellow;
							

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

			<br />


			<div className="informationDiv">
				<h1>Hi {foundUserName}</h1>
				<h2>Go profile page if needed to view and edit profile with your details!</h2>
				<p>
					Welcome to our app! Note that when searching for people exclusive-or games,
					you must choose this with respect to your skill level. A 10 refers to an expert
					within the game, while a 1 refers to a complete beginner. A 5 is around the skill level
					of a club or tournament player who has competed before.
					</p>
			</div>

			<br />



			<Link href='/homePage/createGame' passHref>
				<div className="createGame">
					<button> <a>Create game now! </a> </button>
				</div>
			</Link>

			<br />
			<br />


			<div className="searchDiv">

				<h1> Search Filters </h1>


				<Container fluid>

					<Row>

						<Col>

							<label>
								People or Games: {' '}
								<select value={typeSelected} onChange={(e) => setTypeSelected(e.target.value)}>
									<option value="People"> People </option>
									<option value="Games"> Games </option>
								</select>
							</label>

							{'    '}

						</Col>

						<Col>

							<label>
								Sport: {' '}
								<select value={searchSport} onChange={(e) => setSearchSport(e.target.value)} >
									<option value="No selection">No Selection</option>
									<option value="Basketball">Basketball</option>
									<option value="Tennis">Tennis</option>
									<option value="Soccer">Soccer</option>
									<option value="Badminton">Badminton</option>
									<option value="Baseball">Baseball</option>
									<option value="Sprinting">Sprinting</option>
									<option value="Volleyball">Volleyball</option>
									<option value="American Football">American Football</option>
								</select>
							</label>

							{'    '}

						</Col>

						<Col>
							<label>
								Radius (in miles): {' '}

								<input type="number" min={0} value={radius} onChange={(e) => setRadius(e.target.value)} />

							</label>



							{'    '}

						</Col>

					</Row>

					<br />
					<br />


					<Row>

						<Col xs={2}>
							{(typeSelected == "Games") ? optionalMinimumSkillLevelForGame : userSkillLevels}
						</Col>

						<Col xs={2}>
							{(typeSelected == "Games") ? optionalMaxGroupSize : optionalGenderSelection}
						</Col>




						<Col xs={2}>
							{(typeSelected == "Games") ? optionalDateSelection : optionalUserSelection}
						</Col>

						<Col xs={2}>
							{typeSelected == "People" ? optionalEmailSelection : <h1>Have fun!</h1>}
						</Col>

						<Col xs={2}>
							{typeSelected == "People" ? optionalMinAge : <h1>Stay Safe!</h1>}
						</Col>


					</Row>



					<br />

					<button className="submitSearchFilters" onClick={(e) => {
						e.preventDefault();
						// let lati=34.0689;
						// let long=-118.4452;

						let lati;
						let long;
						console.log("In submit filters handler function!");
						let monday, tuesday, wednesday, thursday, friday, saturday, sunday;






						console.log("GEt user location")
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

							let userSchedule = [];
							console.log("Get user schedule")
							fetch(process.env.backend_url + `/schedule/getSchedule/?id=${foundUser}`, {
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
									userSchedule = json;

								})
								.catch(errorMessage => {
									console.log(errorMessage);
									console.log("Bye")

								});


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



							fetch(baseUrlPeople, {
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

									const peopleList = json.map((jsonElement) =>
										<li key={jsonElement.id}>
											<Container fluid key={jsonElement.id}>
												<Row className="person">
													<Col>
														<Box>
															<img src={(jsonElement.gender ? genderToImage[jsonElement.gender] : '/questionMark.png')} />
															<br />
															<div> <b>Person Username:</b> {jsonElement.username} </div>
															<br />
															<div> <b>Bio:</b> {jsonElement.description ? jsonElement.description : "No bio"} </div>
															<br />
															<div> <b>Best Sport:</b> {jsonElement.sport ? numberToSport[jsonElement.sport] : "No sport specified (Soccer default will used for 1 v 1's)"} </div>
															<br />
															<div> <b>Best Sport Skill Level:</b> {jsonElement.skill_level ? jsonElement.skill_level : "No skill level specified"} </div>
															<br />
														</Box>
													</Col>

													<Col >
														<Box>

															<br />
															<br />
															<div className="gameDiv">
																<b> Join one on one game with this person! </b>
																<br />


																<br />

																{ /*<Link href='/homePage/createOneOnOne' passHref> */}
																<div className="joinOneVOne">
																	<button onClick={(e) => {
																		console.log(e.target.className);
																		let splitClasses = e.target.className.split(" ")
																		let splitInfo = splitClasses[1].split('-')
																		localStorage.setItem('localOpponentSport', splitInfo[2])
																		localStorage.setItem('localOpponentName', splitInfo[1])
																		localStorage.setItem('localOpponentId', splitInfo[0])
																		console.log(splitInfo)
																		Router.push("createOneOnOne")

																	}} className={`${jsonElement.id}-${jsonElement.username}-${jsonElement.sport ? jsonElement.sport : 'Soccer'}`}>Join one on one game with this athlete!</button>
																</div>
																{/* </Link> */}

															</div>


														</Box>

													</Col>


													<Col>
														<Box>
															<div className="sportInfo">

																<b> Times for this sport </b>
																<br />

																<Alert variant='secondary' className="mondayTime">Monday Time: {(userSchedule.length != 0 && userSchedule[0].monday) ? userSchedule[0].monday : 'No times listed'}</Alert>
																<br />
																<Alert variant='secondary' className="tuesdayTime">Tuesday Time: {(userSchedule.length != 0 && userSchedule[0].tuesday) ? userSchedule[0].tuesday : 'No times listed'}</Alert>
																<br />

																<Alert variant='secondary' className="wednesdayTime">Wednesday Time: {(userSchedule.length != 0 && userSchedule[0].wednesday) ? userSchedule[0].wednesday : 'No times listed'}</Alert>
																<br />

																<Alert variant='secondary' className="thursdayTime">Thursday Time: {(userSchedule.length != 0 && userSchedule[0].thursday) ? userSchedule[0].thursday : 'No times listed'}</Alert>
																<br />



																<Alert variant='secondary' className="fridayTime">Friday Time: {(userSchedule.length != 0 && userSchedule[0].friday) ? userSchedule[0].friday : 'No times listed'}</Alert>
																<br />


																<Alert variant='secondary' className="saturdayTime">Saturday Time: {(userSchedule.length != 0 && userSchedule[0].saturday) ? userSchedule[0].saturday : 'No times listed'}</Alert>
																<br />

																<Alert variant='secondary' className="sundayTime">Sunday Time: {(userSchedule.length != 0 && userSchedule[0].sunday) ? userSchedule[0].sunday : 'No times listed'}</Alert>
																<br />



															</div>

															<br />





														</Box>

													</Col>

												</Row>


											</Container>
											<br />
											<br />
										</li>
									);

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
									console.log(furtherFilteredGames)

									const gamesList = await Promise.all(furtherFilteredGames.map(async (jsonElement) => (
										<li key={jsonElement.id}>
											<Container fluid>
												<Row className="game">
													<Col>
														<Box>
															<img src={jsonElement.sport in numberToSport ?
																sportToImage[numberToSport[jsonElement.sport]] : '/questionMark.png'} />
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
																	headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": '*' },
																	body: JSON.stringify({ user_id: foundUser, game_id: jsonElement.id })
																};
																if (e.target.innerHTML == "Join the game!") {

																	fetch(process.env.backend_url + '/games/joinGame/', requestOptions)
																		.then(response => response.json())
																		.then(data => {
																			console.log(data);
																			e.target.innerHTML = "Un-join the game!";
																		})
																		.catch(error => { console.log(error) })
																}
																else if (e.target.innerHTML == "Un-join the game!") {
																	fetch(process.env.backend_url + '/games/leaveGame/', requestOptions)
																		.then(response => response.json())
																		.then(data => {
																			console.log(data);
																			e.target.innerHTML = "Join the game!";
																		})
																		.catch(error => { console.log(error) })
																}


															}}>Join the game!</button>


															<div className="gameParticipants">
																<button onClick={(e) => {
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
															<div> Number of spots left assuming {foundUserName} joins: {jsonElement.max_group_size - jsonElement.current_group_size - 1} </div>
															<br />

														</Box>
													</Col>
												</Row>



											</Container>
											<br />
											<br />
										</li>)
									));

									setListOfGames(gamesList);





								})
								.catch(errorMessage => {
									console.log(errorMessage);

								});




						}




					}}>Submit search filters!</button>

					<br />



					<br />
					<br />

				</Container>


			</div>

			<br />



			<Alert variant='primary' className="searchHeading">Search Results!</Alert>

			<br />

			<ul className="listOfResults">

				{typeSelected == "Games" ? listOfGames : listOfUsers}
			</ul>




			<br />
			<br />

			

			

		</div >
	);
};


export default HomePage;
const Box = props => <div className="box">{props.children} </div>;

