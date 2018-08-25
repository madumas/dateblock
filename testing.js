
var DateBlock = require('./dateblock.js')
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

var DB = new DateBlock(web3);

var date = new Date(2018,07,25,18,0,3,0);
console.log(date);
DB.getBlock(date).then(function(block){
    console.log(block.number)
    console.log(new Date(block.timestamp*1000));
});