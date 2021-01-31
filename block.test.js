const Block = require("./block");
const { GENESIS_DATA } = require("./config");

describe('Block', ()=> {
    const timestamp = 'date';
    const lastHash = 'hash';
    const hash = 'new hash';
    const data = ['blockchain', 'data'];
    const block = new Block({
        timestamp, lastHash, hash, data
    });

    it('has a timestamp, lastHash, hash and data properties',()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });


    describe('genesis()', ()=>{
        const genesisBlock = Block.genesis();

        console.log('genesis block', genesisBlock)

        it('returns a Block instance',()=>{
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns the genesis data',()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

});