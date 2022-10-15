const web3 = require('web3')
const MultiSig = artifacts.require("MultiSig");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract ('multiSig', accounts => {
    //code for testing

    /**
     * BEFORE: DEPLOY A NEW MULTISIG, MIN PARAMETER & ADD A NEW OWNER DONE
     * TEST 1: DEPLOYMENT & 2 OWNERS DONE 
     * TEST 2: TEST DEPOSIT 
     * TEST 3: TEST SUBMIT (O1), CONFIRM (O1&O2), EXECUTE (O1orO2)
     * TEST 4: TEST SUBMIT (O1), CONFIRM (O1&O2), REVOKE (O2)
     * TEST 5: TEST SUBMIT (O2), GET (O1)
     */

    let multiSig, balance, testData, transaction

    

    before(async () => {
        //loadingt the contract and 2 minimumConfi
        multiSig = await MultiSig.new(2)
        await multiSig.newOwner([accounts[1]], {from: accounts[0]})
    });

    async function deposit1() {
        await multiSig.deposit({from: accounts[1], value: web3.utils.toWei("2", "ether")})
        //await multiSig.deposit({from: accounts[0], value: web3.utils.toWei("2", "ether")})
    }

    async function deposit2() {
        await multiSig.deposit({from: accounts[0], value: web3.utils.toWei("2", "ether")})
        //await multiSig.deposit({from: accounts[0], value: web3.utils.toWei("2", "ether")})
    }


    //TEST 1
    describe('Multi-Sig Deployment', async () => {
        it('Owner matches first account', async () => {
                const owner = await multiSig.isOwner(accounts[1]) //checking if second account is owner
                assert.equal(owner, true)
            })
    })

    //TEST 2 
    describe('Test Deposit', async () => {
        it('Test deposit', async () => {
            await deposit1()
            balance = await multiSig.walletBalance()
            assert.equal(balance, web3.utils.toWei("2"))
        })
    })

    //TEST 3
    describe('Testing submit, confirm, execute', async () => {
        it('Test another deposit', async () => {
            await deposit2()
            balance = await multiSig.walletBalance()
            assert.equal(balance, web3.utils.toWei("4"))
        })
        it('Test submit', async () => {
            await multiSig.submit(accounts[3], 1, "Tester", {from: accounts[1]})

            transaction = await multiSig.get(0)
            testData = transaction.data
            assert.equal("Tester", testData)
        })

        /* it('Test Confirm', async () => {
             await multiSig.confirm(0, {from: accounts[0]})
            await multiSig.confirm(0, {from: accounts[1]})
        }) */
    })

})