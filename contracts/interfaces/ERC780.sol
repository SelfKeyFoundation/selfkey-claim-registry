pragma solidity ^0.4.23;

/**
 * @title ERC780
 * @dev Identity interface _based_ on the ERC780 proposal
 */
contract ERC780 {
    mapping(address => mapping(address => mapping(bytes32 => bytes32))) public registry;

    event ClaimSet(
        address indexed issuer,
        address indexed subject,
        bytes32 indexed key,
        bytes32 value,
        uint updatedAt);

    event ClaimRemoved(
        address indexed issuer,
        address indexed subject,
        bytes32 indexed key,
        uint removedAt);

    function setClaim(address subject, bytes32 key, bytes32 value) public;
    function setSelfClaim(bytes32 key, bytes32 value) public;
    function getClaim(address issuer, address subject, bytes32 key) public constant returns(bytes32);
    function removeClaim(address issuer, address subject, bytes32 key) public;
}
