const chalk = require("chalk");
const {
  Person,
  getRandomNumber,
  saveScore,
  argv,
  checkIfWon,
} = require("./utils");

const player1 = new Person(argv.player1);
const player2 = new Person(argv.player2);

const game = () => {
  let msgs = [];
  let msg = "";
  let round = 0;

  const timer = setInterval(() => {
    const number = getRandomNumber();

    msg = `Round #${++round}, random number is ${number}, `;

    if (number % 2 === 0) {
      player1.points++;
      msg += `${player1.name} Scored!`;
    } else {
      player2.points++;
      msg += `${player2.name} Scored!`;
    }

    let status = `Status ${player1.name} ${player1.points}, ${player2.name} ${player2.points}`;

    console.log(chalk.green(msg) + "\n" + chalk.underline(status));

    msgs.push(msg, status);

    let winner = checkIfWon(player1, player2);

    if (winner) {
      clearInterval(timer);
      console.log(chalk.bgGreen(`${winner.name} Wins !`));
      saveScore(msgs);
    }
  }, 1000);
};

game();
