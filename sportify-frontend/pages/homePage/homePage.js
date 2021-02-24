import React, {component, useState} from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
	'Woman': 'femaleProfile.png'
};

const HomePage = (props) => {

	const [sportsSelected, setSportsSelected]=useState({'Tennis': false, 'Soccer': false, 
	'Badminton': false, 'Baseball': false, 'Sprinting': false, 'Volleyball': false, 'American Football': false});
	const [timeFromNow, setTimeFromNow]=useState('Within 1 day');
	const [radius, setRadius]=useState('Within 1 mile');
	const [gender, setGender]=useState("Both Men and Women");
	const [skillsSelected, setSkillsSelected]=useState({'1': false, '2':false, '3':false, '4':false, '5':false, '6': false, '7':false, '8':false, '9': false, '10':false});
	const [typeSelected, setTypeSelected]=useState("Games");

	const sportsFunction = (e) => {
		if (e.target.getAttribute('type')=="option")
		{
			let copySports={...sportsSelected};
			let sportChosen=e.target.value;
			copySports[sportChosen]=!(copySports[sportChosen]);
			setSportsSelected(copySports);
		}
		
	};

	const skillsFunction = (e) => {
		if (e.target.getAttribute('type')=="option")
		{
			let copySkillLevels={...skillsSelected};
			let skillLevelChosen=e.target.value;
			copySkillLevels[skillLevelChosen]=!(copySkillLevels[skillLevelChosen]);
			setSkillsSelected(copySkillLevels);
		}
		
	};

	// const updateDicts = (e, dictInQuestion, changeDictFunction) => {
	// 	let copyDict={...dictInQuestion};
	// 	copyDict.(e.target.value)=!(copyDict.(e.target.value));
	// 	changeDictFunction(copyDict);
	// };

	
	

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

						.informationDiv, .searchDiv, .createGame {
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
							<Link href='/chatting/chat' passHref>
								<div className="myChats">
									<a>My Chats</a>
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

					</ul>
				</div>

				<br/>


				<div className="informationDiv">
					<p>
						Welcome to our app! Note that when searching for people exclusive-or games,
						you must choose this with respect to your skill level. A 10 refers to an expert
						within the game, while a 1 refers to a complete beginner. A 5 is around the skill level
						of a club or tournament player who has competed before.
					</p>
				</div>

				<br/>



				<div className="searchDiv">

					<h1> Search Filters </h1>


					<form> {/* onSubmit */}
						<label>
							Sports: {' '}
					          	<select multiple={true} onChange={sportsFunction} value={Object.keys(sportsSelected).find(key => sportsSelected[key]==true)}>
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
							Radius: {' '}
					        <select value={radius} onChange={(e)=>setRadius(e.target.value)}>
								<option value="Within 1 mile">Within 1 mile</option>
								<option value="Within 3 miles">Within 3 miles</option>
								<option value="Within 5 miles">Within 5 miles</option>
								<option value="Within 10 miles">Within 10 miles</option>
								<option value="Within 20 miles">Within 20 miles</option>
								<option value="Within 50 miles">Within 50 miles</option>
								<option value="Within 100 miles">Within 100 miles</option>
							</select>
						</label>

						{'    '}
					


						<label>
							Gender: {' '}
			          		<select value={gender} onChange={(e)=>setGender(e.target.value)}>
								<option value="Men only">Men only</option>
								<option value="Women only">Women Only</option>
								<option value="Both Men and Women">Both Men and Women</option>
							</select>
						</label>

						{'    '}

						<label>
							Skill Level: {' '}
				          		<select multiple onChange={skillsFunction} value={Object.keys(skillsSelected).find(key => sportsSelected[key]==true)}>
									<option value="1"> 1 </option>
									<option value="2"> 2 </option>
									<option value="3"> 3 </option>
									<option value="4"> 4 </option>
									<option value="5"> 5 </option>
									<option value="6"> 6 </option>
									<option value="7"> 7 </option>
									<option value="8"> 8 </option>
									<option value="9"> 9 </option>
									<option value="10"> 10 </option>
								</select>
						</label>

						{'    '}


						<label>
							People or Games: {' '}
			          		<select value={typeSelected} onChange={(e)=>setTypeSelected(e.target.value)}>
								<option value="People"> People </option>
								<option value="Games"> Games </option>
							</select>
						</label>

						{'    '}

						{optionalDateSelection}

						<br/>
						

						{/* <input type="submit" value="Submit" />  */} 

						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
					</form>


				</div>

				<Link href='/homePage/createGame' passHref>
					<div className="createGame">
						<button> <a>Create game now! </a> </button>
					</div>
				</Link>

				<br/>
				<br/>
				<br/>

				

				


				

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

				<br/>
				<br/>

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
							</Box>
						</Col>

						<Col >
							<Box>
								
								<div>  </div>
								<br />
								<br />
								<div className="challengeDiv">
									<b> Challenge? </b>
									<br />

									<label>
							          Description:
							          <input type="text" />
							        </label>
									
									<label>
							          Location:
							          <input type="text" />
							        </label>
									
									<br />

									<label>
							          Number of people allowed (excluding creator):
							          <input type="number" min={1} />
							        </label>
									
									<br />

									<button onClick={(e)=>
									{

										e.target.innerHTML=(e.target.innerHTML=="Challenge this athlete!") ? 
										"Unchallenge this athlete!": "Challenge this athlete!";

									} }> Challenge this athlete! </button>

								</div>
								

							</Box>

						</Col>


						<Col>
							<Box>
								<div className="sportInfo"> 
									<br />
									<div> Skill Level </div>
									<br />
									<div> Times for this sport </div>
									<br />
								</div>

								<br/>

								<div className="sportInfo">
									<br />
									<div> Skill Level </div>
									<br />
									<div> Times for this sport </div>
									<br />
								</div>
								
								

							</Box>

						</Col>

					</Row>


				</Container>

			</div >
	);
};


