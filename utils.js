const argv = require("minimist")(process.argv.slice(2));
const fs = require("fs");

function Person(name) {
  this.name = name;
  this.points = 0;
}

const getRandomNumber = (min = -5, max = 13) =>
  Math.floor(Math.random() * (max - min) + min);

const saveScore = (score) => {
  fs.writeFileSync("score.json", JSON.stringify(score));
};

const checkIfWon = (...players) =>
  players.find((player) => player.points === 3);

module.exports = {
  Person,
  getRandomNumber,
  saveScore,
  argv,
  checkIfWon,
};
