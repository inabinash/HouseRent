import { useState ,useEffect} from "react";
import ContractContext from "./ContractContext";
import { ethers } from "ethers";
import houseContract from "../contracts/HouseRent.json";
import { useNavigate } from "react-router-dom";


const ContractProvider = ({ children }) => {
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    


    const contractABI = houseContract.abi;
    // console.log("contractABI", contractABI);
    const contractAddress = "0x28Bc7B45b1A6f9246503c15FADCca2F391A2c4B9";

    const connectWallet = async () => {
        if(!window.ethereum){
            alert("Install Metamask");
            return;
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        console.log("provider", provider);
        const signer = await provider.getSigner();
        console.log("signer", signer);
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contract);
        console.log("contract", contract);
        const account = await signer.getAddress();
        console.log("account", account);
        setAccount(account);
        
    }
    
    return (
        <ContractContext.Provider value={{ contract, account, connectWallet }}>
        {children}
        </ContractContext.Provider>
    );
}

export default ContractProvider;