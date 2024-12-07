import React from 'react';
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const Tenant = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/');
  };

  const handleOwnerClick = () => {
    navigate('/owner');
  };

  const handleTenantClick = () => {
    navigate('/tenant');
  };

  return (
    <Navbar className="mx-auto px-4 py-2 bg-blue-500 ">
      <div className="container mx-auto flex justify-between items-center">
        <Typography as="a" href="/" variant="h6" className="text-white">
          HouseRent
        </Typography>
        <div className="flex space-x-4">
          <Button variant="text" className="text-white" onClick={handleDashboardClick}>Dashboard</Button>
          <Button variant="text" className="text-white" onClick={handleOwnerClick}>Owner</Button>
          <Button variant="text" className="text-white" onClick={handleTenantClick}>Tenant</Button>
        </div>
      </div>
    </Navbar>
  );
}

export default Tenant;