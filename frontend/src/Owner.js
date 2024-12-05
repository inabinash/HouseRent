import React from 'react';
import { GetAgreementsOfOwner, GetReputationOfUser } from './useContract/readContract';
import { Card, CardBody, Typography } from "@material-tailwind/react";

const Owner = () => {
//   const { data: agreements, status: agreementsStatus } = GetAgreementsOfOwner();
//   const { data: reputation, status: reputationStatus } = GetReputationOfUser(/* pass contract and user here */);

  const agreements = [
    { id: 1, details: 'Agreement 1' },
    { id: 2, details: 'Agreement 2' },
  ];
    const agreementsStatus = 'success';
    const reputationStatus = 'success';
    const reputation = [];
    

  return (
    <div className="container mx-auto mt-10">
      <Card>
        <CardBody>
          <Typography variant="h5" className="mb-2">
            Owner Page
          </Typography>
          <Typography>
            Welcome to the Owner section. Here you can manage your properties and view tenant information.
          </Typography>
          <Typography variant="h6" className="mt-4">
            Agreements
          </Typography>
          {agreementsStatus === 'loading' ? (
            <Typography>Loading...</Typography>
          ) : (
            <ul>
              {agreements.map((agreement) => (
                <li key={agreement.id}>{agreement.details}</li>
              ))}
            </ul>
          )}
          <Typography variant="h6" className="mt-4">
            Reputation
          </Typography>
          {reputationStatus === 'loading' ? (
            <Typography>Loading...</Typography>
          ) : (
            <div>
              {/* Render reputation graph here */}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Owner;