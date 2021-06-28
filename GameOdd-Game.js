const chalk = require("chalk");
const {
  Person,
  getRandomNumber,
  saveScore,
  argv,
  checkIfWon,
  randomPlayers,
} = require("./utils");

let bossFlag = true;

const game = (...players) => {
  let msgs = [];
  let msg = "";
  let round = 0;
  const copy = [...players];

  const timer = setInterval(() => {
    const number = getRandomNumber();

    if (players.length > 2) {
      const [ind1, ind2] = randomPlayers(players.length);
      players[0] = copy[ind1];
      players[1] = copy[ind2];
    }

    msg = `Round #${++round}, random number is ${number}, `;

    if (
      (players[1].name === "Boss" && number % 2 === 0 && number >= 0) ||
      (number % 2 === 0 && players[1].name !== "Boss")
    ) {
      players[0].points++;
      msg += `${players[0].name} Scored!`;
    } else if (
      (players[1].name === "Boss" && number % 2 !== 0) ||
      (players[1].name !== "Boss" && number % 2 !== 0)
    ) {
      players[1].points++;
      msg += `${players[1].name} Scored!`;
    }

    let status = `Status ${players[0].name} ${players[0].points}, ${players[1].name} ${players[1].points}`;

    console.log(chalk.green(msg) + "\n" + chalk.underline(status));

    msgs.push(msg, status);

    let winner = checkIfWon(players[0], players[1]);

    if (winner) {
      clearInterval(timer);
      console.log(chalk.bgGreen(`${winner.name} Wins !`));
      saveScore(msgs);

      if (bossFlag) {
        const boss = new Person("Boss");
        winner.points = 0;
        game(winner, boss);
        bossFlag = false;
      }
    }
  }, 1000);
};

if (argv._.length >= 2) {
  const objs = [];
  for (const [i, val] of argv._.entries()) {
    objs[i] = new Person(val);
  }
  game(...objs);
} else {
  const player1 = new Person(argv.player1);
  const player2 = new Person(argv.player2);
  game(player1, player2);
}
