import React, {component, useState} from 'react'
import Head from 'next/head';
import Link from 'next/link';

const AddSport = (props) => {
	const [sport, setSport]=useState('');
	const [skillLevel, setSkillLevel]=useState(1);
	const [startTime, setStartTime]=useState(new Date());
	const [endTime, setEndTime]=useState(new Date());

	const submitSportInfo = (e) => {};
	const cancelSportInfo = (e) => {};

	return (
			<div>
				<style jsx global>{`
						body {
							background-color: orange;
							align: auto;
							text-align: center;
						}
						
					`}</style>

				<h1> Add a sport to your profile </h1>

				<form>

					<label>
			          Enter Sport
			          <input type="text" value={sport} onChange={(e)=>setSport(e.target.value)} />
			        </label>
			        <br />

					<label>
			          Skill Level
			          <input type="number" value={skillLevel} min="1" max="10" 
			          onChange={(e)=>setSkillLevel(e.target.value)} />
			        </label>
			        <br />


			        <label>
			          	Starting time:
			          	<input type="datetime-local"  value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>

			        </label>
			        <br />



			        <label>
			          	Ending time:
			            <input type="datetime-local" value={endTime} onChange={(e)=>setEndTime(e.target.value)} />

			        </label>
			        <br />

			      


			        
	 
			        

			        <button onClick={cancelSportInfo}>
			        	Cancel
			        </button>


			        <input type="submit" value="Submit" onClick={submitSportInfo} />
		      	</form>
		    </div>


		);
	
};

export default AddSport;



///////// export default class AddSport extends Component()
// {
// 	constructor (props)
// 	{
// 		super(props);
// 		this.state = {
// 			username, ''
// 			password, '',

// 			name: '',


// 		}
// 	}



// 	render()
// 	{
// 		return 
// 		(
// 			<form onSubmit={this.handleSubmit}>
// 				<label>
// 		          Enter Sport
// 		          <input type="text" value={this.state.sport} onChange={this.handleSport} />
// 		        </label>
// 		        <br />

// 				<label>
// 		          Skill Level
// 		          <input type="number" value={this.state.skillLevel} onChange={this.handleSkillLevel} />
// 		        </label>
// 		        <br />


// 		          <label>
// 		          	Starting time:
// 		          	<input type="datetime-local"  />

// 		          </label>
// 		          <br />



// 		          <label>
// 		          	Ending time:
// 		          	<input type="datetime-local"  />

// 		          </label>
// 		          <br />


		        

// 		        <button onClick={submitSportInfo}>
// 		        	Submit
// 		        </button>

// 		        <button onClick={cancelSportInfo}>
// 		        	Cancel
// 		        </button>


// 		        <input type="submit" value="Submit" />
// 	      	</form>


// 		);
// 	}
// }