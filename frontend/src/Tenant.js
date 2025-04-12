import React from 'react';
import Layout from './layout';
import AgreementTable from './components/AgreementTable/AgreementTable';

const Tenant = () => {
  return (
    <Layout>
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold">Tenant Dashboard</h1>
        <p>Welcome to the Tenant Dashboard. Here you can manage your rental agreements.</p>
        <AgreementTable userType={'tenant'}/>  
      </div>
    </Layout>
  );
};

export default Tenant;