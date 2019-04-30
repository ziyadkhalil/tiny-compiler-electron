const fs = require('fs');
const util = require('./util');
const DFA = require('./dfa');
var x = fs.readFileSync('./input.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  return data;
});
var dfa = new DFA(x);
dfa.run();
dfa.printTokens();
