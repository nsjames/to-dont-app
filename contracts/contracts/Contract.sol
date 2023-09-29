// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Contract {

    struct Task {
        string text;
        uint32 count;
    }

    struct IndexedTask {
        uint32 id;
        string text;
        uint32 count;
    }

    mapping(address => uint32) public userTotalTasks;
    mapping(address => mapping(uint32 => Task)) public tasks;

    function checkStringLength(string memory _text, string memory _errorMessage) internal pure {
        require(bytes(_text).length > 0, _errorMessage);
    }

    function addTask(string memory _text) external {
        checkStringLength(_text, "Task text cannot be empty");
        uint32 id = userTotalTasks[msg.sender];
        tasks[msg.sender][id] = Task(_text, 0);
        userTotalTasks[msg.sender]++;
    }

    function incrementTask(uint32 _index) external {
        checkStringLength(tasks[msg.sender][_index].text, "Task does not exist");
        tasks[msg.sender][_index].count++;
    }

    function removeTask(uint32 _index) external {
        delete tasks[msg.sender][_index];
    }

    function getTasks(address _user) external view returns (IndexedTask[] memory) {
        uint32 maxId = userTotalTasks[_user];
        IndexedTask[] memory returnedTasks = new IndexedTask[](maxId);
        uint32 insertedIndex = 0;
        for (uint32 i = 0; i < maxId; i++) {
            if (bytes(tasks[_user][i].text).length > 0) {
                returnedTasks[insertedIndex] = IndexedTask(i, tasks[_user][i].text, tasks[_user][i].count);
                insertedIndex++;
            }
        }

        assembly {
            mstore(returnedTasks, insertedIndex)
        }

        return returnedTasks;

    }

}
