// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";


contract HouseRent {
    uint256 counter;
    IERC20 public usdtToken;
    AggregatorV3Interface internal priceFeed; // ETH -> USDT


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
        address tenantAddress,
        uint256 refundAmount,
        bool isActive
    );
    event AgreementCancelled(
        uint256 agreementId,
        address ownerAddress,
        address tenantAddress,
        uint256 securityDeposit,
        bool isActive
    );

    mapping(address => uint256[]) reputationList; //tenantAddress->(chnage of reputations) most recent will be the last
    mapping(uint256 => Agreement) agreementList;

     constructor(address _usdtTokenAddress , address _priceFeedAddress) {
        usdtToken = IERC20(_usdtTokenAddress); // Set the USDT token contract address
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
        counter = 0;
    }
    
    //get the 1 ETH value in USDT
    function getLatestPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price; 
    }

    function getSecurityDepositInUSDT(uint256 _agreementId) public view returns (uint256) {
        Agreement storage agreement = agreementList[_agreementId];
        int256 price = getLatestPrice();
        require(price > 0, "Invalid price data");

        // Convert USDT deposit to USD
        uint256 depositInUSD = (agreement.securityDeposit * uint256(price)) / 1e8; // Adjust for decimals
        return depositInUSD;
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
        // mint the security deposit to owner address
        usdtToken.transferFrom(msg.sender, address(this), getSecurityDepositInUSDT(securityDeposit));

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
            // transfer the tokens to the tenant 
            usdtToken.transfer(tenantAddress, getSecurityDepositInUSDT(agreementList[agreementId].securityDeposit));
        }
    }

    function cancelAgreement(uint256 agreementId) public {
         Agreement storage agreement = agreementList[agreementId];

         require(agreement.isActive, "The agreement already processed");
         
         agreement.isActive = false;

         //mint the same amount to the ownner address
        usdtToken.transfer(agreement.ownerAddress, getSecurityDepositInUSDT(agreement.securityDeposit));
        
         emit AgreementCancelled(agreementId, agreement.ownerAddress, agreement.tenantAddress, agreement.securityDeposit, false);
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
