const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { response } = require('express');
const expect = chai.expect;
const server = require('../index');
const sequelize = require('../utils/sequelize/index');
const Game = sequelize.models.game;

// Test games routes
describe("Test game endpoints", () => {
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
            "longitude": 121.88,
            "latitude": 37.33,
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
    });

    it("Should get a filtered list of games by sport", async () => {
        let res = await chai.request(server)
            .get('/games/getGames?sport=4')
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

    it("Should get a filtered list of games by datetime", async () => {
        let res = await chai.request(server)
            .get('/games/getGames?weeksAhead=2')
            .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(1);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('sport');
        expect(res.body[0]['sport']).to.equal(4);
        expect(res.body[0]).to.have.property('location');
        expect(res.body[0]).to.have.property('time');
        expect(res.body[0]).to.have.property('max_group_size');
        expect(res.body[0]).to.have.property('skill_level');
    });

    it('Should delete a specific game', async () => {
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
        expect(res.body).to.have.length(1);
    });


});


