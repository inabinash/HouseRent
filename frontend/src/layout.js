import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "./Navbar";
import ContractContext from "./context/ContractContext";
import Loader from "./components/Loader";

const Layout = ({ children }) => {
    const { account } = useContext(ContractContext); // Get account from context
    const navigate = useNavigate();

    useEffect(() => {
        if (!account || +account === 0) {
            navigate("/"); // Redirect to home page if no account is found
        }
    }, [account, navigate]);

    if (!account) {
        return <Loader text="Checking valid user or not..."/>
    }

    return (
        <div>
            <AppNavbar />
            <div className="container mx-auto mt-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;