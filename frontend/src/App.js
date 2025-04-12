import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Owner from './Owner';
import Tenant from './Tenant';
import { useContext } from 'react';
import ContractContext from './context/ContractContext';
import AgreementPage from './pages/AgreementPage';
import ConnectWallet from './pages/connectWallet';
import NotFound from './pages/notFound';

function App() {
  const { connectWallet } = useContext(ContractContext);
  useEffect(()=>{
    connectWallet();
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/agreement/:agreementId" element={<AgreementPage />} />
        <Route path="/notFound" element={<NotFound/>} />
        //set default route to not Found
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;

