const CryptoBlock = require("./block");

class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
    }
    startGenesisBlock() {
        const firstBlock = new CryptoBlock(1, "01/01/2020", "", "0");
        firstBlock.mineBlock(3);
        return firstBlock;
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.mineBlock(3);
        this.blockchain.push(newBlock);
    }

    changeBlockchain(newBlock) {
        this.blockchain[newBlock.numBlock].data = newBlock.data;
        this.blockchain[newBlock.numBlock].index = newBlock.index;
        this.blockchain[newBlock.numBlock].nonce = newBlock.nonce;
        console.log(this.blockchain);
        for (let i = newBlock.numBlock; i < this.blockchain.length; i++) {
            if (i === 0) {
                this.blockchain[i].precedingHash = 0;
                this.blockchain[i].hash = this.blockchain[i].computeHash();
            } else {
                this.blockchain[i].precedingHash = this.blockchain[i - 1].hash;
                this.blockchain[i].hash = this.blockchain[i].computeHash();
            }
        }
        console.log(this.blockchain);
    }

    mineBlockchain(newBlock) {
        this.blockchain[newBlock.numBlock].data = newBlock.data;
        this.blockchain[newBlock.numBlock].index = newBlock.index;
        this.blockchain[newBlock.numBlock].nonce = newBlock.nonce;

        console.log(this.blockchain[newBlock.numBlock].nonce);
        this.blockchain[newBlock.numBlock].mineBlock(3);
        console.log(this.blockchain[newBlock.numBlock].nonce);
        //console.log(this.blockchain[newBlock.numBlock]);
        for (let i = newBlock.numBlock + 1; i < this.blockchain.length; i++) {
            this.blockchain[i].precedingHash = this.blockchain[i - 1].hash;
            this.blockchain[i].hash = this.blockchain[i].computeHash();
            //  console.log(this.blockchain[i]);
        }
    }
}

module.exports = CryptoBlockchain;