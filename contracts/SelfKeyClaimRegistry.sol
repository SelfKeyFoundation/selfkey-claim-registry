pragma solidity 0.5.4;

import "selfkey-did-ledger/contracts/DIDLedger.sol";
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

/**
 *  ERC780-based implementation for public claims on (selfkey) identities
 */
contract SelfKeyClaimRegistry {
    // registry[issuer][subject][key] => value
    mapping(bytes32 => mapping(bytes32 => mapping(bytes32 => bytes32))) public registry;
    DIDLedger public ledger;

    event ClaimSet(
        address issuerAddress,
        bytes32 indexed issuerDID,
        bytes32 indexed subject,
        bytes32 indexed key,
        bytes32 value,
        uint256 updatedAt);

    event ClaimRemoved(
        address issuerAddress,
        bytes32 indexed issuerDID,
        bytes32 indexed subject,
        bytes32 indexed key,
        uint256 removedAt);

    constructor(address _didLedger) public {
        ledger = DIDLedger(_didLedger );
    }

    modifier onlyDIDController(bytes32 issuerDID) {
        address controller = ledger.getController(issuerDID);
        require(controller == msg.sender, "Sender has no control of issuer DID");
        _;
    }

    function setClaim(bytes32 issuerDID, bytes32 subject, bytes32 key, bytes32 value)
        public
        onlyDIDController(issuerDID)
    {
        registry[issuerDID][subject][key] = value;
        emit ClaimSet(msg.sender, issuerDID, subject, key, value, now);
    }

    function getClaim(bytes32 issuerDID, bytes32 subject, bytes32 key)
        public
        view
        returns(bytes32)
    {
        return registry[issuerDID][subject][key];
    }

    function removeClaim(bytes32 issuerDID, bytes32 subject, bytes32 key)
        public
        onlyDIDController(issuerDID)
    {
        delete registry[issuerDID][subject][key];
        emit ClaimRemoved(msg.sender, issuerDID, subject, key, now);
    }
}
