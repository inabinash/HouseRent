import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectCryptoModal from './components/ConnectWallet';
import { useContext } from 'react';
import ContractContext from './context/ContractContext';
import { Card, Typography ,Button , CardContent } from '@mui/material';

const Dashboard = () => {
  const { connectWallet } = useContext(ContractContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOwnerClick = () => {
    navigate('/owner');
  };

  const handleTenantClick = () => {
    navigate('/tenant');

  };

 

  return (
    <div className="container mx-auto mt-10">
      {/* <ConnectCryptoModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} /> */}
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>

      
    </div>
  );
};

export default Dashboard;