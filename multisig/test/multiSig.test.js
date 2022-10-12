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


})