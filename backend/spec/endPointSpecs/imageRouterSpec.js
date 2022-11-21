const supertest = require('supertest');
const jasmine = require('jasmine');
const app = require('../../build/server').default;
//
const request = supertest(app);
const route = '/api/images/';
describe('FULL images responses', () => {
  it('exposes the API endpoint', async () => {
    await request.get(route + 'nothing').expect(404);
  });

  it('2-tests right image', async () => {
    await request
      .get(route + 'fjord.jpg')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });
  it('3-tests right image with no extension', async () => {
    await request
      .get(route + 'fjord')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });

  it('4-tests right image with wrong extension', async () => {
    await request
      .get(route + 'fjord.whatever')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });
});

describe('RESIZED CASHED thumbs responses', () => {
  it('1-tests wrong thumb', async () => {
    await request.get(route + 'nothing?width=200&height=200').expect(404);
  });
  it('2-tests right cashed thumb', async () => {
    await request
      .get(route + 'fjord.jpg?width=200&height=200')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });
  it('3-tests cashed thumb with width only', async () => {
    await request
      .get(route + 'fjord.jpg?width=200')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });
  it('4-tests cashed thumb with height only', async () => {
    await request
      .get(route + 'fjord.jpg?height=200')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });
  it('5-tests right cashed thumb with wrong extension', async () => {
    await request
      .get(route + 'fjord.something?width=200&height=200')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });
});
describe('RESIZED NEW thumbs responses', () => {
  it('1-tests wrong thumb', async () => {
    await request.get(route + 'nothing?width=200&height=200').expect(404);
  });
  it('2-tests right thumb', async () => {
    await request
      .get(route + 'fjord.jpg?width=250&height=250')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });
  it('3-tests cashed thumb with width only', async () => {
    await request
      .get(route + 'fjord.jpg?width=300')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });
  it('4-tests cashed thumb with height only', async () => {
    await request
      .get(route + 'fjord.jpg?height=350')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });
  it('5-tests right cashed thumb with wrong extension', async () => {
    await request
      .get(route + 'fjord.something?width=400&height=400')
      .expect('Content-Type', 'image/jpeg')
      .expect(200);
  });
});
