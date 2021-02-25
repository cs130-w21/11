const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { response } = require('express');
const expect = chai.expect;
const server = require('../index');
const sequelize = require('../utils/sequelize/index');
const Game = sequelize.models.game;

// Test games routes
describe("Test endpoints", () => {
    before((done) => {
        sequelize.sync({ force: true }).then(function() {
            done();
        });
    });

    after((done) => {
        sequelize.sync({ force: true }).then(function() {
            done();
        });
    });

    it('Should create a few new users', async () => {
        const user1 = {
            "username": 'test1',
            "email": 'test1@gmail.com',
            "password": 'testing1234'
        };
        let res = await chai.request(server)
            .post('/user/signup')
            .set('Accept', 'application/json')
            .send(user1);
        expect(res.status).to.equal(200);
        expect(res.body).to.include({
            message: 'Signup successful',
            username: user1.username,
            email: user1.email
        });

        const user2 = {
            "username": 'test2',
            "email": 'test2@gmail.com',
            "password": 'testing2345'
        };
        res = await chai.request(server)
            .post('/user/signup')
            .set('Accept', 'application/json')
            .send(user2);
        expect(res.status).to.equal(200);
        expect(res.body).to.include({
            message: 'Signup successful',
            username: user2.username,
            email: user2.email
        });

        const user3 = {
            "username": 'test3',
            "email": 'test3@gmail.com',
            "password": 'testing3456'
        };
        res = await chai.request(server)
            .post('/user/signup')
            .set('Accept', 'application/json')
            .send(user3);
        expect(res.status).to.equal(200);
        expect(res.body).to.include({
            message: 'Signup successful',
            username: user3.username,
            email: user3.email
        });
    });

    it("Should not create a new user signing up with a taken username or email id", async () => {
        const user1 = {
            "username": 'test1',
            "email": 'test6@gmail.com',
            "password": 'testing1234'
        };
        let res = await chai.request(server)
            .post('/user/signup')
            .set('Accept', 'application/json')
            .send(user1);
        expect(res.message).to.not.equal('Signup successful');

        const user2 = {
            "username": 'test5',
            "email": 'test1@gmail.com',
            "password": 'testing2345'
        };
        res = await chai.request(server)
            .post('/user/signup')
            .set('Accept', 'application/json')
            .send(user2);
        expect(res.message).to.not.equal('Signup successful');
    });

    it("Should sign in if existing user", async () => {
        const user1 = {
            "username": 'test1',
            "password": 'testing1234'
        };
        let res = await chai.request(server)
            .post('/user/signin')
            .set('Accept', 'application/json')
            .send(user1);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Signin successful');
    });

    it("Should not sign in if user does not exist", async () => {
        const user1 = {
            "username": 'test7',
            "password": 'testing5678'
        };
        let res = await chai.request(server)
            .post('/user/signin')
            .set('Accept', 'application/json')
            .send(user1);
        expect(res.status).to.equal(401);
        expect(res.message).to.not.equal('Invalid Username or Password');
    });

    it("Should not sign in if invalid password", async () => {
        const user1 = {
            "username": 'test1',
            "password": 'testing5678'
        };
        let res = await chai.request(server)
            .post('/user/signin')
            .set('Accept', 'application/json')
            .send(user1);
        expect(res.status).to.equal(401);
        expect(res.message).to.not.equal('Invalid Username or Password');
    });

    it("Should get all users", async () => {
        let res = await chai.request(server)
            .get('/user/getUsers')
            .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('username');
        expect(res.body[0]).to.have.property('email');
        expect(res.body).to.have.length(3);
    });

    it("Should get a filtered list of users by username", async () => {
        let res = await chai.request(server)
            .get('/user/getUsers?username=test2')
            .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(1);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('username');
        expect(res.body[0]).to.have.property('email');
        expect(res.body[0]['username']).to.equal('test2');
    });

    it("Should get a filtered list of users by email", async () => {
        let res = await chai.request(server)
            .get('/user/getUsers?email=test3@gmail.com')
            .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(1);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('username');
        expect(res.body[0]).to.have.property('email');
        expect(res.body[0]['email']).to.equal('test3@gmail.com');
    });

    it("Should create a few new games", async () => {
        const game1 = {
            "sport": 2,
            "longitude": 55.27,
            "latitude": 25.21,
            "dateString": "2021-04-01T23:48:00.000",
            "max_group_size": 10,
            "skill_level": 3,
            "comments": "N/A"
        };
        let res = await chai.request(server)
            .post('/games/createGame')
            .set('Accept', 'application/json')
            .send(game1);
        expect(res.status).to.equal(200);
        expect(res.body.Game).to.include({
            id: 1,
            sport: game1.sport,
            max_group_size: game1.max_group_size,
            skill_level: game1.skill_level,
        });

        const game2 = {
            "sport": 4,
            "longitude": 118.45,
            "latitude": 34.06,
            "dateString": "2021-02-26T11:50:00.000",
            "max_group_size": 4,
            "skill_level": 5,
            "comments": "N/A"
        };
        res = await chai.request(server)
            .post('/games/createGame')
            .set('Accept', 'application/json')
            .send(game2);
        expect(res.status).to.equal(200);
        expect(res.body.Game).to.include({
            id: 2,
            sport: game2.sport,
            max_group_size: game2.max_group_size,
            skill_level: game2.skill_level,
        });

        const game3 = {
            "sport": 3,
            "longitude": 111.88,
            "latitude": 27.33,
            "dateString": "2021-02-28T11:50:00.000",
            "max_group_size": 6,
            "skill_level": 2,
            "comments": "N/A"
        };
        res = await chai.request(server)
            .post('/games/createGame')
            .set('Accept', 'application/json')
            .send(game3);
        expect(res.status).to.equal(200);
        expect(res.body.Game).to.include({
            id: 3,
            sport: game3.sport,
            max_group_size: game3.max_group_size,
            skill_level: game3.skill_level,
        });
    });

    it('Should not create a game without all required parameters', async () => {
        const game = {
            "sport": 2,
            "max_group_size": 10,
            "skill_level": 3,
            "comments": "N/A"
        };
        let res = await chai.request(server)
            .post('/games/createGame')
            .set('Accept', 'application/json')
            .send(game);
        expect(res.status).to.equal(500);
    });

    it("Should get all games", async () => {
        let res = await chai.request(server)
            .get('/games/getGames')
            .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('sport');
        expect(res.body[0]).to.have.property('location');
        expect(res.body[0]).to.have.property('max_group_size');
        expect(res.body[0]).to.have.property('skill_level');
        expect(res.body).to.have.length(3);
    });

    it("Should get a filtered list of games by sport", async () => {
        let res = await chai.request(server)
            .get('/games/getGames?sports[]=4&sports[]=3')
            .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(2);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('sport');
        expect(res.body[0]).to.have.property('location');
        expect(res.body[0]).to.have.property('time');
        expect(res.body[0]).to.have.property('max_group_size');
        expect(res.body[0]).to.have.property('skill_level');
    });

    it("Should get a filtered list of games by datetime", async () => {
        let res = await chai.request(server)
            .get('/games/getGames?weeksAhead=2')
            .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(2);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('sport');
        expect(res.body[0]).to.have.property('location');
        expect(res.body[0]).to.have.property('time');
        expect(res.body[0]).to.have.property('max_group_size');
        expect(res.body[0]).to.have.property('skill_level');
    });

    it("Should get a filtered list of games by radius", async () => {
        let res = await chai.request(server)
            .get('/games/getGames?radius=2&userLng=118.45&userLat=34.06')
            .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(1);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('sport');
        expect(res.body[0]).to.have.property('location');
        expect(res.body[0]).to.have.property('time');
        expect(res.body[0]).to.have.property('max_group_size');
        expect(res.body[0]).to.have.property('skill_level');
    });

    it('Should delete all the created games', async () => {
        let res = await chai.request(server)
            .post('/games/deleteGame/2')
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('Game deleted');

        res = await chai.request(server)
            .get('/games/getGames')
            .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(2);
    });
});


