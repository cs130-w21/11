import React, {component, useState} from 'react'
import Head from 'next/head';
import Link from 'next/link';

const CreateGame = (props) => {
	const [sport, setSport]=useState('');
	const [name, setName]=useState('');
	const [description, setDescription]=useState('');
	const [age, setAge]=useState(1);
	const [minSkillLevel, setMinSkillLevel]=useState(1);
	const [maxSkillLevel, setMaxSkillLevel]=useState(10);
	const [startTime, setStartTime]=useState(new Date());
	const [endTime, setEndTime]=useState(new Date());
	const [gendersAllowed, setGendersAllowed]=useState("Both Men And Women");

	return 
		(
			<form onSubmit={this.handleSubmit}>
				<label>
		          Enter Sport:
		          <input type="text" value={sport} onChange={(e)=>setSport(e.target.value);} />
		        </label>
		        <br />

		        <label>
		          Enter event name:
		          <input type="text" value={name} onChange={(e)=>setName(e.target.value);} />
		        </label>
		        <br />


		        <label>
		          Enter description:
		          <input type="textArea" value={description} onChange={ (e)=>setDescription(e.target.value); } />
		        </label>
		        <br />

				<label>
		          Min Skill Level:
		          <input type="number" value={minSkillLevel} min="1" max="10" 
		          onChange={(e)=>setMinSkillLevel(e.target.value);} />
		        </label>
		        <br />

		        <label>
		          Max Skill Level:
		          <input type="number" value={maxSkillLevel} min="1" max="10" 
		          onChange={(e)=>setMaxSkillLevel(e.target.value);} />
		        </label>
		        <br />



		          <label>
		          	Starting time:
		          	<input type="datetime-local"  value={startTime} onChange={(e)=>setStartTime(e.target.value);}/>
		          </label>
		          <br />



		        <label>
		          	Ending time:
		          	<input type="datetime-local"  value={endTime} onChange={(e)=>setEndTime(e.target.value);}/>
		        </label>
		        <br />

		            
		        <label>
					Gender
			        <select value={gendersAllowed} onChange={(e)=>setGendersAllowed(e.target.value)};
						<option value="Men only">Men only</option>
						<option value="Women only">Women Only</option>
						<option value="Both Men and Women">Both Men and Women</option>
					</select>
				</label>
				<br />



		        

		        // <button onClick={submitSportInfo}>
		        // 	Submit
		        // </button>

		        <button onClick={cancelSportInfo}>
		        	Cancel
		        </button>


		        <input type="submit" value="Submit" />
	      	</form>


		);

};

export default CreateGame;

// export default class CreateGame extends Component()
// {
	
// 	render()
// 	{
// 		return 
// 		(
// 			<form onSubmit={this.handleSubmit}>
// 				<label>
// 		          Enter Sport:
// 		          <input type="text" value={this.state.sport} onChange={this.handleSport} />
// 		        </label>
// 		        <br />

// 		        <label>
// 		          Enter description:
// 		          <input type="textArea" value={this.state.sport} onChange={this.handleSport} />
// 		        </label>
// 		        <br />

// 				<label>
// 		          Min Skill Level:
// 		          <input type="number" value={this.state.number} min="1" max="10" onChange={this.handlePassword} />
// 		        </label>
// 		        <br />

// 		        <label>
// 		          Max Skill Level:
// 		          <input type="number" value={this.state.number} min="1" max="10" onChange={this.handlePassword} />
// 		        </label>
// 		        <br />



// 		          <label>
// 		          	Starting time:
// 		          	<input type="datetime-local" name="birthdaytime" />

// 		          </label>
// 		          <br />



// 		          <label>
// 		          	Ending time:
// 		          	<input type="datetime-local" name="birthdaytime" />

// 		          </label>
// 		          <br />


		        

// 		        // <button onClick={submitSportInfo}>
// 		        // 	Submit
// 		        // </button>

// 		        <button onClick={cancelSportInfo}>
// 		        	Cancel
// 		        </button>


// 		        <input type="submit" value="Submit" />
// 	      	</form>


// 		);
// 	}
// }