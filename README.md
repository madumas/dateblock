
**dateblock** is a simple JavaScript node.js library to estimage the Ethereum block matching a specific date and time.

It determines the block from the blocktime by doing a doing several requests to an ethereum node until it finds a block
that is 1 block before or after the desired time.

## Usage

Use NPM to install the library:
```
npm install dateblock
```

Then include it:

```
import DateBlock from 'dateblock';
// or:
const DateBlock = require('dateblock');
```

Example:
```
var DateBlock = require("dateblock")
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

var dateblock = new DateBlock(web3);

var date = new Date(2018,07,20,0,0,0,0);
console.log(date);
dateblock.getBlock(date).then(function(block){  
    console.log(block.number)
    console.log(new Date(block.timestamp*1000));
});
```
