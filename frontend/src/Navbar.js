
import React from 'react';
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar className="mx-auto px-4 py-2 bg-blue-500 ">
      <div className="container mx-auto flex justify-between items-center">
        <Typography as="a" href="/" variant="h6" className="text-white">
          HouseRent
        </Typography>
        <div className="flex space-x-4">
            <Button variant="text" className="text-white">Dashboard</Button>
            <Button variant="text" className="text-white">Owner</Button>
            <Button variant="text" className="text-white">Tenant</Button>
        </div>
      </div>
    </Navbar>
  );
}

export default AppNavbar;