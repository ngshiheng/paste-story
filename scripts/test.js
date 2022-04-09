import http from "k6/http";
import { check, group, sleep } from "k6";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  duration: "1m",
  vus: 1,
  thresholds: {
    http_req_failed: ["rate==0.00"],
    http_req_duration: ["p(95)<2500"],
  },
};

const BASE_URL = "https://paste.jerrynsh.com";
const DUMMY_CONTENT = `Hello, ${randomString(9)}. I'm load testing with k6! 👋`;

let uuid;

const mutation = `
mutation createPaste {
  createPaste(content: "${DUMMY_CONTENT}") {
    uuid
    content
    createdOn
    expireAt
  }
}`;
const headers = { "Content-Type": "application/json" };

export default function () {
  group("visit main page", function () {
    const res = http.get(BASE_URL);

    check(res, {
      "is status 200": (r) => r.status === 200,
      "verify main page": (r) =>
        r.body.includes(
          "Read how to create and host this Pastebin clone for free"
        ),
    });

    sleep(1); // second
  });

  group("visit graphql endpoint", function () {
    const res = http.post(
      `${BASE_URL}/__graphql`,
      JSON.stringify({ query: mutation }),
      { headers }
    );

    check(res, {
      "is status 200": (r) => r.status === 200,
      "verify createPaste mutation": (r) => {
        const { data } = JSON.parse(r.body);
        uuid = data.createPaste.uuid;
        return uuid.length === 8 && data.createPaste.content === DUMMY_CONTENT;
      },
    });

    sleep(1); // second
  });

  group("visit paste url", function () {
    const res = http.get(`${BASE_URL}/${uuid}`);

    check(res, {
      "is status 200": (r) => r.status === 200,
      "verify paste content": (r) => r.body.includes(DUMMY_CONTENT),
    });

    sleep(1); // second
  });
}
