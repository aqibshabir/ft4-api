//dependencies
const express = require("express");
const personSchema = require("./schemas/personSchema.js");

//executing express
const app = express();

//middleware
app.use(express.json());

const people = [
  { id: 1, name: "Aqib", age: 30 },
  { id: 2, name: "Georgie", age: 28 },
  { id: 3, name: "Hannah", age: 27 },
];

//get route
app.get("/", (req, res) => {
  res.send("Welcome!");
});

//get all people
app.get("/api/people", (req, res) => {
  res.send(people);
});

// get specific person
app.get("/api/people/:id", (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id));
  if (!person) {
    return res.status(404).send("The person with the given ID was not found.");
  }
  res.send(person);
});

// adding new person
app.post("/api/people", (req, res) => {
  // input validation
  const result = personSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const person = {
    id: people.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  people.push(person);
  res.send(person);
});

// updating person
app.put("/api/people/:id", (req, res) => {
  //looking up person
  const person = people.find((p) => p.id === parseInt(req.params.id));
  if (!person) {
    return res.status(404).send("The person with the given ID was not found.");
  }
  //validation
  const result = personSchema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  // update person
  person.name = req.body.name;
  person.age = req.body.age;
  res.send(person);
});

// delete person
app.delete("/api/people/:id", (req, res) => {
  //looking up person
  const person = people.find((p) => p.id === parseInt(req.params.id));
  if (!person) {
    return res.status(404).send("The person with the given ID was not found.");
  }
  // delete
  const index = people.indexOf(person);
  people.splice(index, 1);
  res.send(person);
});

//port short-circuting
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
