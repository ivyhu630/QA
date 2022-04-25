const frisby = require('frisby');

it('GET answers should return a status of 200 OK', () => frisby
  .get('http://localhost:3001/qa/questions/555/answers/?page=1&count=5')
  .expect('status', 200));

it('GET questions should return a status of 200 OK', () => frisby
  .get('http://localhost:3001/qa/questions/?product_id=555&page=1&count=5')
  .expect('status', 200));

it('POST questions should return a status of 201 Created', () => frisby
  .post('http://localhost:3001/qa/questions', {
    body: {
      name: 'ivyBot',
      body: 'test question',
      email: 'ivyBot@gmail.com',
      product_id: 40345,
      photos: [],
    },
  })
  .expect('status', 201));

it('POST answers should return a status of 201 Created', () => frisby
  .post('http://localhost:3001/qa/questions/555/answers', {
    body: {
      name: 'ivyBot',
      body: 'test answer',
      email: 'ivyBot@gmail.com',
      product_id: 40345,
      photos: [],
    },
  })
  .expect('status', 201));

it('Mark questions helpful should return a status of 204 OK', () => frisby
  .put('http://localhost:3001/qa/questions/555/helpful')
  .expect('status', 204));

it('Mark answers helpful should return a status of 204 OK', () => frisby
  .put('http://localhost:3001/qa/answers/555/helpful')
  .expect('status', 204));
