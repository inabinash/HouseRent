import React , {useEffect, useState} from 'react';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { getAccounts, getChainId, getContract } from './ethersRPC';
import { createAgreement } from './useContract/writeContract';
// import { useHistory } from 'react-router-dom';

const Dashboard = () => {
//   const history = useHistory();
  // const [Contract , setContract] = useState("");
  // const [currAccount , setCurrentAccount] =useState();
  

  const handleOwnerClick = async () => {
    // history.push('/owner');
    getChainId();
    const Contract= await getContract();
    const account =await getAccounts();
    console.log(Contract,account);
    createAgreement(Contract,account,account,1,1,1);
    // Contract
    

  };

  const handleTenantClick = () => {
    // history.push('/tenant');
  };

  const connectWallet = () => {
    // Implement wallet connection logic here
  };

  return (
    <div className="container mx-auto mt-10">
      <Card>
        <CardBody>
          <Typography variant="h5" className="mb-2">
            Dashboard
          </Typography>
          <Typography>
            Welcome to the Dashboard. Here you can find an overview of your activities.
          </Typography>
          <div className="mt-4">
            <Button onClick={connectWallet} className="mr-2">Connect Wallet</Button>
            <Button onClick={handleOwnerClick} className="mr-2">I am an Owner</Button>
            <Button onClick={handleTenantClick}>I am a Tenant</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;