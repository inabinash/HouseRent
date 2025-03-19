// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract HouseRent {
    uint256 counter;
    IERC20 public usdtToken;
    AggregatorV3Interface internal priceFeed; // ETH -> USDT
    uint MONTH_TIME = 30 * 24 * 60 * 60;
    uint DAY_TIME = 24 * 60 * 60;

    struct Agreement {
        uint256 agreementId;
        address ownerAddress;
        address tenantAddress;
        uint256 securityDeposit;
        uint256 monthlyRent;
        uint256 startTime;
        uint256 endTime;
        uint256 tenure;
        uint256 lastRentPaid; // keeps track of time of last rent payment
        bool isActive; //0--> Inactive , 1-->Active
        bool isSecurityDeposited; //0->not deposited, 1-> depoited
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
        address indexed ownerAddress,
        address indexed tenantAddress,
        uint256 securityDeposit,
        uint256 monthlyRent,
        uint256 startTime,
        uint256 endTime,
        uint256 indexed agreementId,
        bool isActive,
        bool isSecurityDeposited
    );
    event SecuityDeposited(
        address indexed ownerAddress,
        address indexed tenantAddress,
        uint256 securityDeposit,
        uint256 datePaid,
        uint256 indexed agreementId
    );
    event RentPaid(
        address indexed ownerAddress,
        address indexed tenantAddress,
        uint monthlyRent,
        uint256 datePaid,
        uint256 indexed agreementId
    );
    event TenureCompleted(
        uint256 indexed agreementId,
        address ownerAddress,
        address tenantAddress,
        uint256 refundAmount,
        bool isActive
    );
    event AgreementCancelled(
        uint256 indexed agreementId,
        address ownerAddress,
        address tenantAddress,
        uint256 securityDeposit,
        bool isActive
    );

    event LogPrice(int256 price);
    event LogDeposit(uint256 deposit);

    mapping(address => uint256[]) reputationList; //tenantAddress->(chnage of reputations) most recent will be the last
    mapping(uint256 => Agreement) agreementList;

    constructor(address _usdtTokenAddress) {
        usdtToken = IERC20(_usdtTokenAddress); // Set the USDT token contract address
        priceFeed = AggregatorV3Interface(
            0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1
        ); // base to eth sepolia testnet
        counter = 0;
    }

    //get the 1 ETH value in USDT
    function getLatestPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    function getSecurityDepositInUSDT(
        uint256 _agreementId
    ) public  returns (uint256) {
        Agreement storage agreement = agreementList[_agreementId];
        int256 price = getLatestPrice();
        emit LogPrice(price);

        require(price > 0, "Invalid price data");

        // Convert USDT deposit to USD
        uint256 depositInUSDT = (agreement.securityDeposit * uint256(price)) /
            1e9; // Adjust for decimals
        return depositInUSDT;
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

        uint256 startTime = block.timestamp;
        uint256 endTime = block.timestamp + tenureInMonths * MONTH_TIME;

        agreementList[counter] = Agreement({
            agreementId: counter,
            ownerAddress: ownerAddress,
            tenantAddress: tenantAddress,
            securityDeposit: securityDeposit,
            monthlyRent: monthlyRent,
            startTime: startTime,
            endTime: endTime,
            tenure: tenureInMonths,
            lastRentPaid: startTime,
            isActive: true,
            isSecurityDeposited: false
        });

        emit AgreementCreated(
            ownerAddress,
            tenantAddress,
            securityDeposit,
            monthlyRent,
            startTime,
            tenureInMonths,
            counter,
            true,
            false
        );
        counter += 1;
    }
    // must ensure that the tenant has approved the contract to spend the USDT
    function depositSecurity(uint256 agreementId) public payable {
        address ownerAddress = agreementList[agreementId].ownerAddress;
        address tenantAddress = agreementList[agreementId].tenantAddress;
        uint256 securityDeposit = agreementList[agreementId].securityDeposit;

        require(ownerAddress != address(0), "ownerAddress must be non-zero");
        require(tenantAddress != address(0), "tenantAddress must be non-zero");
        require(
            tenantAddress == msg.sender,
            "Security should be deposited by tenant only"
        );

        // mint the security deposit to owner address

        uint256 amountInUSDT = getSecurityDepositInUSDT(agreementId);

        require(
            usdtToken.balanceOf(msg.sender) >= amountInUSDT,
            "Insufficient balance"
        );
        require(
            usdtToken.allowance(msg.sender, address(this)) >= amountInUSDT,
            "Insufficient allowance"
        );
        emit LogDeposit(amountInUSDT);
        require(
            usdtToken.transferFrom(
                msg.sender, // transfer from tenant to contract
                address(this), // transfer from tenant to contract
                amountInUSDT
            ),
            "Security deposit transfer failed"
        );

        agreementList[agreementId].isSecurityDeposited = true;
        emit SecuityDeposited(
            ownerAddress,
            tenantAddress,
            securityDeposit,
            block.timestamp,
            agreementId
        );
    }

    function payMonthlyRent(uint256 agreementId) public payable {
        address ownerAddress = agreementList[agreementId].ownerAddress;
        address tenantAddress = agreementList[agreementId].tenantAddress;
        uint256 monthlyRent = agreementList[agreementId].monthlyRent;

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
        Agreement storage agreement = agreementList[agreementId];
        uint currMonth = ((agreement.endTime - agreement.startTime) /
            (MONTH_TIME)) - agreement.tenure;

        // check if rent is paid in time and update the reputation accordingly
        uint currRepuatation = getReputation(agreement.tenantAddress);
        if (
            block.timestamp >
            agreement.startTime + currMonth * MONTH_TIME + 5 * DAY_TIME
        ) {
            reputationList[agreement.tenantAddress].push(
                currRepuatation - (1000 - currRepuatation) / 10
            );
        } else {
            reputationList[agreement.tenantAddress].push(
                currRepuatation + (1000 - currRepuatation) / 20
            );
        }

        agreementList[agreementId].tenure = agreement.tenure - 1;
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
    
            agreementList[agreementId].isActive = false;
            uint256 refundAmount = getSecurityDepositInUSDT(agreement.agreementId);
            require(
                refundAmount <= usdtToken.balanceOf(address(this)),
                "Insufficient balance"
            );

            // transfer the tokens to the tenant when the tenure is completed
            require(
                usdtToken.transfer(tenantAddress, refundAmount),
                "Security deposit transfer failed"
            );
        }
    }

    function cancelAgreement(uint256 agreementId) public {
        Agreement storage agreement = agreementList[agreementId];

        require(agreement.isActive, "The agreement already processed");

        agreementList[agreementId].isActive = false;
        if(agreement.isSecurityDeposited){
        //mint the same amount to the ownner address
        uint256 refundAmount = getSecurityDepositInUSDT(agreement.agreementId);
            require(
                refundAmount <= usdtToken.balanceOf(address(this)),
                "Insufficient balance"
            );

            // transfer the tokens to the tenant when the tenure is completed
            require(
                usdtToken.transfer(agreement.ownerAddress, refundAmount),
                "Security deposit transfer failed"
            );
        }
        
        

        emit AgreementCancelled(
            agreementId,
            agreement.ownerAddress,
            agreement.tenantAddress,
            agreement.securityDeposit,
            false
        );
    }

    function initializeReputation(address user) public {
        if (reputationList[user].length == 0) reputationList[user].push(600);
    }

    function getReputation(address user) public returns (uint256) {
        initializeReputation(user);
        uint256 num = reputationList[user].length;
        return reputationList[user][num - 1];
    }

    function getReputationHistory(
        address user
    ) public view returns (uint256[] memory) {
        return reputationList[user];
    }

    function getCurrentTimeStamp() public view returns (uint256) {
        return block.timestamp;
    }
}

