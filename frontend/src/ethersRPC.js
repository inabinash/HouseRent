const {ethers} = require('ethers');
const contractJson = require("./contracts/HouseRent.json");

const getContract =async ()=>{
    const provider =new  ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log("signer: " , signer)
    const contractAddress = "0x1f4282202d08f2a6d64691340c227b90c5a5c931"
    const contractABI=contractJson.abi;
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