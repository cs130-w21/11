import React, {component} from 'react'


class AddSport extends Component()
{
	constructor (props)
	{
		super(props);
		this.state = {
			username, ''
			password, '',

			name: '',


		}
	}



	render()
	{
		return 
		{
			<form onSubmit={this.handleSubmit}>
				<label>
		          Enter Sport
		          <input type="text" value={this.state.sport} onChange={this.handleSport} />
		        </label>
		        <br />

				<label>
		          Skill Level
		          <input type="number" value={this.state.skillLevel} onChange={this.handleSkillLevel} />
		        </label>
		        <br />


		          <label>
		          	Starting time:
		          	<input type="datetime-local" name="birthdaytime" />

		          </label>
		          <br />



		          <label>
		          	Ending time:
		          	<input type="datetime-local" name="birthdaytime" />

		          </label>
		          <br />


		        

		        <button onClick={submitSportInfo}>
		        	Submit
		        </button>

		        <button onClick={cancelSportInfo}>
		        	Cancel
		        </button>


		        <input type="submit" value="Submit" />
	      	</form>


		}
	}
}