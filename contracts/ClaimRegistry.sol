pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import './interfaces/ERC780.sol';

/**
 *  ERC780 implementation for public claims on (selfkey) identities
 */
contract ClaimRegistry is ERC780 {

    function toAddress(bytes32 a) internal pure returns (address b) {
        assembly {
            mstore(0, a)
            b := mload(0)
        }
        return b;
    }

    function toBytes32(address a) internal pure returns (bytes32 b) {
       assembly {
            mstore(0, a)
            b := mload(0)
        }
       return b;
    }

    constructor() public {
    }

    // create or update clams
    function setClaim(bytes32 subject, bytes32 key, bytes32 value) public {
        bytes32 sender = toBytes32(msg.sender);
        registry[sender][subject][key] = value;
        emit ClaimSet(sender, subject, key, value, now);
    }

    function setSelfClaim(bytes32 key, bytes32 value) public {
        setClaim(toBytes32(msg.sender), key, value);
    }

    function getClaim(bytes32 issuer, bytes32 subject, bytes32 key) public view returns(bytes32) {
        return registry[issuer][subject][key];
    }

    function removeClaim(bytes32 issuer, bytes32 subject, bytes32 key) public {
        require(msg.sender == toAddress(issuer));
        delete registry[issuer][subject][key];
        emit ClaimRemoved(toBytes32(msg.sender), subject, key, now);
    }

    function subjectHasClaim(bytes32 issuer, bytes32 subject, bytes32 key) public returns(bool) {
        return registry[issuer][subject][key] != bytes32(0);
    }
}
