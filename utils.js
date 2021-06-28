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

const randomPlayers = (length) => {
  const nums = [];
  for (let i = 0; i < length; i++) {
    nums.push(i);
  }
  let ranNums = [],
    i = length,
    j = 0;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    ranNums.push(nums[j]);
    nums.splice(j, 1);
  }
  return [...ranNums];
};

module.exports = {
  Person,
  getRandomNumber,
  saveScore,
  argv,
  randomPlayers,
  checkIfWon,
};
