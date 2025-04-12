import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContractContext from "../context/ContractContext";
import Loader from "../components/Loader"; 

const ConnectWallet = () => {
    const { connectWallet, account } = useContext(ContractContext); // Assuming `account` holds the wallet address
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // State to manage loading

    useEffect(() => {

        if (account) {
            setIsLoading(true); // Show loader
            const timer = setTimeout(() => {
                navigate("/dashboard"); // Navigate after 2 seconds
            }, 2000);

            return () => clearTimeout(timer); // Cleanup timeout on unmount
        }
    }, [account, navigate]);

    if (isLoading) {
        return <Loader text="Loading Login Options..." />;
    }

    return (
        <div style={styles.container}>
            <p style={styles.welcomeText}>Welcome to the Onboarding Page 🎉</p>
            <button style={styles.button} onClick={connectWallet}>Connect Wallet</button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white", // Primary color
    },
    welcomeText: {
        fontSize: "2rem", // Increased font size
        color: "black", // Changed text color to black
        marginBottom: "20px",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "blue", // Button background color
        color: "white", // Button text color
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        fontSize: "1rem",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
    },
};

export default ConnectWallet;