import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  duration: "30s",
  vus: 1,
  thresholds: {
    http_req_failed: ["rate==0.00"],
    http_req_duration: ["p(95)<800"],
  },
};

const BASE_URL = "https://paste.jerrynsh.com";

export default function () {
  const res = http.get(BASE_URL);

  check(res, {
    "is status 200": (r) => r.status === 200,
    "verify homepage text": (r) =>
      r.body.includes(
        "Read how to create and host this Pastebin clone for free"
      ),
  });

  sleep(1);
}
