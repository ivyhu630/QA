import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    // { duration: '30s', target: 400 }, // below normal load
    // { duration: '1m', target: 400 },
    // { duration: '1m', target: 200 }, // normal load
    // { duration: '2m', target: 200 },
    // { duration: '1m', target: 300 }, // around the breaking point
    // { duration: '2m', target: 300 },
    // { duration: '1m', target: 400 }, // beyond the breaking point
    { duration: '1m', target: 200 },
    // { duration: '30s', target: 0 }, // scale down. Recovery stage.
  ],
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function () {
  const question_id = getRandomInt(2818975, 3518975);
  const product_id = getRandomInt(1, 899855);
  const BASE_URL = 'http://localhost:3001/qa/questions'; // make sure this is not production

  const responses = http.batch([
    // get answers
    // ['GET', `${BASE_URL}/${question_id}/answers/?page=1&count=5`],
    ['GET', `${BASE_URL}/350000/answers/?page=1&count=5`],
    // get questions
    // ['GET', `${BASE_URL}?product_id=${product_id}&page=1&count=5`],
  ]);

  sleep(1);
}
// k6 run --out json=my_test_result.json stress_test.js

// outout to New Relic statsd
// K6_STATSD_ENABLE_TAGS=true k6 run --out statsd stress_test.js
