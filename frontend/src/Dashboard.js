import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography ,Button , CardContent } from '@mui/material';
import Layout from './layout';

const Dashboard = () => {
  const navigate = useNavigate();
  const handleOwnerClick = () => {
    navigate('/owner');
  };
  const handleTenantClick = () => {
    navigate('/tenant');
  };
  return (
    <Layout>
      <Card>
        <CardContent>
          <div className="text-3xl font-bold mb-2">
            Dashboard
          </div>
          <div>
            Welcome to the Dashboard. Here you can find an overview of your activities.
          </div>
          <div>
            <Button onClick={handleOwnerClick}>I am a Owner</Button>
            <Button onClick={handleTenantClick}>I am a Tenant</Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Dashboard;