export default HomePage;
const Box = props => <div className="box">{props.children} </div>;


// class homePage extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			username: '',
// 			password: '',
// 			gameChosen: true,
// 			name: ''


// 		};
// 	}



// 	render() {


// 		let optionalDateSelection = this.state.gameChosen ? (

// 			<label>
// 				Game time?:
// 				<select>
// 					<option value="Within 1 day">Within 1 day</option>
// 					<option value="Within 1 week">Within 1 week</option>
// 					<option value="Within 2 weeks">Within 2 weeks</option>
// 					<option value="Within 1 month">Within 1 month</option>
// 					<option value="Within 3 months">Within 3 months</option>
// 					<option value="Within 6 months">Within 6 months</option>
// 					<option value="Within 1 year">Within 1 year</option>
// 				</select>
// 			</label>


// 		) : '';


// 		return (
// 			< div >
// 				<div className="navBar">
// 					<ul>
// 						<li><a href="default.asp">My Chats</a></li>
// 						<li><a href="news.asp">My Games</a></li>
// 						<li><a href="contact.asp">View/Edit My Profile</a></li>
// 					</ul>
// 				</div>

// 				<div className="informationDiv">
// 					<p>
// 						Welcome to our app! Note that when searching for people exclusive-or games,
// 						you must choose this with respect to your skill level. A 10 refers to an expert
// 						within the game, while a 1 refers to a complete beginner. A 5 is around the skill level
// 						of a club or tournament player who has competed before.

// 				</p>

// 				</div>

// 				<div className="searchDiv">

// 					<h1> Search Filters </h1>


// 					<form onSubmit>
// 						<label>
// 							Sports:
// 			          <select multiple={true}>
// 								<option value="Basketball">Basketball</option>
// 								<option value="Tennis">Tennis</option>
// 								<option value="Soccer">Soccer</option>
// 								<option value="Badminton">Badminton</option>
// 								<option value="Baseball">Baseball</option>
// 								<option value="Sprinting">Sprinting</option>
// 								<option value="Volleyball">Volleyball</option>
// 								<option value="American Football">American Football</option>
// 							</select>
// 						</label>

// 						<label>
// 							Radius:
// 			          <select multiple={true}>
// 								<option value="Within 1 mile">Within 1 mile</option>
// 								<option value="Within 3 miles">Within 3 miles</option>
// 								<option value="Within 5 miles">Within 5 miles</option>
// 								<option value="Within 10 miles">Within 10 miles</option>
// 								<option value="Within 20 miles">Within 20 miles</option>
// 								<option value="Within 50 miles">Within 50 miles</option>
// 								<option value="Within 100 miles">Within 100 miles</option>
// 							</select>
// 						</label>
					


// 						<label>
// 							Gender
// 			          		<select>
// 								<option value="Men only">Men only</option>
// 								<option value="Women only">Women Only</option>
// 								<option value="Both Men and Women">Both Men and Women</option>
// 							</select>
// 						</label>

// 						<label>
// 							Skill Level
// 			          <select multiple={true}>
// 								<option value="1"> 1 </option>
// 								<option value="2"> 2 </option>
// 								<option value="3"> 3 </option>
// 								<option value="4"> 4 </option>
// 								<option value="5"> 5 </option>
// 								<option value="6"> 6 </option>
// 								<option value="7"> 7 </option>
// 								<option value="8"> 8 </option>
// 								<option value="9"> 9 </option>
// 								<option value="10"> 10 </option>
// 							</select>
// 						</label>


// 						<label>
// 							People or Games
// 			          <select value="Games">
// 								<option value="People"> People </option>
// 								<option value="Games"> Games </option>
// 							</select>
// 						</label>


// 						{optionalDateSelection}


// 						<input type="submit" value="Submit" />
// 					</form>


// 				</div>

// 				<div className="createGame">
// 					<button> Create game now! </button>

// 				</div>
// 			</div >


// 		);
// 	}
// }

// export default homePage;