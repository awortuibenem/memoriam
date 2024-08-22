// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Memoriam {
    struct Lock {
        address owner;
        string data;
        uint256 unlockTime;
        uint256 fee;
    }

    mapping(uint256 => Lock) public locks;
    uint256 public lockCount;

    event LockCreated(uint256 lockId, address indexed owner, uint256 unlockTime, uint256 fee);
    event DataAccessed(uint256 lockId, address indexed accessor, string data);
    event FeePaid(uint256 lockId, address indexed payer, uint256 feePaid);

    function createLock(string memory _data, uint256 _unlockTime, uint256 _fee) public {
        require(_unlockTime > block.timestamp, "Unlock time must be in the future");

        lockCount++;
        locks[lockCount] = Lock({
            owner: msg.sender,
            data: _data,
            unlockTime: _unlockTime,
            fee: _fee
        });

        emit LockCreated(lockCount, msg.sender, _unlockTime, _fee);
    }

    function accessData(uint256 _lockId) public payable {
        Lock storage lock = locks[_lockId];
        require(lock.unlockTime <= block.timestamp || msg.value >= lock.fee, "Cannot access data yet or insufficient fee");

        if (msg.value > 0) {
            require(msg.value >= lock.fee, "Insufficient fee");
            emit FeePaid(_lockId, msg.sender, msg.value);
        }

        require(lock.owner == msg.sender || lock.unlockTime <= block.timestamp, "Not authorized to access data");

        emit DataAccessed(_lockId, msg.sender, lock.data);
    }

    function withdraw() public {
        require(msg.sender == address(this), "Only contract can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }
}
