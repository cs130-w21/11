import React, {component, useState} from 'react'

// Useful links: https://react-bootstrap.github.io/getting-started/introduction/
// https://stackoverflow.com/questions/44712076/how-do-i-create-a-popup-window-in-react-js-when-the-button-and-function-are-in-s
// https://reactjs.org/docs/forms.html
// potentual React.js calendar with events: https://gkmit.co/blog/web-app-development/how-to-make-reactjs-calendar-with-events

export default class ProfileForm extends Component()
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
		const cancelButton= (
				<Link href="/homePage/homePage.js">
					<button>Cancel </button>
				</Link>
			);

		return 
		(

			<form onSubmit={this.handleSubmit}>
				
		        <label>
		          Name:
		          <input type="text" value={this.state.name} onChange={this.handleName} />
		        </label>
		        <br />


		        <label>
		          Description:
		          <input type="textArea" value={this.state.description} onChange={this.handleDescription} />
		        </label>
		        <br />


		        <label>
		          Age:
		          <input type="number" value={this.state.age} onChange={this.handleAge} />
		        </label>
		        <br />



		        <label>
		          Address:
		          <input type="text"  value={this.state.address} onChange={this.handleAddress} />
		        </label>
		        <br />
		        

		        <label>
		          Phone Number:
		          <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={this.state.phoneNumber} onChange={this.handlePhoneNumber} />
		        </label>
		        <br />

		        <label>
		          Email:
		          <input type="email" value={this.state.email} onChange={this.handleEmail} />
		        </label>
		        <br />

		        <label>
					Gender:
			          <select value={this.state.gender} onChange={this.handleGender}>
								<option value="Man">Man</option>
								<option value="Woman">Woman</option>
					   </select>
				</label>
				<br />



				<Link href="/fillOutProfile/addSport" passHref cameFrom="firstTimeProfile">
				</Link>




		        <input type="submit" value="Submit" />

		        {cancelButton}

	      	</form>


		)
	}
}