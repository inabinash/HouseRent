import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import {
  useAgreementsOfOwner,
  useTransactionsOfOwner,
} from "./useContract/readContract";
import {
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { TransactionsTable } from "./components/TransactionComp";
import AgreementTable from "./components/AggrementComp";
import CreateAgreementDialog from "./components/CreateAgrement";
import { getAccounts, getContract } from "./ethersRPC";
import { createAgreement } from "./useContract/writeContract";

const Owner = () => {
  const [contract, setContract] = useState(null);
  const [user, setUser] = useState({ address: "" });

  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showCreateAgreement, setShowCreateAgreement] = useState(false);

  const handleAgreementClick = (agreementId) => {
    const agreementTransactions = transactionsData.filter(
      (transaction) => transaction.agreementId === agreementId
    );
    setSelectedAgreement(agreementTransactions);
    setShowTransactions(true);
  };

  const handleBackClick = () => {
    setShowTransactions(false);
    setSelectedAgreement(null);
  };

  // Use Custom Hooks
  const {
    data: agreementsData,
    loading: agreementsStatus,
    refetch: refetchAgreements,
  } = useAgreementsOfOwner(user.address);

  const {
    data: transactionsData,
    loading: transactionsStatus,
    refetch: refetchTransactions,
  } = useTransactionsOfOwner(user.address);

  const handleCreateAgreementClick = () => {
    console.log("Create Agreement clicked");
    setShowCreateAgreement(true);
  };


  // Handle Create Agreement
  const handleCreateAgreement = async ({ newAgreement }) => {
    try {
      console.log(newAgreement);
    setShowCreateAgreement(false);
      const res = await createAgreement(
        contract,
        newAgreement.ownerAddress,
        newAgreement.tenantAddress,
        newAgreement.securityDeposit,
        newAgreement.monthlyRent,
        newAgreement.tenureInMonths
      );
      console.log("Agreement created", res);
      await refetchAgreements();
      await refetchTransactions();
    } catch (error) {
      console.error("Error creating agreement:", error);
    }
  };

  const handleCancelCreateAgreement = () => {
    setShowCreateAgreement(false);
  };

  useEffect(() => {
    // fetch the contract and user address
    const fetchContract = async () => {
      const contract = await getContract();
      const accounts = await getAccounts();

      console.log("Accounts:", accounts);
      console.log("Contract:", contract);

      setUser({ address: accounts[0] });
      setContract(contract);
    };

    fetchContract();
  }, []);

  useEffect(() => {
    if (contract && user.address) {
      refetchAgreements();
      refetchTransactions();
    }
  }
  , [contract, user.address]);


  if (agreementsStatus === "loading" || transactionsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (agreementsStatus === "error" || transactionsStatus === "error") {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <Typography variant="h5" className="mb-2">
        Owner Page
      </Typography>
      <Typography>
        Welcome to the Owner section. Here you can manage your properties and
        view tenant information.
      </Typography>

      <CreateAgreementDialog
        onCreate={handleCreateAgreement}
        onCancel={handleCancelCreateAgreement}
        ownerAddress={user.address}
        open={showCreateAgreement}
        handleOpen={() => setShowCreateAgreement(false)}
      />

      {showTransactions ? (
        <>
          <IconButton variant="text" onClick={handleBackClick}>
            <ArrowLeftIcon className="h-6 w-6" />
          </IconButton>
          <TransactionsTable
            ownerAddress={user.address}
            rentPaid={selectedAgreement}
          />
        </>
      ) : (
        <AgreementTable
          agreements={agreementsData}
          onAgreementClick={handleAgreementClick}
          onAgreementCreate={handleCreateAgreementClick}
        />
      )}
    </div>
  );
};

export default Owner;
