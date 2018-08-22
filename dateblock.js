

class DateBlock {


    constructor(web3) {
        if (!(this instanceof DateBlock)) {
            return new DateBlock(web3);
        }
        this.web3 = web3;
    }

    async guessBlock(curBlock, targetDate) {

        let _this=this;
        return new Promise((fulfil) => {
            let curBlockDate = new Date(curBlock.timestamp * 1000);
            let diff = (curBlockDate - targetDate) / 1000;
            let guess = Number(curBlock.number - diff / 14).toFixed(0);

            _this.web3.eth.getBlock(guess).then(fulfil)
            .catch(console.log);
        })
        .then (function (guess) {
            console.log("guess "+guess.number + "curblock "+curBlock.number);
            if ( Math.abs(guess.number - curBlock.number) > 1 || guess.number < curBlock.number) {
                return  _this.guessBlock(guess, targetDate);
            } else {
                return(curBlock);
            }
        });
    }


    async getBlock(date) {
        let _this=this;
        //try to guess the block
        return new Promise((fulfil) => {
            this.web3.eth.getBlock('latest').then(function (block) {
                _this.guessBlock(block, date).then(fulfil).catch(console.log);
            }).catch(console.log);
        })

    }

}


module.exports = DateBlock;
