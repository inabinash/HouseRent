import React, { useState, useEffect } from "react";
import {
  GetAgreementsOfOwner,
  GetReputationOfUser,
} from "./useContract/readContract";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import ChartComponent from "./components/Chart";
import { TransactionsTable } from "./components/TransactionComp";

const Owner = ({ contract, user }) => {
  // const { data: agreements, status: agreementsStatus } = GetAgreementsOfOwner();
  // const [reputation, setReputation] = useState([]);
  const agreements = [
    { id: 1, details: "Agreement 1" },
    { id: 2, details: "Agreement 2" },
  ];
  const agreementsStatus = "success";
  const reputation = [700, 800, 900, 1000, 950, 850, 800, 900, 1000, 950, 850, 800];


  const rentPaids = [
    {
      id: '1',
      ownerAddress: '0xOwnerAddress1',
      tenantAddress: '0xTenantAddress1',
      monthlyRent: '1000',
      datePaid: '2023-01-01',
      agreementId: 'A1',
      blockTimestamp: '1672531199',
    },
    {
      id: '2',
      ownerAddress: '0xOwnerAddress2',
      tenantAddress: '0xTenantAddress2',
      monthlyRent: '1200',
      datePaid: '2023-02-01',
      agreementId: 'A2',
      blockTimestamp: '1675209599',
    },
  ];

  const tenureCompleteds = [
    {
      id: '1',
      ownerAddress: '0xOwnerAddress1',
      tenantAddress: '0xTenantAddress1',
      refundAmount: '500',
      datePaid: '2023-03-01',
      agreementId: 'A1',
      blockTimestamp: '1677628799',
    },
    {
      id: '2',
      ownerAddress: '0xOwnerAddress2',
      tenantAddress: '0xTenantAddress2',
      refundAmount: '600',
      datePaid: '2023-04-01',
      agreementId: 'A2',
      blockTimestamp: '1680307199',
    },
  ];



  // useEffect(() => {
  //   const fetchReputation = async () => {
      // const reputationData = await GetReputationOfUser(contract, user);
      // setReputation(reputationData);
      // 0-1000
  //     setReputation([700, 800, 900, 1000, 950, 850, 800, 900, 1000, 950, 850, 800]);
  //   };

  //   fetchReputation();
  // }, [contract, user]);

  return (
    <div className="container mx-auto mt-10">
      <Card>
        <CardBody>
          <Typography variant="h5" className="mb-2">
            Owner Page
          </Typography>
          <Typography>
            Welcome to the Owner section. Here you can manage your properties
            and view tenant information.
          </Typography>
          <Typography variant="h6" className="mt-4">
            Agreements
          </Typography>

          {agreementsStatus === "loading" ? (
            <Typography>Loading...</Typography>
          ) : (
            <ul>
              {agreements.map((agreement) => (
                <li key={agreement.id}>{agreement.details}</li>
              ))}
            </ul>
          )}

          <TransactionsTable ownerAddress={"asfdadsf"} rentPaid={rentPaids} tenureCompleteds={tenureCompleteds} />

          <Typography variant="h6" className="mt-4">
            Reputation
          </Typography>

          <div>
            <ChartComponent
              title="Owner Reputation"
              description="Reputation over time"
              seriesName={"Reputation"}
              chartData={reputation}
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
        </CardBody>
      </Card>
    </div>
  );
};

export default Owner;
