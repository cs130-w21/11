
import React, {useState} from "react";
import Head from 'next/head';
import Link from 'next/link';



const ViewOrEditProfile = (props) => {
	const [name, setName]=useState('');
	const [description, setDescription]=useState('');
	const [age, setAge]=useState(0);
	const [address, setAddress]=useState('');
	const [phoneNumber, setPhoneNumber]=useState("(000) 000-0000");
	const [email, setEmail]=useState("blah@blah.com");
	const [gender, setGender]=useState("Man");
	const [currentSetOfSports, setCurrentSetOfSports]=useState(new Object());
 

 	


 	
	

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
					
			        <label>
			          Name:
			          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
			        </label>

			        <br />
			        <br />


			        <label>
			          Description:
			          <input type="textArea" value={description} onChange={(e)=>setDescription(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />


			        <label>
			          Age:
			          <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />



			        <label>
			          Address:
			          <input type="text"  value={address} onChange={(e)=>setAddress(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />
			        

			        <label>
			          Phone Number:
			          <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />

			        <label>
			          Email:
			          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
			        </label>
			        
			        <br />
			        <br />

			        
			        <label>
						Gender:
				          <select value={gender} onChange={(e)=>setGender(e.target.value)} >
									<option value="Man">Man</option>
									<option value="Woman">Woman</option>
						   </select>
					</label>
					
					<br />
					<br />

					<div>
						Sports Info!
					</div>
					
					<br />
					<br />

					<input type="submit" value="Submit" />
			        <br />
			        <br />


					<Link href="/homePage/homePage.js">
						<button > Cancel </button>
					</Link>
					<br />


					<Link href="/addSport" passHref>
						<button>Add sport! </button>
					</Link>
					<br />
					<br />

		      	</form>
		    </div>
	      	
	    );
 
};

export default ViewOrEditProfile;