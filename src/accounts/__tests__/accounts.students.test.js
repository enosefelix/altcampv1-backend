const { dbConnect, dbCleanUP, dbDisconnect } = require('../../../test/test.db');
const app = require('../../../app');
const supertest = require('supertest');
const api = supertest(app);
const helper = require('../../../test/testHelper');
const { ACCOUNT_TYPES } = require('../../../constant');

let token;

beforeAll(async () => {
  // connect to database
  await dbConnect();

  // get 'dummy' entities from helper
  const { accounts, students, mentors } = helper;

  // data structure to hold 'dummy' entities to be created
  const entities = accounts.concat(students, mentors);

  // create entities in database
  await Promise.all(entities);
});

describe('GET requests', () => {
  it('to /accounts returns student accounts', async () => {
    const response = await api.get('/accounts').expect(200);

    response.body.data.forEach(({ accountType }) => {
      expect(accountType).toBe('Student');
    });
  });

  it('to /accounts?category=Student returns student accounts', async () => {
    const response = await api.get('/accounts').expect(200);

    response.body.data.forEach(({ accountType }) => {
      expect(accountType).toBe('Student');
    });
  });
});

describe('Updating a student', () => {
  it('with profile while not logged in should fail', async () => {
    const response = await api.put('/accounts').send({
      firstName: 'Musa',
      lastName: 'Mesly',
    });

    expect(response.status).toBe(401);
  });

  it('with profile should fail if payload contains unwanted properties', async () => {
    const user = helper.accountsAsJson[0];
    await login(user);

    const response = await api
      .put('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        randomProp: 'Musa',
      });

    expect(response.status).toBe(422);
  });

  it('with profile should fail if payload contains invalid properties', async () => {
    const user = helper.accountsAsJson[0];
    await login(user);

    const response = await api
      .put('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        track: 'Bango',
      });

    expect(response.status).toBe(422);
  });

  it('with profile is successful', async () => {
    const user = helper.accountsAsJson[0];
    await login(user);

    const firstName = 'Updated';
    const lastName = 'Elections';
    const track = 'Product Marketing';

    const response = await api
      .put('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName, lastName, track });

    expect(response.body.data).toHaveProperty('firstName', firstName);
    expect(response.body.data).toHaveProperty('lastName', lastName);
    expect(response.body.data).toHaveProperty(
      'accountType',
      ACCOUNT_TYPES.STUDENT
    );
  });

  it('with biography is successful', async () => {
    const user = helper.accountsAsJson[1];
    await login(user);

    const bio = 'I have the Midas touch. Midas was named after me.';

    const response = await api
      .put('/accounts/bio')
      .set('Authorization', `Bearer ${token}`)
      .send({ bio });

    expect(response.body.data).toHaveProperty('bio', bio);
    expect(response.body.data).toHaveProperty(
      'accountType',
      ACCOUNT_TYPES.STUDENT
    );
  });

  it('with biography while not logged is unsuccessful', async () => {
    const bio = 'I have the Midas touch. Midas was named after me.';

    const response = await api.put('/accounts/bio').send({ bio });

    expect(response.status).toBe(401);
  });

  /**
  it('with secure password is successful', async () => {
    const user = helper.accountsAsJson[1];
    await login(user);

    const password = 'ASecurePassword@1234';

    const response = await api
      .put('/accounts/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ password });

    expect(response.status).toBe(200);

    const loginAttempt = await api
      .post('/auth/login')
      .send({ email: user.email, password });

    expect(loginAttempt.status).toBe(200);
    expect(loginAttempt.body.data).toHaveProperty('token');
    expect(response.body.data).toHaveProperty(
      'accountType',
      ACCOUNT_TYPES.STUDENT
    );
  });

  it('with secure password and invalid parameters is not successful', async () => {
    const user = helper.accountsAsJson[4];
    await login(user);

    const password = 'ASecurePassword@1234';

    const response = await api
      .put('/accounts/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ password, retypePassword: 'password' });

    expect(response.status).toBe(422);
  });

  it('with unsecure password is not successful', async () => {
    const user = helper.accountsAsJson[2];
    await login(user);

    const password = 'AnunSecurePassword';

    await api
      .put('/accounts/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ password })
      .expect(422);
  });
  **/
});

afterAll(async () => {
  await dbCleanUP();
  await dbDisconnect();
});

async function login({ email, password }) {
  const response = await api.post('/auth/login').send({ email, password });
  if (response.status === 200) {
    token = response.body.data.token;
    return;
  }
  token = null;
}
