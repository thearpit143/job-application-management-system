const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter username: ", (username) => {
  rl.question("Enter password: ", (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    console.log("\n===== Copy these into your database =====");
    console.log("Username:", username);
    console.log("Hashed Password:", hashedPassword);

    rl.close();
  });
});