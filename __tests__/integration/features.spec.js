/**
 * @jest-environment node
 */

const config = require('../../src/config');
const supertest = require('supertest');
// import {disconnect} from '@tests/utils/mongoose';

const testApp = () => supertest(config.app);



let response;



describe('Getting a list of Questions by a search query of topic', () => {
  jest.setTimeout(15000);
  beforeAll( async() => {
    const searchQuestions = (async () => {
      response = await testApp().get('/search?q=Describe and carry out tests for');
    });

    await searchQuestions();
  })

  it('Should return status code 200, ', async () => {
    expect(response.statusCode).toBe(200);
  });

  
  it('Should return response as object, ', async () => {
    expect(typeof response.body).toBe('object');
  });

  it('Response Body Should have a field code as zero, ', async () => {
    expect(response.body.code).toBe(0);
  });


  it('Response Body Should have a message field which is "Success" ', async () => {
    expect(response.body.message).toBe('Success');
  });


  it('Response Body Should have a "data" field which must be an "array"', async () => {
    expect(Array.isArray(response.body.data)).toBe(true);
  });
  
  it('Should return status code 404', async () => {
    const response = await testApp().get('/not-found');
    expect(response.statusCode).toBe(404);
  });

  it('Should return status code 200', async () => {
    const response = await testApp().get('/');
    expect(response.statusCode).toBe(200);
  });

});


// afterAll(async () => await disconnect())
