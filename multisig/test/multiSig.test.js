const MultiSig = artifacts.require("MultiSig");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract ('multiSig', accounts => {
    //code for testing

    /**
     * BEFORE: DEPLOY A NEW MULTISIG, MIN PARAMETER & ADD A NEW OWNER 
     * TEST 1: DEPLOYMENT & 2 OWNERS
     * TEST 2: TEST DEPOSIT
     * TEST 3: TEST SUBMIT (O1), CONFIRM (O1&O2), EXECUTE (O1orO2)
     * TEST 4: TEST SUBMIT (O1), CONFIRM (O1&O2), REVOKE (O2)
     * TEST 5: TEST SUBMIT (O2), GET (O1)
     */

    let multiSig

    before(async () => {
        //loadingt the contract and 2 minimumConfi
        multiSig = await MultiSig.new(2)
        await multiSig.newOwner([accounts[1]], {from: accounts[0]})
    });

    describe('Multi-Sig Deployment', async () => {
        it('Owner matches first account', async () => {
            const owner = await multiSig.isOwner(accounts[0])
            assert.equal(owner, true)
        })
    })

})