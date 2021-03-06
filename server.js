const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const enforce = require("express-sslify");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(enforce.HTTPS({ trustProtoHeader: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (request, responce) {
    responce.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

app.post("/payment", function (request, responce) {
  const body = {
    source: request.body.token.id,
    amount: request.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) responce.status(500).send({ error: stripeErr });
    else responce.status(200).send({ success: stripeRes });
  });
});
