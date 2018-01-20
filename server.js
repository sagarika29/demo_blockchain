const express = require('express');
const contractInstance = require('./deployContract.js');
const web3 = require('./web3Client.js');
const app = express();
const bodyParser = require('body-parser');
const candidates = require('./candidates.js');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + 'public/index.html'));
});

app.post('/ticket', function (req, res) {
  try {
    const candidateName = req.body.candidateName.trim();

    contractInstance.ticketForCandidate(candidateName, { from: web3.eth.accounts[0] }, function(result) {
      const totalTickets = contractInstance.totalTicketsFor.call(candidateName, { from: web3.eth.accounts[0] }).toString();
      res.send({ tickets: totalTickets, name: candidateName });
    });
  } catch (e) {
    res.status('400').send(`Failed! ${e}`);
  }
});

app.get('/candidates', function(req, res) {
  try {
    const candidateTickets = candidates.map(function(candidate) {
      const tickets = contractInstance.totalTicketsFor.call(candidate, { from: web3.eth.accounts[0] }).toString();
      return {
        name: candidate,
        tickets: tickets,
      };
    });

    res.send({ candidates: candidateTickets });
  } catch (e) {
    res.status('400').send(`Failed! ${e}`);
  }
});

app.listen(3000, function () {
  console.log('App ready and listening on port 3000!')
});