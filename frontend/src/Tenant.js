import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Button, IconButton } from "@material-tailwind/react";
import {
  GetAgreementsOfTentat,
  GetReputationOfUser,
  GetTransactionsOfTentant,
} from "./useContract/readContract";
// import { paySecurityDeposit, payRent } from "./useContract/writeContract";
import ChartComponent from "./components/Chart";
import { getAccounts, getContract } from "./ethersRPC";
import AgreementTable from "./components/AggrementComp";
import { TransactionsTable } from "./components/TransactionComp";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { depositSecuirty, payMonthlyRent } from "./useContract/writeContract";

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
    isSecurityDeposited: false,
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
    isSecurityDeposited: true,
  },
];

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

const TABLE_HEAD = [
  "ID",
  "Owner Address",
  "Tenant Address",
  "Security Deposit",
  "Monthly Rent",
  "Tenure (Months)",
  "Agreement ID",
  "Is Active",
  "Pay Security Deposit",
  "",
];
const Tenant = () => {
  const [agreements, setAgreements] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reputation, setReputation] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [showTransactions, setShowTransactions] = useState(false);

  const reputationDummy = [
    700, 800, 900, 1000, 950, 850, 800, 900, 1000, 950, 850, 800,
  ];

  const fetchAgreements = async () => {
    const account = await getAccounts();
    const contract = await getContract();
    const agreements = GetAgreementsOfTentat(account);
    setAgreements(agreements.data);

    const transactions = GetTransactionsOfTentant(account);
    setTransactions(transactions.data);

    const reputation = GetReputationOfUser(contract, account);
    setReputation(reputation);
  };

  const handleAgreementClick = (agreementId) => {
    const agreementTransactions = rentPaids.filter(
      (transaction) => transaction.agreementId === agreementId
    );
    setSelectedAgreement(agreementTransactions);
    setShowTransactions(true);
  };

  const handleBackClick = () => {
    setSelectedAgreement(null);
    setShowTransactions(false);
  };

  const handlePaySecurityDeposit = async (agreementId) => {
    const account = await getAccounts();
    const contract = await getContract();
    const agreement = agreements.find((a) => a.agreementId === agreementId);
    const res = await depositSecuirty(
      contract,
      account,
      agreement.ownerAddress,
      agreement.tenantAddress,
      agreement.securityDeposit,
      agreement.agreementId
    );

    if (res) {
      alert("Security Deposit Paid Successfully");
    }
    // Refresh the agreements list
    fetchAgreements();
  };

  const handlePayRent = async (agreementId) => {
    const account = await getAccounts();
    const contract = await getContract();
    const agreement = agreements.find((a) => a.agreementId === agreementId);
    // await payRent(account, agreementId, agreement.monthlyRent);
    const res = await payMonthlyRent(
      contract,
      account,
      agreement.ownerAddress,
      agreement.tenantAddress,
      agreement.monthlyRent,
      agreement.agreementId
    );

    if (res) {
      alert("Rent Paid Successfully");
    }

    // Refresh the agreements list
    fetchAgreements();
  };

  useEffect(() => {
    setAgreements(dummyAgreementsT);
    setTransactions(rentPaids);

    fetchAgreements();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <Typography variant="h5" className="mb-2">
        Tenant Page
      </Typography>
      <Typography variant="h6" className="mt-4">
        Agreements
      </Typography>

      {!showTransactions && (
        <AgreementTable
          agreements={agreements}
          onPaySecurityDeposit={handlePaySecurityDeposit}
          tableHead={TABLE_HEAD}
          onAgreementClick={handleAgreementClick}
          onAgreementCreate={() => {}}
          isTenant
          />
        )}

      {showTransactions && (
        <>
          <IconButton variant="text" onClick={handleBackClick}>
            <ArrowLeftIcon className="h-6 w-6" />
          </IconButton>
          <TransactionsTable
            rentPaid={transactions}
            tenureCompleteds={transactions}
            onPayNow={handlePayRent}
            isTenant
          />
        </>
      )}

      <Typography variant="h6" className="mt-4">
        Reputation
      </Typography>
      <div>
        <div>
          <ChartComponent
            title="Owner Reputation"
            description="Reputation over time"
            seriesName={"Reputation"}
            chartData={reputationDummy}
            categories={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Tenant;
