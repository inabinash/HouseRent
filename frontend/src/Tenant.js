import React from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import {
  GetAgreementsOfTentat,
  GetReputationOfUser,
} from "./useContract/readContract";
import ChartComponent from "./components/Chart";

const Tenant = () => {
  // const { data: agreements, status: agreementsStatus } = GetAgreementsOfTentat();
  // const { data: reputation, status: reputationStatus } = GetReputationOfUser(/* pass contract and user here */);
  const agreements = [
    { id: 1, details: "Agreement 1" },
    { id: 2, details: "Agreement 2" },
  ];
  const agreementsStatus = "success";
  const reputationStatus = "success";

  const reputation = [
    700, 800, 900, 1000, 950, 850, 800, 900, 1000, 950, 850, 800,
  ];

  const handlePayNow = (agreementId) => {
    // Implement payment logic here
  };

  return (
    <div className="container mx-auto mt-10">
      <Card>
        <CardBody>
          <Typography variant="h5" className="mb-2">
            Tenant Page
          </Typography>
          <Typography variant="h6" className="mt-4">
            Agreements
          </Typography>
          {agreementsStatus === "loading" ? (
            <Typography>Loading...</Typography>
          ) : (
            <ul>
              {agreements.map((agreement) => (
                <li key={agreement.id} className="mb-2">
                  {agreement.details}
                  <Button
                    onClick={() => handlePayNow(agreement.id)}
                    className="ml-2"
                  >
                    Pay Now
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Typography variant="h6" className="mt-4">
            Reputation
          </Typography>
          {reputationStatus === "loading" ? (
            <Typography>Loading...</Typography>
          ) : (
            <div>
              {/* Render reputation graph here */}
              <>
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
              </>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Tenant;
