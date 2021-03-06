import React, {component, useState, useEffect} from 'react'
import Router from "next/router"

import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Geocode from 'react-geocode'

const sportToNumber={'Basketball': 1, 'Tennis': 2, 'Soccer': 3, 'Badminton': 4, 
'Baseball': 5, 'Sprinting': 6, 'Volleyball': 7, 'American Football': 8 };
//API key: AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE

const CreateOneOnOne = (props) => {

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

		const localOpponentSport=localStorage.getItem("localOpponentSport")
		if (localOpponentSport) {
			const copyLocalOpponentSport=localOpponentSport;
			setOpponentSport(copyLocalOpponentSport);
		}

		const localOpponentName = localStorage.getItem("localOpponentName");
		if (localOpponentName) {
			const copyLocalOpponentName = (localOpponentName);
			setOpponentName(copyLocalOpponentName);

		}

		const localOpponentId=localStorage.getItem("localOpponentId")
		if (localOpponentId) {
			const copyLocalOpponentId= (localOpponentId);
			setOpponentId(copyLocalOpponentId);
		}

    }, []);

	//const geoCoder=Maps.newGeocoder();

	const [foundUser, setUser] = useState("");
	const [foundUserName, setUsername2] = useState("");
	const [opponentName, setOpponentName]=useState("")
	const [opponentSport, setOpponentSport]=useState('');
	const [opponentSkillLevel, setOpponentSkillLevel]=useState('')
	const [opponentId, setOpponentId]=useState('')

	
	
	const [description, setDescription]=useState('');

	//number of people is automatically 2	

	//min skill level is automatically 1 in a 1 on 1 challenge, 

	const [startTime, setStartTime]=useState(new Date());

    let [address, setAddress] = React.useState('')


	

	return (
				<div className="superContainer">

				<style jsx global>{`
					body {
						background-color: pink;
						align: auto;
						text-align: center;
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
				
					
					<h2> Enter the details of one on one game (minimum skill level is automatically 1)! </h2>

			        

			    	<label>
			          Enter address/location: {' '}
			          <input type="textArea" value={address} 
			          onChange={ (e)=>setAddress(e.target.value) } />
			        </label>
			        <br />


			        <label>
			          Enter description: {' '}
			          <input type="textArea" value={description} onChange={ (e)=>setDescription(e.target.value) } />
			        </label>
			        <br />

			          
			        <label>
			          	Starting time: {' '}
			          	<input type="datetime-local"  value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>
			        </label>
			        <br />


			        
			        

			        <Link href='/homePage/homePage' passHref>
							<button> <a>Cancel creation of one on one game! </a> </button>
					</Link>


			        {/* <Link href='/homePage/homePage' passHref> */ }
							<button onClick={(e)=>{

								let long = 118.4452; // UCLA 
								let lat = 34.0689; // UCLA

								// Get latitude & longitude from address.
								Geocode.fromAddress(address).then(
									(response) => {
										lat, long = response.results[0].geometry.location;
										console.log(lat, long);

									},
									(error) => {
										console.error(error);
									}
								)

								const sportNumber=sportToNumber[opponentSport]
								const reactData = { "latitude": lat, "longitude": long, "dateString": startTime, "skill_level": 1, "max_group_size": 2, "comments": description, "sport": sportNumber, "user": foundUser }

								console.log(reactData);
								console.log(foundUser, opponentId)

								fetch('http://localhost:8000/games/createGame', {
									//mode: "no-cors",
									method: "POST",
									headers: {
										'Content-type': 'application/json',
										"Access-Control-Allow-Origin": '*'
									},
									body: JSON.stringify(reactData)
								})
									.then(response => response.json())
									.then(json => {
										console.log("Here checking")
										console.log(json)
										let gameId=json.usr_gm.gameId;
										
									    
									    console.log(gameId, opponentId)
									    return gameId;

									})
									.then((gameId)=>
									{
										console.log(gameId, opponentId);
										const requestOptions = {
									        method: 'PUT',
									        headers: { 'Content-Type': 'application/json',  "Access-Control-Allow-Origin": '*' },
									        body: JSON.stringify({ user_id: parseInt(opponentId), game_id: gameId})
									    };
									    console.log(requestOptions);
										fetch('http://localhost:8000/games/joinGame/', requestOptions)
									        .then(response => response.json())
									        .then(data => {
									        	console.log(data);


									        })
									    
									})
									.catch ( error => {console.log(error)})

							

							}}> <a>Submit creation of one on one game! </a> </button>
					{/* </Link> */ }
		      	
	      	
	      	</div>


		);

};

export default CreateOneOnOne;

