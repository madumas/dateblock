

class DateBlock {


    constructor(web3) {
        if (!(this instanceof DateBlock)) {
            return new DateBlock(web3);
        }
        this.web3 = web3;
    }

    async guessBlock(curBlock, targetDate, iteration) {
        let _this=this;
        return new Promise((fulfil) => {
            let curBlockDate = new Date(curBlock.timestamp * 1000);
            let diff = (curBlockDate - targetDate) / 1000;
            let guess = Math.floor(curBlock.number - diff / (15+iteration));
            _this.web3.eth.getBlock(guess).then(fulfil)
            .catch(console.log);
        })
        .then (function (guess) {
            if(guess === null ) {throw "Future date or block not mined for this date";}
            if ( Math.abs(guess.number - curBlock.number) > 1 ) { //|| Date(guess.timestamp*1000)>targetDate
                return  _this.guessBlock(guess, targetDate, ++iteration);
            } else {
                return(guess);
            }
        });
    }


    async getBlock(date) {
        let _this=this;
        //try to guess the block
        return new Promise((fulfil) => {
            this.web3.eth.getBlock('latest').then(function (block) {
                _this.guessBlock(block, date, 0).then(fulfil).catch(console.log);
            }).catch(console.log);
        })

    }

}


module.exports = DateBlock;
