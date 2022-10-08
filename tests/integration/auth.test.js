const {User} = require('../../models/user');
const {Genre} = require('../../models/genre');
const request = require('supertest');

/* jshint ignore:start */

describe('auth middleware', () => {
    // restart the server for each test, else the port gets messed up
    beforeEach(() => { server = require('../../index'); });
    afterEach( async () => {  
        await Genre.remove({});
        await server.close(); 
    });

    let token;

    const exec = () => {
        // since we are returning the promise directly we do not need to await it here
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    it('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if invalid token', async () => {
        token = 'a';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if valid token', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
});

/* jshint ignore:end */
