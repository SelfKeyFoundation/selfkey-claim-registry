pragma solidity ^0.4.23;

/**
 * @title ERC781
 * @dev Claim registry interface defined by SelfKey
 */
contract ERC781 {
    mapping(bytes23 => mapping(bytes32 => mapping(bytes32 => bytes32))) public registry;

    /*struct Claim {
        bytes32 value,
        uint256 expiry
    }*/

    event ClaimSet(
        bytes32 indexed issuer,
        bytes32 indexed subject,
        bytes32 indexed key,
        bytes32 value,
        uint256 updatedAt);

    event ClaimRemoved(
        bytes32 indexed issuer,
        bytes32 indexed subject,
        bytes32 indexed key,
        uint256 removedAt);

    function setClaim(bytes32 subject, bytes32 key, bytes32 value) public;
    function setSelfClaim(bytes32 key, bytes32 value) public;
    function getClaim(bytes32 issuer, bytes32 subject, bytes32 key) public constant returns(bytes32);
    function removeClaim(bytes32 issuer, bytes32 subject, bytes32 key) public;
    // new methods
    //function getClaimsByIssuer(bytes32 issuer) public;
    //function getClaimsOfKey(bytes32 issuer, bytes32 subject) public;
    //function getClaimsAboutSubject() public;
    function subjectHasClaim(bytes32 issuer, bytes32 subject, bytes32 key) public returns(bool);

}
