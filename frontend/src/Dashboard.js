import React, { useState } from 'react';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import ConnectCryptoModal from './components/ConnectWallet';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOwnerClick = () => {
    navigate('/owner');
  };

  const handleTenantClick = () => {
    navigate('/tenant');
  };

  const connectWallet = () => {
    // Implement wallet connection logic here
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto mt-10">
      <ConnectCryptoModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
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