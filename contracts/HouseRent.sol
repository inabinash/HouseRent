// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/access/Ownable.sol";

contract HouseRent {


    struct Agreement {
        uint256 agreementId;
        address ownerAddress;
        address tenantAddress;
        uint256 securityDeposit;
        uint256 monthlyRent;
        uint256 startTime;
        uint256 endTime;
    }

    struct Owner{
        address ownerAddress;
        Agreement[] agreementList;
    }

    struct Tenant{
        address tenantAddress;
        uint256 reputationScore ;
        Agreement[] agreementList;
    }

    event AgreementCreated(address ownerAddress,address tenantAddress,uint256 securityDeposit,uint256 monthlyRent,uint256 startTime,uint256 endTime, uint256 agreementId);
    event SecuityDeposited(address ownerAddress,address tenantAddress,uint256 completionTime , uint256 agreementId);
    event RentPaid(address ownerAddress,address tenantAddress,uint256 datePaid , uint256 AgreementId);
    event TenureCompleted(uint256 agreementId , address ownerAddress , address tenatAddress,uint256 refundAmount);

    

}