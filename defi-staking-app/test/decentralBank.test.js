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

        //run transfer to DecentralBank 1000000
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

    describe('Yield farming', async () => {
        it('rewards tokens for staking', async () => {
            let result
            
            //check investor balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance')

            //check staking for customer of 100 tokens
            await tether.approve(decentralBank.address, tokens('100'), {from:customer})
            await decentralBank.depositTokens(tokens('100'), {from: customer})

            //check updated balance of customer
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'Customer mock wallet balance')

            //check updated balance of decentral bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'DeCentral Bank mock wallet')

            //is staking balance
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'customer is staking status after staking')
            
        })
    })
}) 