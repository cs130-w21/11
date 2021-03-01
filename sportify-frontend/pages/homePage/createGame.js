import React, {component, useState, useEffect} from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Geocode from 'react-geocode'


//API key: AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE

const CreateGame = (props) => {

	useEffect(()=>{
        Geocode.setApiKey("AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE");
        Geocode.setLanguage("en");

    }, []);

	//const geoCoder=Maps.newGeocoder();

	const [sport, setSport]=useState('');
	//const [name, setName]=useState('');
	const [description, setDescription]=useState('');
	const [numberOfPeopleIncludingYou, setNumberOfPeopleIncludingYou]=useState(1);
	const [minSkillLevel, setMinSkillLevel]=useState(1);
	// const [maxSkillLevel, setMaxSkillLevel]=useState(10);
	const [startTime, setStartTime]=useState(new Date());

	// let [latitude, setLatitude] = React.useState(0.1)
 	//    let [longitude, setLongitude] = React.useState(0.1)
    let [address, setAddress] = React.useState('')
	// const [endTime, setEndTime]=useState(new Date());
	// const [gendersAllowed, setGendersAllowed]=useState("Both Men And Women");

	const handleSubmit = (e)=>
	{

	};

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
				
				<form onSubmit={(e)=>handleSubmit(e)}>
					<label>
			          Enter Sport:
			          <input type="text" value={sport} onChange={(e)=>setSport(e.target.value)} />
			        </label>
			        <br />

			        { /*
			        <label>
			          Enter event name:
			          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
			        </label>
			        <br />

			    	*/ }

			    	<label>
			          Enter address/location:
			          <input type="textArea" value={address} 
			          onChange={ (e)=>setAddress(e.target.value) } />
			        </label>
			        <br />


			        <label>
			          Enter description:
			          <input type="textArea" value={description} onChange={ (e)=>setDescription(e.target.value) } />
			        </label>
			        <br />

					<label>
			          Min Skill Level:
			          <input type="number" value={minSkillLevel} min={1}
			          onChange={(e)=>setMinSkillLevel(e.target.value)} />
			        </label>
			        <br />

			        <label>
			          Number of people in the game including you (creator):
			          <input type="number" value={numberOfPeopleIncludingYou} min={2}
			          onChange={(e)=>setNumberOfPeopleIncludingYou(e.target.value)} />
			        </label>
			        <br />

			        { /*
			        <label>
			          Max Skill Level:
			          <input type="number" value={maxSkillLevel} min={minSkillLevel} max={10}
			          onChange={(e)=>setMaxSkillLevel(e.target.value)} />
			        </label>
			        <br />

			    	*/ }

			          
			        <label>
			          	Starting time:
			          	<input type="datetime-local"  value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>
			        </label>
			        <br />


			        {/*   
			        <label>
			          	Ending time:
			          	<input type="datetime-local"  value={endTime} onChange={(e)=>setEndTime(e.target.value)}/>
			        </label>
			        <br />
			        */}

			        {/*   
			        <label>
						Gender
				        <select value={gendersAllowed} onChange={(e)=>setGendersAllowed(e.target.value)}>
							<option value="Men only">Men only</option>
							<option value="Women only">Women Only</option>
							<option value="Both Men and Women">Both Men and Women</option>
						</select>
					</label>
					<br />
					*/}


			        { /* 
					
			        <button onClick={
			        	(e) => {
			        		
			        	}

			        }>
			        	Submit
			        </button>

			        */}
			        

			        <Link href='/homePage/homePage' passHref>
							<button> <a>Cancel creation of game! </a> </button>
					</Link>


			        <Link href='/homePage/homePage' passHref>
							<button onClick={(e)=>{

								// Get latitude & longitude from address.
								Geocode.fromAddress(address).then(
								  (response) => {
								    const { lat, lng } = response.results[0].geometry.location;
								    console.log(lat, lng);

								  },
								  (error) => {
								    console.error(error);
								  }
								);

							}}> <a>Submit creation of game! </a> </button>
					</Link>
		      	</form>
	      	
	      	</div>


		);

};

export default CreateGame;

