import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import {
  GetAgreementsOfOwner,
  GetReputationOfUser,
  GetTransactionsOfOwner,
} from "./useContract/readContract";
import {
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import ChartComponent from "./components/Chart";
import { TransactionsTable } from "./components/TransactionComp";
import AgreementTable from "./components/AggrementComp";
import CreateAgreementDialog from "./components/CreateAgrement";
import { getAccounts, getContract } from "./ethersRPC";
import { createAgreement } from "./useContract/writeContract";

const Owner = () => {
  const [agreements, setAgreements] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [ownerAddress, setOwnerAddress] = useState(null);

  const dummyAgreementsT = [
    {
      id: "1",
      ownerAddress: "0xOwnerAddress1",
      tenantAddress: "0xTenantAddress1",
      securityDeposit: "500",
      monthlyRent: "1000",
      startTime: "2023-01-01",
      endTime: "2023-12-31",
      agreementId: "A1",
      isActive: true,
    },
    {
      id: "2",
      ownerAddress: "0xOwnerAddress2",
      tenantAddress: "0xTenantAddress2",
      securityDeposit: "600",
      monthlyRent: "1200",
      startTime: "2023-02-01",
      endTime: "2023-11-30",
      agreementId: "A2",
      isActive: false,
    },
  ];

  const [dummyAgreements, setDummyAgreements] = useState(dummyAgreementsT);

  const rentPaids = [
    {
      id: "1",
      ownerAddress: "0xOwnerAddress1",
      tenantAddress: "0xTenantAddress1",
      monthlyRent: "1000",
      datePaid: "2023-01-01",
      agreementId: "A1",
      blockTimestamp: "1672531199",
      transaction_type: "Rent Paid",
    },
    {
      id: "2",
      ownerAddress: "0xOwnerAddress2",
      tenantAddress: "0xTenantAddress2",
      monthlyRent: "1200",
      datePaid: "2023-02-01",
      agreementId: "A2",
      blockTimestamp: "1675209599",
      transaction_type: "Security Deposit",
    },
  ];

  const tenureCompleteds = [
    {
      id: "1",
      ownerAddress: "0xOwnerAddress1",
      tenantAddress: "0xTenantAddress1",
      refundAmount: "500",
      datePaid: "2023-03-01",
      agreementId: "A1",
      blockTimestamp: "1677628799",
      transaction_type: "Security Refund",
    },
    {
      id: "2",
      ownerAddress: "0xOwnerAddress2",
      tenantAddress: "0xTenantAddress2",
      refundAmount: "600",
      datePaid: "2023-04-01",
      agreementId: "A2",
      blockTimestamp: "1680307199",
      transaction_type: "Security Refund",
    },
  ];

  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showCreateAgreement, setShowCreateAgreement] = useState(false);

  const handleAgreementClick = (agreementId) => {
    const agreementTransactions = rentPaids.filter(
      (transaction) => transaction.agreementId === agreementId
    );
    setSelectedAgreement(agreementTransactions);
    setShowTransactions(true);
  };

  const handleBackClick = () => {
    setShowTransactions(false);
    setSelectedAgreement(null);
  };

  const handleCreateAgreementClick = () => {
    console.log("Create Agreement clicked");
    setShowCreateAgreement(true);
  };

  const handleCreateAgreement = async (newAgreement) => {
    // Add the new agreement to the list (this should be replaced with actual API call)
    console.log(newAgreement);
    setDummyAgreements([
      ...dummyAgreements,
      {
        ...newAgreement,
        id: dummyAgreements.length + 1,
        agreementId: `A${dummyAgreements.length + 1}`,
        isActive: true,
      },
    ]);
    setShowCreateAgreement(false);

    // Call the API to create the agreement
    const account = await getAccounts();
    const contract = await getContract();
    console.log(contract);
    console.log("account");
    console.log(account);
    const res = await createAgreement(
      contract,
      account,
      newAgreement.tenantAddress,
      newAgreement.securityDeposit,
      newAgreement.monthlyRent,
      newAgreement.tenureInMonths
    );

    console.log("Agreement created", res);

    // Refresh the agreements list
    const { data: agreements, status } = GetAgreementsOfOwner(account);
    setAgreements(agreements);
  };

  const handleCancelCreateAgreement = () => {
    setShowCreateAgreement(false);
  };

  useEffect(() => {
    const fetchAgreements = async () => {
      const account = await getAccounts();
      const { data: agreements, status } = GetAgreementsOfOwner(account);
      setAgreements(agreements);

      const { data: transactions, status: status2 } =
        GetTransactionsOfOwner(account);
      setTransactions(transactions);
    };
    fetchAgreements();
  }, []);

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
        ownerAddress={ownerAddress}
        open={showCreateAgreement}
        handleOpen={() => setShowCreateAgreement(false)}
      />

      {showTransactions ? (
        <>
          <IconButton variant="text" onClick={handleBackClick}>
            <ArrowLeftIcon className="h-6 w-6" />
          </IconButton>
          <TransactionsTable
            ownerAddress={"asfdadsf"}
            rentPaid={selectedAgreement}
            tenureCompleteds={tenureCompleteds.filter(
              (transaction) =>
                transaction.agreementId === selectedAgreement[0].agreementId
            )}
          />
        </>
      ) : (
        <AgreementTable
          agreements={dummyAgreements}
          onAgreementClick={handleAgreementClick}
          onAgreementCreate={handleCreateAgreementClick}
        />
      )}
    </div>
  );
};

export default Owner;
