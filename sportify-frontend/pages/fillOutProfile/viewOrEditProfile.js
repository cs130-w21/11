
import React, {useState, useEffect} from "react";
import Head from 'next/head';
import Link from 'next/link';
import Geocode from 'react-geocode'

//API key: AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE




const ViewOrEditProfile = (props) => {
	const [name, setName]=useState('');
	const [description, setDescription]=useState('');
	const [age, setAge]=useState(0);

	let [latitude, setLatitude] = React.useState(0.1)
    let [longitude, setLongitude] = React.useState(0.1)
    let [address, setAddress] = React.useState('')
	//const [phoneNumber, setPhoneNumber]=useState("(000) 000-0000");
	//const [email, setEmail]=useState("blah@blah.com");
	const [gender, setGender]=useState("Man");
	// const [currentSetOfSports, setCurrentSetOfSports]=useState(new Object());

	const [currentSport, setSport]=useState('Basketball');
	const [bestSportSkillLevel, setBestSportSkillLevel]=useState(1);
 
	useEffect(()=>{
        Geocode.setApiKey("AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE");
        Geocode.setLanguage("en");

    }, []);
 	


 	
	

		return (
			<div>
				<style jsx global>{`
					body {
						background-color: cyan;
						align: auto;
						text-align: center;
					}
					
				`}</style>

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
			          <input type="textArea" value={description} onChange={(e)=>setDescription(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />






			        <label>
			          Age: {' '}
			          <input type="number" min={1} value={age} onChange={(e)=>setAge(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />



			        <label>
			          Address: {' '}
			          <input type="text"  value={address} onChange={(e)=>setAddress(e.target.value)} />
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
				          <select value={gender} onChange={(e)=>setGender(e.target.value)} >
									<option value="Man">Man</option>
									<option value="Woman">Woman</option>
									<option value="Other">Other </option>
						   </select>
					</label>
					
					<br />
					<br />


			        <label>
						Best Sport: {' '}
				          	< select value = {currentSport} onChange={(e)=>setSport(e.target.value)} >
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
					<br/>
					<br />

					<label>
			          Skill Level in Best Sport: {' '}
			          <input type="number" min={1} max={10} value={bestSportSkillLevel} onChange={(e)=>setBestSportSkillLevel} />
			        </label>
			        
			        <br />
			        <br />

					{ /* 

					<div>
						Sports Info!
					</div>

					*/ }
					
					<br />
					<br />


					<Link href="/homePage/homePage">
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

export default ViewOrEditProfile;