import React, {component} from 'react'


class CreateGame extends Component()
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
		          Password:
		          <input type="number" value={this.state.number} onChange={this.handlePassword} />
		        </label>
		        <br />

		        <label>
		          Email address:
		          <input type="email" value={this.state.email} onChange={this.handleEmail} />
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