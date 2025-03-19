import React from 'react';
// import { Navbar, Typography, Button } from "@material-tailwind/react"
import { Navbar, Typography, Button } from "@mui/material";
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
    <div> this is tenat </div>
  );
}

export default Tenant;