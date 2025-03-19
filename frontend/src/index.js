import React from "react";
import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ContractProvider from "./context/ContractProvider";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css"; // Ensure this
import App from "./App";
// import { AgreementsProvider } from "./useContract/readContract";

// export default function App() {
//   // const provider = new ethers.providers.JsonRpcProvider(
//   //   "https://base-sepolia.g.alchemy.com/v2/iuW6NKZN6fr2fPFAEh4EqR5dVl7jtNaI"
//   // );

//   const [currAccount, setCurrentAccount] = useState("");
//   const [contract, setContract] = useState();

//   useEffect(()=>{
//     getAccounts();
//     getContract();
//   },[])

//   async function getContract(){
//     const provider = new ethers.providers.BrowserProvider(window.ethereum);
//     const contractABI = HouseRent.abi;
//     const contractAddress = "0x2a6A9c8D95d98EeA7985e959AAAB12e814678706";
//     await provider.send("eth_requestAccounts", []);
//     const signer = await provider.getSigner();
//     console.log(signer);
//     const contractInstance = new ethers.Contract(
//       contractAddress,
//       contractABI,
//       signer
//     );
//     setContract(contractInstance);
//   }

//   async function getAccounts() {
//     const { ethereum } = window;
//     const accounts = await ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     if (accounts.length) setCurrentAccount(accounts[0]);
//     console.log("Accounts :", accounts);
//   }

//   const handleCreateAgreement = () => {
//     createAgreement(contract, currAccount,currAccount,currAccount,100,100,2);
//   };

//   return (
//     <>
//       {/* <button onClick={getAccounts}>Get Accounts</button> */}
//       <button onClick={handleCreateAgreement}>Create Agreement</button>
//     </>
//   );
// }
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
    
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider>
//         {/* <AgreementsProvider> */}
//           <App />
//         {/* </AgreementsProvider> */}
//       </ThemeProvider>
//     </QueryClientProvider>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<ContractProvider>

      <App />
</ContractProvider>
  </React.StrictMode>
);