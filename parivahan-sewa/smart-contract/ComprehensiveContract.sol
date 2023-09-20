// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;


contract ConprehensiveContract {

    address owner;

    struct Data {
        address sentBy;
        string email;
        string hash;
    }

    constructor() {
        owner = msg.sender;
    }

    mapping(string => Data) public hashes;

    function getData(string calldata id) public view returns (Data memory) {
        return hashes[id];
    }

    function putData(string calldata id, string calldata email, string calldata hash) public {
        Data memory data;
        data.sentBy = msg.sender;
        data.email  = email;
        data.hash   = hash;
        hashes[id] = data;
    }

}
