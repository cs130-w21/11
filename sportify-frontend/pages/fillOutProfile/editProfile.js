
import React, { useState, useEffect, Router } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Geocode from 'react-geocode'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

//API key: AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE




const editProfile = (props) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [age, setAge] = useState(0);
	const [password, setPassword] = useState('');

	let [latitude, setLatitude] = React.useState(0.1)
	let [longitude, setLongitude] = React.useState(0.1)
	let [address, setAddress] = React.useState('')
	//const [phoneNumber, setPhoneNumber]=useState("(000) 000-0000");
	//const [email, setEmail]=useState("blah@blah.com");
	const [gender, setGender] = useState("M");
	// const [currentSetOfSports, setCurrentSetOfSports]=useState(new Object());
	const [foundUser, setUser] = useState("")
	const [foundUserName, setUsername2] = useState("")
	const [currentSport, setSport] = useState('1');
	const [bestSportSkillLevel, setBestSportSkillLevel] = useState(1);

	const [dayTimes, setDayTimes] = useState(["", "", "", "", "", "", ""]);

	const handleScheduleEvent = (e) => {
		console.log(e.target.getAttribute('type'));
		if (e.target.getAttribute('type') == 'text') {
			console.log(e.target);
			let copyTimes = [...dayTimes];
			let newTimeString = e.target.value;

			let dayIndex = e.target.className;
			let tempClassNames = dayIndex.split(" ");
			console.log(newTimeString, dayIndex);
			copyTimes[(tempClassNames[1] - '0')] = newTimeString;
			setDayTimes(copyTimes);
			console.log(dayTimes);
		}
	}

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






	return (
		<div>
			<style jsx global>{`
					body {
						background-color: #D2D2D2;
						align: auto;
						text-align: center;
					}

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
					
				`}</style>

			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/homePage/homePage">Sportify</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/fillOutProfile/viewProfile" active="true">Profile</Nav.Link>
					<Nav.Link href="/userGames/userGames">My Games</Nav.Link>
				</Nav>
				<Nav inline="true">
					<Nav.Link href="/frontpage/Login">Logout</Nav.Link>
				</Nav>
			</Navbar>
			<h1> Fill out profile! </h1>

			<form>

				{ /*  
			        <label>
			          Name: {' '}
			          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
			        </label>

			    	*/  }



				<br />
				<br />


				<label>
					Biography: {' '}
					<input type="textArea" value={description} onChange={(e) => setDescription(e.target.value)} />
				</label>

				<br />
				<br />


				<label>
					Password: {' '}
					<input type="textArea" value={password} onChange={(e) => setPassword(e.target.value)} />
				</label>

				<br />
				<br />




				<label>
					Age: {' '}
					<input type="number" min={1} value={age} onChange={(e) => setAge(e.target.value)} />
				</label>

				<br />
				<br />



				<label>
					Address: {' '}
					<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
				</label>

				<br />
				<br />

				{ /*
			        <label>
			          Phone Number: {' '}
			          <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />

			    	*/ }

				{ /*
			        <label>
			          Email: {' '}
			          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />

			    	*/ }


				<label>
					Gender: {' '}
					<select value={gender} onChange={(e) => setGender(e.target.value)} >
						<option value="M">Man</option>
						<option value="F">Woman</option>
						<option value="O">Other </option>
					</select>
				</label>

				<br />
				<br />


				<label>
					Best Sport: {' '}
					< select value={currentSport} onChange={(e) => setSport(e.target.value)} >
						<option value="1">Basketball</option>
						<option value="2">Tennis</option>
						<option value="3">Soccer</option>
						<option value="4">Badminton</option>
						<option value="5">Baseball</option>
						<option value="6">Sprinting</option>
						<option value="7">Volleyball</option>
						<option value="8">American Football</option>
					</select>
				</label>
				<br />
				<br />

				<label>
					Skill Level in Best Sport: {' '}
					<input type="number" min={1} max={10} value={bestSportSkillLevel} onChange={(e) => setBestSportSkillLevel} />
				</label>

				<br />
				<br />

				<b>
					Times available!
			        </b>

				<br />
				<br />

				<label>
					Monday Times available: {' '}
					<input type="text" className='0' value={dayTimes[0]} onChange={handleScheduleEvent} />
				</label>

				<br />

				<label>
					Tuesday Times available: {' '}
					<input type="text" className='1' value={dayTimes[1]} onChange={handleScheduleEvent} />
				</label>

				<br />

				<label>
					Wednesday Times available: {' '}
					<input type="text" className='2' value={dayTimes[2]} onChange={handleScheduleEvent} />
				</label>

				<br />

				<label >
					Thursday Times available: {' '}
					<input type="text" className='3' value={dayTimes[3]} onChange={handleScheduleEvent} />
				</label>

				<br />

				<label >
					Friday Times available: {' '}
					<input type="text" className='4' value={dayTimes[4]} onChange={handleScheduleEvent} />
				</label>

				<br />

				<label >
					Saturday Times available: {' '}
					<input type="text" className='5' value={dayTimes[5]} onChange={handleScheduleEvent} />
				</label>

				<br />

				<label >
					Sunday times available: {' '}
					<input type="text" className='6' value={dayTimes[6]} onChange={handleScheduleEvent} />
				</label>

				<br />

				{ /* 

					<div>
						Sports Info!
					</div>

					*/ }

				<br />
				<br />


				<Link href="/homePage/homePage">
					<button onClick={(e) => {

						// Get latitude & longitude from address.
						Geocode.fromAddress(address).then(
							(response) => {
								const { lat, lng } = response.results[0].geometry.location;
								console.log(lat, lng);


								const reactData = { "latitude": lat, "longitude": lng, "skill_level": bestSportSkillLevel, "gender": gender, "about_me": description, "sport": currentSport, "username": foundUserName, "password": password }
								const reactData2 = { "id": String(foundUser), "monday": dayTimes[0], "tuesday": dayTimes[1], "wednesday": dayTimes[2], "thursday": dayTimes[3], "friday": dayTimes[4], "saturday": dayTimes[5], "sunday": dayTimes[6] }

								console.log("The body is")
								console.log(JSON.stringify(reactData2))

								fetch(process.env.backend_url + '/user/updateProfile/' + parseInt(foundUser) + '/', {
									//mode: "no-cors",
									method: "PUT",
									headers: {
										'Content-type': 'application/json',
										"Access-Control-Allow-Origin": '*'
									},
									body: JSON.stringify(reactData)
								})
									.then(response => {

										if (response.status === 200) {
											console.log("Result Here Lol")
											console.log("here" + response.json)


											//Router.push("../homePage/homePage")
										}
										else {
											console.log("here" + response.json)

										}



									})
									.then(

										fetch(process.env.backend_url + '/schedule/createUpdateSchedule', {

											//mode: "no-cors",
											method: "POST",
											headers: {
												'Content-type': 'application/json',
												"Access-Control-Allow-Origin": '*'
											},
											body: JSON.stringify(reactData2)
										})
											.then(response => {

												if (response.status === 200) {
													console.log("Result Here Schedule")
													console.log("here" + response.json)


													//Router.push("../homePage/homePage")
												}
												else {
													console.log("here" + response.json)

												}



											})


									)




							},
							(error) => {
								console.error(error);
							}
						);

					}}> Submit </button>
				</Link>

				{ /* 

					<input type="submit" value="Submit"/>
			        <br />
			        <br />

			        */}


				<Link href="/homePage/homePage">
					<button > Cancel </button>
				</Link>
				<br />

				{/* 
					<Link href="/addSport" passHref>
						<button>Add sport! </button>
					</Link>
					<br />
					<br />
					*/ }

			</form>
		</div>

	);

};

export default editProfile;