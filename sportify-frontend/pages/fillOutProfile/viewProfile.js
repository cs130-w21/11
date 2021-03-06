
import React, { useState, useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Geocode from 'react-geocode'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//API key: AIzaSyDqs8TqTIsIx3xTuD1NEY3hXxmSciVrWZE




class viewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            gender: '',
            age: '',
            sport: '',
            aboutme: '',
            schedule: '',
            skill_level: ''
        }
    };
    componentDidMount() {
        this.getProfile()
    }
    getProfile() {

    }
    render() {
        return (
            <div>
                <style jsx global>{`
					body {
						background-color: cyan;
						align: auto;
						text-align: center;
					}

					 ul {
						  list-style-type: none;
						  margin: 0;
						  padding: 0;
						  overflow: hidden;
						  background-color: #333;
						}

						li {
						  float: left;
						}

						li a {
						  display: block;
						  color: white;
						  text-align: center;
						  padding: 14px 16px;
						  text-decoration: none;
						}

						/* Change the link color to #111 (black) on hover */
						li a:hover {
						  background-color: #111;
						}
					
				`}</style>

                <h1> Here's your profile </h1>

                <div>

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
                        <h3>{this.state.aboutme}</h3>
                    </label>

                    <br />
                    <br />





                    <label>
                        Age:
                        <h1>{this.state.age}</h1>
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
                        Gender:
                        <h3>{this.state.gender}</h3>
                    </label>

                    <br />
                    <br />


                    <label>
                        Best Sport: {' '}
                        <h3>{this.state.sport}</h3>
                    </label>
                    <br />
                    <br />

                    <label>
                        Skill Level in Best Sport:
                        <h3>{this.state.skill_level}</h3>
                    </label>

                    <br />
                    <br />

                    <b>
                        Times available!
			        </b>


                    <br />




                    <Link href="/fillOutProfile/editProfile">
                        <button>Edit Profile</button>
                    </Link>






                </div>
            </div>

        );





    }
}

export default viewProfile;