import { Button, Card, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAgreementOfTenantById } from "../useContract/readContract";
import Loader from "./Loader";

const TenantAgreementDetails = ({ agreement }) => {
    const {tenantAddress, agreementId} = agreement;
    const { data, isLoading, error } = useQuery({
        queryKey: ['agreementDetails', tenantAddress, agreementId],
        queryFn: () => getAgreementOfTenantById(tenantAddress, agreementId),
        enabled: !!tenantAddress && !!agreementId, 
    });
    if (isLoading) return <Loader text="Loading agreement details..." />;
    const {isSecurityDeposited}=data.agreements[0];
  return (
    <Card className="p-4 mt-4 max-w-md mx-auto">
      <div className="text-3xl font-bold mb-4 text-center">
        Agreement Details
      </div>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Agreement ID</TableCell>
              <TableCell>{agreement.agreementId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Tenant Address</TableCell>
              <TableCell>{agreement.tenantAddress}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Security Deposit</TableCell>
              <TableCell>{agreement.securityDeposit}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Monthly Rent</TableCell>
              <TableCell>{agreement.monthlyRent}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Tenure (Months)</TableCell>
              <TableCell>{agreement.tenure}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Status</TableCell>
              <TableCell>
                {agreement.isActive ? "Active" : "Inactive"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="display flex justify-between mt-4">
        {!isSecurityDeposited ? (
          <Button variant="contained" color="primary">
            Pay Security Deposit
          </Button>
        ) : (
          <h1>No need to worry</h1>
        )}
      </div>
    </Card>
  );
};
export default TenantAgreementDetails;
