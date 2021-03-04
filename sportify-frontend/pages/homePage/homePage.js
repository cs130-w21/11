import React, { component, useState, useEffect } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Geocode from 'react-geocode'



//import Geocode from "react-geocode"
//import Link from 'next/link'
//import soccerPic from "soccer.jpg"
//import './homePage.module.css';


const sportToImage = {
	'Baseball': '/baseball.jpg',
	'Soccer': '/soccer.jpg',
	'Football': '/football.png',
	'Sprinting': '/sprinting.jpg',
	'Volleyball': '/volleyball.jpg',
	'Tennis': '/tennis.jpg',
	'Badminton': '/badminton.jpg'
};

const genderToImage = {
	'Man': '/maleProfile.png',
	'Woman': '/femaleProfile.png',
	'Other': '/questionMark.png'
};

const HomePage = (props) => {

	useEffect(()=>{
        Geocode.setApiKey("AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE");
        Geocode.setLanguage("en");
    }, []);


	// const [sportsSelected, setSportsSelected]=useState({'Tennis': false, 'Soccer': false, 
	// 'Badminton': false, 'Baseball': false, 'Sprinting': false, 'Volleyball': false, 'American Football': false});
	const [searchSport, setSearchSport] = useState('No selection');
	const [minSkillLevel, setMinSkillLevel] = useState('');
	//const [timeFromNow, setTimeFromNow]=useState('Within 1 day');
	const [weeksAhead, setWeeksAhead] = useState('');
	const [radius, setRadius] = useState('');
	const [gendersSelected, setGendersSelected] = useState({ 'Men': false, 'Women': false, 'Other': false});
	const [skillsSelected, setSkillsSelected] = useState({ '1': false, '2': false, '3': false, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false, '10': false });
	const [typeSelected, setTypeSelected] = useState("Games");
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [groupNumber, setGroupNumber] = useState('');
	const [minAge, setMinAge] = useState('');
	const [foundUser, setUser] = useState("")
	const [foundUserName, setUsername2] = useState("")

	// const sportsFunction = (e) => {
	// 	if (e.target.getAttribute('type')=="option")
	// 	{
	// 		let copySports={...sportsSelected};
	// 		let sportChosen=e.target.value;
	// 		copySports[sportChosen]=!(copySports[sportChosen]);
	// 		setSportsSelected(copySports);
	// 	}

	// };

	const skillsFunction = (e) => {
		if (e.target.getAttribute('type') == "option") {
			let copySkillLevels = { ...skillsSelected };
			let skillLevelChosen = e.target.value;
			copySkillLevels[skillLevelChosen] = !(copySkillLevels[skillLevelChosen]);
			setSkillsSelected(copySkillLevels);
		}

	};


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

	}, []);

	const gendersFunction = (e) => {
		if (e.target.getAttribute('type') == "option") {
			let copyGenders = { ...gendersSelected };
			let genderChosen = e.target.value;
			copyGenders[genderChosen] = !(copyGenders[genderChosen]);
			setGendersSelected(copyGenders);
			console.log(gendersSelected);
		}
	};

	// const updateDicts = (e, dictInQuestion, changeDictFunction) => {
	// 	let copyDict={...dictInQuestion};
	// 	copyDict.(e.target.value)=!(copyDict.(e.target.value));
	// 	changeDictFunction(copyDict);
	// };


	let optionalUserSkillLevels = typeSelected == "People" ? (
		<label>
			Skill Level: {' '}
			<select multiple onChange={skillsFunction} value={Object.keys(skillsSelected).find(key => skillsSelected[key] == true)}>
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
			<br />
		</label>
	) : '';


	let optionalGenderSelection = typeSelected == "People" ? (

		<label>
			Genders: {' '}
			<select multiple onChange={gendersFunction} value={Object.keys(gendersSelected).find(key => gendersSelected[key] == true)} >
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


	{ /*
	let optionalDateSelection = typeSelected=="Games" ? (
			<label>
				Game time: {' '}
				<select>
					<option value="Within 1 day">Within 1 day</option>
					<option value="Within 1 week">Within 1 week</option>
					<option value="Within 2 weeks">Within 2 weeks</option>
					<option value="Within 1 month">Within 1 month</option>
					<option value="Within 3 months">Within 3 months</option>
					<option value="Within 6 months">Within 6 months</option>
					<option value="Within 1 year">Within 1 year</option>
				</select>
				<br/>
			</label>) : '';

	*/	}

	let optionalDateSelection = typeSelected == "Games" ? (
		<label>
			Select Within How Many Weeks Ahead the Games Should Be: {' '}
			<input type="number" min={1} value={weeksAhead} onChange={(e) => setWeeksAhead(e.target.value)} />
			{'    '}
		</label>
	) : '';

	

	let optionalMinimumGameSkillLevel = typeSelected == "Games" ? (
		<label>
			Minimum Game Skill Level: {' '}
			<input type="number" min={1} value={minSkillLevel} onChange={(e) => setMinSkillLevel(e.target.value)} />
			{'    '}
		</label>

	) : '';



	let optionalMinAge = typeSelected == "Games" ? (
		<label>
			Minimum Age: {' '}
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
							background-color: yellow;
							

						}

						.informationDiv, .searchDiv, .createGame, .searchHeading {
							margin: auto;
							text-align: center;
						}

						.game {
							background-color: grey;
						}

						.person {
							background-color: tan;
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

			<br />


			<div className="informationDiv">
				<h1>Hi {foundUserName}</h1>
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


				<form> {/* onSubmit */}

					<label>
						People or Games: {' '}
						<select value={typeSelected} onChange={(e) => setTypeSelected(e.target.value)}>
							<option value="People"> People </option>
							<option value="Games"> Games </option>
						</select>
					</label>

					{'    '}

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


					<label>
						Radius (in miles): {' '}
						{/* 
					        <select value={radius} onChange={(e)=>setRadius(e.target.value)}>
								<option value="Within 1 mile">Within 1 mile</option>
								<option value="Within 3 miles">Within 3 miles</option>
								<option value="Within 5 miles">Within 5 miles</option>
								<option value="Within 10 miles">Within 10 miles</option>
								<option value="Within 20 miles">Within 20 miles</option>
								<option value="Within 50 miles">Within 50 miles</option>
								<option value="Within 100 miles">Within 100 miles</option>
							</select>

							*/ }
						<input type="number" min={0} value={radius} onChange={(e) => setRadius(e.target.value)} />

					</label>



					{'    '}


					
					<br />

					{optionalMaxGroupSize}
					{optionalDateSelection}
					{optionalMinimumGameSkillLevel}


					{optionalMinAge}
					{optionalGenderSelection}
					{optionalUserSkillLevels}
					{optionalUserSelection}
					{optionalEmailSelection}


					<br />

					<button className="submitSearchFilters" onClick={(e)=>{
							e.preventDefault();
							let lati, long;
							console.log("In submit filters handler function!");
							//const userNameData= {username: foundUser};
							//let jsonUserData;
							fetch('http://localhost:8000/user/getUsers', {
				            //mode: "no-cors",
				            method: "GET",
				            headers: {
				                'Content-type': 'application/json',
				                "Access-Control-Allow-Origin": '*'
				            },
				            //query: JSON.stringify(userNameData)
				        })
				            .then(response => response.json())
				            .then(json => {
				                console.log(json);

				            })
				            .catch (errorMessage =>{
				            	console.log(errorMessage);
				            	// lati=-76;
				                //    long=-148;
				            }); 

				    //         Geocode.fromAddress(address).then(
								//   (response) => {
								//     const { lat, lng } = response.results[0].geometry.location;
								//     // console.log(lat, lng);
								//     // lati=lat;
								//     // long=lng;

								//   },
								//   (error) => {
								//     console.error(error);
								//   }
								// );




							// const reactData = { "sports": searchSport, "max_group_size": groupNumber,
							// "skill_levels": skillsSelected, "weeksAhead": weeksAhead, "radius": radius,
							// }
							// fetch('http://localhost:8000/user/signin', {
				   //          //mode: "no-cors",
				   //          method: "POST",
				   //          headers: {
				   //              'Content-type': 'application/json',
				   //              "Access-Control-Allow-Origin": '*'
				   //          },
				   //          body: JSON.stringify(reactData)
				   //      })
				   //          .then(response => response.json())
				   //          .then(json => {
				   //              if (json.message === "Signin successful") {
				   //                  console.log("Result Here")
				   //                  console.log(json)
				   //                  localStorage.setItem('user-id', json.id)
				   //                  localStorage.setItem('username', json.username)
				   //                  Router.push("../homePage/homePage")
				   //              }



				   //          })
					
						}}>Submit search filters!</button>

					<br/>


					{/* <input type="submit" value="Submit" />  */}

					<br />
					<br />

				</form>


			</div>

			<br />



			<Alert variant='primary' className="searchHeading">Search Results!</Alert>

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

							<button onClick={(e) => {

								e.target.innerHTML = (e.target.innerHTML == "Join the game!") ?
									"Un-join the game!" : "Join the game!";

							}}>Join the game!</button>

							<Link href='/userGames/gameParticipants' passHref>
								<div className="gameParticipants">
									<button> <a>View game participants!</a> </button>
								</div>
							</Link>



						</Box>

					</Col>


					<Col>
						<Box>
							<div> Start Time </div>
							<br />
							<div> End Time </div>
							<br />
							<div> Minimum Skill Level Allowed </div>
							<br />
							<div> Number of people allowed </div>
							<br />
							<div> Number of spots left! </div>
							<br />

						</Box>
					</Col>
				</Row>
			</Container>

			<br />
			<br />

			<Container fluid>
				<Row className="person">
					<Col>
						<Box>
							<img src={'/maleProfile.png'} />
							<br />
							<div> Person Name </div>
							<br />
							<div> Description </div>
							<br />
							<div> Best Sport </div>
							<br />
							<div> Best Sport Skill Level </div>
							<br />
						</Box>
					</Col>

					<Col >
						<Box>

							<div>  </div>
							<br />
							<br />
							<div className="gameDiv">
								<b> Join one on one game with this person! </b>
								<br />

								<label className="gameDescription">
									Description:
							          <input type="text" />
								</label>

								<label className="gameLocation">
									Location:
							          <input type="text" />
								</label>

								<br />

								<label className="gameGroupSize">
									Number of people allowed (including creator): {' '}
									<input type="number" min={2} />
								</label>

								<br />

								<button onClick={(e) => {
									console.log(e.target.innerHTML);
									e.target.innerHTML = (e.target.innerHTML == "Join one on one game with this athlete!") ?
										"Unjoin one on one game with this athlete!" : "Join one on one game with this athlete!";
									console.log(e.target.innerHTML);


								}}>Join one on one game with this athlete!</button>

							</div>


						</Box>

					</Col>


					<Col>
						<Box>
							<div className="sportInfo">

								<b> Times for this sport </b>
								<br />

								<Alert variant='secondary' className="mondayTime">Monday Time: 3 pm - 4pm</Alert>
								<br />
								<Alert variant='secondary' className="tuesdayTime">Tuesday Time: 3 pm - 4pm</Alert>
								<br />

								<Alert variant='secondary' className="wednesdayTime">Wednesday Time: 3 pm - 4pm</Alert>
								<br />

								<Alert variant='secondary' className="thursdayTime">Thursday Time: 3 pm - 4pm</Alert>
								<br />



								<Alert variant='secondary' className="fridayTime">Friday Time: 3 pm - 4pm</Alert>
								<br />


								<Alert variant='secondary' className="saturdayTime">Saturday Time: 3 pm - 4pm</Alert>
								<br />

								<Alert variant='secondary' className="sundayTime">Sunday Time: 3 pm - 4pm</Alert>
								<br />



							</div>

							<br />





						</Box>

					</Col>

				</Row>


			</Container>

		</div >
	);
};


export default HomePage;
const Box = props => <div className="box">{props.children} </div>;

