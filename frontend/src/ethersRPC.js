const {ethers} = require('ethers');
const {contractJson} = require("./contracts/HouseRent.json");

const getContract =async ()=>{
    const provider =new  ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log("signer: " , signer)
    const contractAddress = "0x2a6A9c8D95d98EeA7985e959AAAB12e814678706"
    const contractABI=[
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_usdtTokenAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_priceFeedAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "agreementId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "ownerAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "tenantAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "securityDeposit",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            }
          ],
          "name": "AgreementCancelled",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "ownerAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "tenantAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "securityDeposit",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "monthlyRent",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "agreementId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "isSecurityDeposited",
              "type": "bool"
            }
          ],
          "name": "AgreementCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "ownerAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "tenantAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "monthlyRent",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "datePaid",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "agreementId",
              "type": "uint256"
            }
          ],
          "name": "RentPaid",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "ownerAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "tenantAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "securityDeposit",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "datePaid",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "agreementId",
              "type": "uint256"
            }
          ],
          "name": "SecuityDeposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "agreementId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "ownerAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "tenantAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "refundAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            }
          ],
          "name": "TenureCompleted",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "agreementId",
              "type": "uint256"
            }
          ],
          "name": "cancelAgreement",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "ownerAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "tenantAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "securityDeposit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "monthlyRent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tenureInMonths",
              "type": "uint256"
            }
          ],
          "name": "createAgreement",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "ownerAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "tenantAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "securityDeposit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "agreementId",
              "type": "uint256"
            }
          ],
          "name": "depositSecurity",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCurrentTimeStamp",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getLatestPrice",
          "outputs": [
            {
              "internalType": "int256",
              "name": "",
              "type": "int256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getReputation",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getReputationHistory",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_agreementId",
              "type": "uint256"
            }
          ],
          "name": "getSecurityDepositInUSDT",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "initializeReputation",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "ownerAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "tenantAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "monthlyRent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "agreementId",
              "type": "uint256"
            }
          ],
          "name": "payMonthlyRent",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "usdtToken",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    const myContract = new ethers.Contract(contractAddress, contractABI, signer);
    return myContract;
} 
const getChainId = async () => {
    try {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      // Get the connected Chain's ID
      const networkDetails = await ethersProvider.getNetwork();
      console.log("networkDetails:",networkDetails.chainId.toString())
      return networkDetails.chainId.toString();
    } catch (error) {
        console.log("error:",error)
      return error;
    }
  };

  const getAccounts = async () => {
    try {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await ethersProvider.getSigner();
      // Get user's Ethereum public address
      const address = await signer.getAddress();

      return address;
    } catch (error) {
      return error;
    }
  };

  const getBalance = async () => {
    try {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await ethersProvider.getSigner();
      // Get user's Ethereum public address
      const address = signer.getAddress();
      // Get user's balance in ether
      const balance = ethers.formatEther(
        await ethersProvider.getBalance(address) // Balance is in wei
      );
      return balance;
    } catch (error) {
      return error;
    }
  };

  const sendTransaction = async () => {
    try {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await ethersProvider.getSigner();
      const destination = '0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56';
      const amount = ethers.parseEther('0.001');
      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: destination,
        value: amount,
        maxPriorityFeePerGas: '5000000000', // Max priority fee per gas
        maxFeePerGas: '6000000000000', // Max fee per gas
      });
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      return error;
    }
  };

  const signMessage = async (provider) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const originalMessage = 'YOUR_MESSAGE';
      // Sign the message
      const signedMessage = await signer.signMessage(originalMessage);
      return signedMessage;
    } catch (error) {
      return error;
    }
  };
export {
    getContract,
    getChainId,
    getAccounts,
    getBalance,
    sendTransaction,
    signMessage,
  };