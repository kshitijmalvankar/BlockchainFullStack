class Block {
    constructor({timestamp, lastHash, hash, data}){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;

    }
}

const block1 = new Block({
    data:  "Data",
    timestamp: "01/01/01",
    lastHash: "last-hash",
    hash: "hash"
    
});

console.log('Block 1', block1);