import { TableHead, TableRow, TableCell } from '@mui/material';
import React from 'react';

const AgreementTableHeader = ({ userType }) => {
    const TABLE_HEAD = userType === "owner"
        ? [
            "ID",
            "Tenant Address",
            "Security Deposit",
            "Monthly Rent",
            "Tenure (Months)",
            "Agreement ID",
            "Is Active",
            "View",
        ]
        : [
            "ID",
            "Owner Address",
            "Security Deposit",
            "Monthly Rent",
            "Tenure (Months)",
            "Agreement ID",
            "Is Active",
            "View",
        ];

    return (
        <TableHead>
            <TableRow>
                {TABLE_HEAD.map((head, index) => (
                    <TableCell key={index} align="left">
                        {head}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default AgreementTableHeader;