const Memoriam = artifacts.require("Memoriam");

contract('Memoriam', accounts => {
    let instance;

    beforeEach(async () => {
        instance = await Memoriam.new();
    });

    it('should create a lock successfully', async () => {
        const unlockTime = Math.floor(Date.now() / 1000) + 60; 
        const fee = web3.utils.toWei('1', 'ether'); 
        const data = "Test Data"; 
        await instance.createLock(data, unlockTime, fee, { from: accounts[0] });
        
        const lock = await instance.locks(1);
        assert(lock.unlockTime.toNumber() > Math.floor(Date.now() / 1000), "Unlock time should be in the future");
    });

    it('should allow accessing data after the unlock time', async () => {
        const unlockTime = Math.floor(Date.now() / 1000) + 60; 
        const fee = web3.utils.toWei('1', 'ether'); 
        const data = "Test Data";

        await instance.createLock(data, unlockTime, fee, { from: accounts[0] });
        await new Promise(resolve => setTimeout(resolve, 61000)); 
        await instance.accessData(1, { from: accounts[0] });
    });

    it('should allow accessing data by paying the fee', async () => {
        const unlockTime = Math.floor(Date.now() / 1000) + 60; 
        const fee = web3.utils.toWei('1', 'ether'); 
        const data = "Test Data";

        await instance.createLock(data, unlockTime, fee, { from: accounts[0] });

        await new Promise(resolve => setTimeout(resolve, 61000)); 

        await instance.accessData(1, { from: accounts[0], value: fee });
    });

    it('should not allow accessing data if the fee is insufficient', async () => {
        const unlockTime = Math.floor(Date.now() / 1000) + 60; 
        const fee = web3.utils.toWei('1', 'ether'); 
        const data = "Test Data";

        await instance.createLock(data, unlockTime, fee, { from: accounts[0] });

        await new Promise(resolve => setTimeout(resolve, 61000)); 

        try {
            await instance.accessData(1, { from: accounts[0], value: web3.utils.toWei('0.5', 'ether') }); 
            assert.fail("Access should not be granted with insufficient fee");
        } catch (error) {
            assert(error.message.includes('revert'), "Expected revert error for insufficient fee");
        }
    });
});
