import React, {component} from 'react'

// Useful links: https://react-bootstrap.github.io/getting-started/introduction/
// https://stackoverflow.com/questions/44712076/how-do-i-create-a-popup-window-in-react-js-when-the-button-and-function-are-in-s
// https://reactjs.org/docs/forms.html
// potentual React.js calendar with events: https://gkmit.co/blog/web-app-development/how-to-make-reactjs-calendar-with-events

class ProfileForm extends Component()
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
		          Email address:
		          <input type="email" value={this.state.email} onChange={this.handleEmail} />
		        </label>
		        <br />

		        <label>
		          Phone Number:
		          <input type="text" value={this.state.phoneNumber} onChange={this.handlePhoneNumber} />
		        </label>
		        <br />

		        <label>
		          Name:
		          <input type="text" value={this.state.name} onChange={this.handleName} />
		        </label>
		        <br />

		        <label>
		          Pick genders that can play:
		          <select value={this.state.gender} onChange={this.handleGender}>
		            <option value="Men only">Men only</option>
		            <option value="Women only">Women only</option>
		            <option value="Coed">Coed</option>
		          </select>
        		</label>
        		< br />



		        <input type="submit" value="Submit" />
	      	</form>


		}
	}
}