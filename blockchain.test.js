const Blockchain = require('./blockchain');
const Block = require('./block');


describe('Blockchain',()=>{
    let blockchain;

    beforeEach(()=>{
        blockchain = new Blockchain();
    })

    it('contains a `chain` Array instance',()=>{
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain',()=>{
        const newData = 'new Data';
        blockchain.addBlock({data: newData});

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    describe('isValidChain()',()=>{
        describe('chain doest start with a genesis block',()=>{
            it('returns false',()=>{
                blockchain.chain[0] = {data: 'fake-genesis'};

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('chain starts with genesis block and has multiple blocks',()=>{

            beforeEach(()=>{
                blockchain.addBlock({ data: 'Data'});
                blockchain.addBlock({ data: 'Data 2'});
                blockchain.addBlock({ data: 'Data 3'});

            });

            describe('last hash reference has changed',()=>{
                it('returns false',()=>{
                   
                    blockchain.chain[2].lastHash = 'fake lastHash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });

            });

            describe('and chain contains a block with an invalid field',()=>{
                it('returns false',()=>{
                  
                    blockchain.chain[2].data = 'bad-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('chain doesnt contain any invalid blocks',()=>{
                it('returns true',()=>{

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });
        });
    });
});