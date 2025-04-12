import React, { useContext } from 'react';
import ContractContext from './context/ContractContext';
import { fontWeight } from '@mui/system';

const AppNavbar = () => {
  const { account } = useContext(ContractContext); // Get the account ID from context

  // Function to shorten the account string
  const shortenAccount = (account) => {
    if (!account) return undefined; // Return empty string if account is not available 
    return `${account.slice(0, 5)}...${account.slice(-3)}`; // Shorten to 0x34c...1d3 format
  };

  return (
    <div style={styles.navbar}>
      <p style={styles.logo}>House<span style={{color:"blue"}}>Rent</span></p>
      {account?<p style={styles.greeting}>Hi,
        {' '} {shortenAccount(account)}</p>:null}
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'white', // White background
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'black',
    cursor: 'pointer',
  },
  greeting: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333',
  },
};

export default AppNavbar;