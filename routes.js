const express = require("express");
const userModel = require("./models");
const content = require("./content");

const app = express();

app.get("/", (request, response) => {
  response.json({ message: "You are welcome!" });
});

app.post("/create-permission", async (request, response) => {
  const user = new userModel(request.body);

  try {
    await user.save();
    response.json({ message: user });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/check-access", async (request, response) => {
  const result = await userModel.updateMany(
    { endDate: { $lt: Date.now() } },
    { hasAccess: false }
  );

  try {
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/secured", async (request, response) => {
  const user = await userModel.find({ email: request.body.email });

  if (user.length > 0) {
    response.json(content);
  } else {
    response.json({ error: "Access denied" });
  }
});

app.get("/all-access", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.json({ message: users });
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
