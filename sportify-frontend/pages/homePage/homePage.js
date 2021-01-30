import React, { Component } from 'react'
//import 'homePage.mystyle.css'




class homePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			gameChosen: true,
			name: ''


		};
	}



	render() {


		let optionalDateSelection = this.state.gameChosen ? (

			<label>
				Game time?:
				<select multiple={true}>
					<option value="Within 1 day">Within 1 day</option>
					<option value="Within 1 week">Within 1 week</option>
					<option value="Within 2 weeks">Within 2 weeks</option>
					<option value="Within 1 month">Within 1 month</option>
					<option value="Within 3 months">Within 3 months</option>
					<option value="Within 6 months">Within 6 months</option>
					<option value="Within 1 year">Within 1 year</option>
				</select>
			</label>


		) : ''


			;


		return (
			< div >
				<div className="navBar">
					<ul>
						<li><a href="default.asp">My Chats</a></li>
						<li><a href="news.asp">My Games</a></li>
						<li><a href="contact.asp">View/Edit My Profile</a></li>
					</ul>
				</div>

				<div className="informationDiv">
					<p>
						Welcome to our app! Note that when searching for people exclusive-or games,
						you must choose this with respect to your skill level. A 10 refers to an expert
						within the game, while a 1 refers to a complete beginner. A 5 is around the skill level
						of a club or tournament player who has competed before.

				</p>

				</div>

				<div className="searchDiv">

					<h1> Search Filters </h1>


					<form onSubmit>
						<label>
							Sports:
			          <select multiple={true}>
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

						<label>
							Radius:
			          <select multiple={true}>
								<option value="Within 1 mile">Within 1 mile</option>
								<option value="Within 3 miles">Within 3 miles</option>
								<option value="Within 5 miles">Within 5 miles</option>
								<option value="Within 10 miles">Within 10 miles</option>
								<option value="Within 20 miles">Within 20 miles</option>
								<option value="Within 50 miles">Within 50 miles</option>
								<option value="Within 100 miles">Within 100 miles</option>
							</select>
						</label>


						<label>
							Radius:
			          <select multiple={true}>
								<option value="Within 1 mile">Within 1 mile</option>
								<option value="Within 3 miles">Within 3 miles</option>
								<option value="Within 5 miles">Within 5 miles</option>
								<option value="Within 10 miles">Within 10 miles</option>
								<option value="Within 20 miles">Within 20 miles</option>
								<option value="Within 50 miles">Within 50 miles</option>
								<option value="Within 100 miles">Within 100 miles</option>
							</select>
						</label>


						<label>
							Gender
			          <select multiple={true}>
								<option value="Men only">Men only</option>
								<option value="Women only">Women Only</option>
								<option value="Both Men and Women">Both Men and Women</option>
							</select>
						</label>

						<label>
							Skill Level
			          <select multiple={true}>
								<option value="1"> 1 </option>
								<option value="2"> 2 </option>
								<option value="3"> 3 </option>
								<option value="4"> 4 </option>
								<option value="5"> 5 </option>
								<option value="6"> 6 </option>
								<option value="7"> 7 </option>
								<option value="8"> 8 </option>
								<option value="9"> 9 </option>
								<option value="10"> 10 </option>
							</select>
						</label>


						<label>
							People or Games
			          <select value="Games">
								<option value="People"> People </option>
								<option value="Games"> Games </option>
							</select>
						</label>


						{optionalDateSelection}


						<input type="submit" value="Submit" />
					</form>


				</div>

				<div className="createGame">
					<button> Create game now! </button>

				</div>
			</div >


		);
	}
}

export default homePage