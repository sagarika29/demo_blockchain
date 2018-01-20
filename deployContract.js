const candidates = require('./candidates.js');
const fs = require('fs');
const web3 = require('./web3Client.js');
const code = fs.readFileSync('Ticketing.sol').toString();
const solc = require('solc');
const compiledCode = solc.compile(code);
const abiDefinition = JSON.parse(compiledCode.contracts[':Ticketing'].interface);
const TicketingContract = web3.eth.contract(abiDefinition);
const byteCode = compiledCode.contracts[':Ticketing'].bytecode;
const deployedContract = TicketingContract.new(candidates, { data: byteCode, from: web3.eth.accounts[0], gas: 4700000 });
const fanContract = TicketingContract.new(candidates, { data: byteCode, from: web3.eth.accounts[1], gas: 4700000 });

module.exports = deployedContract;
module.exports = fanContract;