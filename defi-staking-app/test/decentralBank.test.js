const RWD = artifacts.require('RWD');
const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract ('decentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank

    //towei
    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        //loadingt the contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        //run transfer to DcentralBank 1000000
        await rwd.transfer(decentralBank.address, tokens('1000000'))
       
        //trasnfer 100 tether to customer.
        await tether.transfer(customer, tokens('100'), {from: owner})
    });

    //testing code goes here
    describe('Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name()
            assert.equal(name, 'Tether')
        })
    })

    describe('Reward Token Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })

    describe('Decentralised Bank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('Contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })
    })
}) 