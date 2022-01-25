const axios = require("axios").default;
require("dotenv").config();

const API_BASE_URL = "https://circleci.com/api/v2/project";
const vcs = process.env.VCS_TYPE;
const org = process.env.ORG_NAME;
const project = process.env.PROJECT_ID;
const token = process.env.CIRCLECI_TOKEN;

const postScheduleEndpoint = `${API_BASE_URL}/${vcs}/${org}/${project}/schedule`;

async function checkAndChangePermissionAccess() {
  try {
    let res = await axios.post(
      postScheduleEndpoint,
      {
        name: "Check and Change permission",
        description:
          "Check and revoke permissions assigned to users every night.",
        "attribution-actor": "current",
        parameters: {
          branch: "main",
          "run-schedule": true,
        },
        timetable: {
          "per-hour": 30,
          "hours-of-day": [1],
          "days-of-week": ["TUE", "WED", "THU", "FRI", "SAT"],
        },
      },
      {
        headers: { "circle-token": token },
      }
    );

    console.log(res.data, "This is a good response");
  } catch (error) {
    console.log(error.response, "Very bad response");
    // response.status(500).send(error);
  }

  //   console.log(res.data);
}

checkAndChangePermissionAccess();
