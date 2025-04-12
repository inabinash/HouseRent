import { Card, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React from 'react';

const OwnerAgreementDetails = ({ agreement }) => {
    return (
        <Card className="p-4 mt-4 max-w-sm mx-auto">
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
                            <TableCell>{agreement.tenant}</TableCell>
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
                            <TableCell>{agreement.isActive ? "Active" : "Inactive"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default OwnerAgreementDetails;