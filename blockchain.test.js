const Blockchain = require('./blockchain');
const Block = require('./block');


describe('Blockchain',()=>{
    let blockchain, newChain, originalChain;

    beforeEach(()=>{
        blockchain = new Blockchain();
        newChain = new Blockchain();

        originalChain = blockchain.chain;
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

    describe('replaceChain()',()=>{
        let errorMock, logMock;

        beforeEach(()=>{
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        });

        describe('when new chain is not longer',()=>{
            beforeEach(()=>{
                newChain.chain[0] = {new: 'chain'};

                blockchain.replaceChain(newChain.chain);
            });
            it('does not replace the chain',()=>{
            
                expect(blockchain.chain).toEqual(originalChain);
            });

            it('logs an error',()=>{
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('when the chain is longer',()=>{
            beforeEach(()=>{
                newChain.addBlock({ data: 'Data'});
                newChain.addBlock({ data: 'Data 2'});
                newChain.addBlock({ data: 'Data 3'});
            });
            describe('chain is invalid',()=>{
                beforeEach(()=>{
                    newChain.chain[2].hash = 'fake-hash';

                    blockchain.replaceChain(newChain.chain);
                });

                it('does not replace the chain',()=>{
                    

                    expect(blockchain.chain).toEqual(originalChain);
                });

                it('logs an error',()=>{
                    expect(errorMock).toHaveBeenCalled();
                });
            });

            describe('chain is valid',()=>{
                beforeEach(()=>{
                    blockchain.replaceChain(newChain.chain);
                });
                it('replaces the chain',()=>{    

                    expect(blockchain.chain).toEqual(newChain.chain);
                });

                it('logs about the chain replacement',()=>{
                    expect(logMock).toHaveBeenCalled();
                });
            });

        });
    });
});


dsfsdfsdfs