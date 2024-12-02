// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/access/Ownable.sol";

contract HouseRent {
    uint256 counter;

    struct Agreement {
        uint256 agreementId;
        address ownerAddress;
        address tenantAddress;
        uint256 securityDeposit;
        uint256 monthlyRent;
        uint256 startTime;
        uint256 tenure;
        uint256 lastRentPaid; // keeps track of time of last rent payment
        bool isActive; //0--> Inactive , 1-->Active
    }

    struct Owner {
        address ownerAddress;
        Agreement[] agreementList;
    }

    struct Tenant {
        address tenantAddress;
        uint256 reputationScore;
        Agreement[] agreementList;
    }

    event AgreementCreated(
        address ownerAddress,
        address tenantAddress,
        uint256 securityDeposit,
        uint256 monthlyRent,
        uint256 startTime,
        uint256 endTime,
        uint256 agreementId,
        bool isActive
    );
    event SecuityDeposited(
        address ownerAddress,
        address tenantAddress,
        uint256 securityDeposit,
        uint256 datePaid,
        uint256 agreementId
    );
    event RentPaid(
        address ownerAddress,
        address tenantAddress,
        uint monthlyRent,
        uint256 datePaid,
        uint256 agreementId
    );
    event TenureCompleted(
        uint256 agreementId,
        address ownerAddress,
        address tenatAddress,
        uint256 refundAmount,
        bool isActive
    );
    event AgreementCancelled(
        uint256 agreementId,
        address ownerAddress,
        address tenatAddress,
        uint256 securityDeposit,
        bool isActive
    );

    mapping(address => uint256[]) reputationList; //tenantAddress->(chnage of reputations) most recent will be the last
    mapping(uint256 => Agreement) agreementList;

    constructor() {
        counter = 0;
    }

    function createAgreement(
        address ownerAddress,
        address tenantAddress,
        uint256 securityDeposit,
        uint256 monthlyRent,
        uint256 tenureInMonths
    ) public payable {
        require(ownerAddress != address(0), "ownerAddress must be non-zero");
        require(tenantAddress != address(0), "tenantAddress must be non-zero");
        require(
            ownerAddress != msg.sender,
            "Agreemrnt should be created by the owner only"
        );

        uint256 startTime = block.timestamp;
        // uint256 endTime = block.timestamp + tenureInMonths*30*24*60*60;

        agreementList[counter] = Agreement({
            agreementId: counter,
            ownerAddress: ownerAddress,
            tenantAddress: tenantAddress,
            securityDeposit: securityDeposit,
            monthlyRent: monthlyRent,
            startTime: startTime,
            tenure: tenureInMonths,
            lastRentPaid: startTime,
            isActive: true
        });

        emit AgreementCreated(
            ownerAddress,
            tenantAddress,
            securityDeposit,
            monthlyRent,
            startTime,
            tenureInMonths,
            counter,
            true
        );
        counter += 1;
    }

    function depositSecurity(
        address ownerAddress,
        address tenantAddress,
        uint256 securityDeposit,
        uint256 agreementId
    ) public payable {
        require(ownerAddress != address(0), "ownerAddress must be non-zero");
        require(tenantAddress != address(0), "tenantAddress must be non-zero");
        require(
            tenantAddress == msg.sender,
            "Security should be deposited by tenant only"
        );
        require(
            agreementList[agreementId].ownerAddress == ownerAddress,
            "Paying to wrong owner"
        );

        emit SecuityDeposited(
            ownerAddress,
            tenantAddress,
            securityDeposit,
            block.timestamp,
            agreementId
        );
    }

    function payMonthlyRent(
        address ownerAddress,
        address tenantAddress,
        uint256 monthlyRent,
        uint256 agreementId
    ) public payable {
        require(ownerAddress != address(0), "ownerAddress must be non-zero");
        require(tenantAddress != address(0), "tenantAddress must be non-zero");
        require(
            tenantAddress == msg.sender,
            "Security should be deposited by tenant only"
        );
        require(
            agreementList[agreementId].ownerAddress == ownerAddress,
            "Paying to wrong owner"
        );
        //decrease the tenure
        agreementList[agreementId].tenure =
            agreementList[agreementId].tenure -
            1;
        agreementList[agreementId].lastRentPaid = block.timestamp;

        emit RentPaid(
            ownerAddress,
            tenantAddress,
            monthlyRent,
            block.timestamp,
            agreementId
        );

        if (agreementList[agreementId].tenure == 0) {
            // paid the required time of payment
            emit TenureCompleted(
                agreementId,
                ownerAddress,
                tenantAddress,
                agreementList[agreementId].securityDeposit,
                false
            );
        }
    }

    function cancelAgreement(uint256 agreementId) public {
         require(agreementList[agreementId].isActive, "The agreement already processed");
         agreementList[agreementId].isActive = false;
         uint256 securityDeposit = agreementList[agreementId].securityDeposit;
         //mint the same amount to the ownner address
    }

    function initializeReputation(address user) public {
        if (reputationList[user].length == 0) reputationList[user].push(600);
    }

    function getReputation(address user) public returns (uint256) {
        initializeReputation(user);
        uint256 num = reputationList[user].length;
        return reputationList[user][num - 1];
    }

    function getCurrentTimeStamp() public view returns (uint256) {
        return block.timestamp;
    }
}
