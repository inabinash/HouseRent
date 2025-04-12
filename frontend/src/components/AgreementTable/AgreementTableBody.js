import {IconButton, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import ContractContext from '../../context/ContractContext';
import Loader from '../Loader';
import { useQuery } from '@tanstack/react-query';
import { getAgreementsOfOwner, getAgreementsOfTenant } from '../../useContract/readContract';
import { EyeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
const transformAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
}
const AgreementTableBody = ({ userType }) => {
    const { account} = useContext(ContractContext);
    const navigate=useNavigate();
    const viewClickHandler = (agreementId) =>{
       return  ()=>navigate(`/agreement/${agreementId}`);
    };
    //transform accound to 0Xaaa...aaa form
    const {data , isLoading} = useQuery(
    { 
    queryKey: ["agreements" , account],
    queryFn: ()=>(userType==="owner"?getAgreementsOfOwner(account):getAgreementsOfTenant(account)),
    enabled: !!account, // Only run the query if the account is available
    });
    if(isLoading)return <Loader text="Loading agreements..."/>;
    console.log("agreements", data);
    return(
        <TableBody>
            {data.agreements.map((agreement, index) => (
                <TableRow key={index}>
                    <TableCell>{agreement.id}</TableCell>
                    <TableCell>{transformAddress(userType === "owner" ? agreement.tenantAddress : agreement.ownerAddress)}</TableCell>
                    <TableCell>{agreement.securityDeposit}</TableCell>
                    <TableCell>{agreement.monthlyRent}</TableCell>
                    <TableCell>{agreement.tenureMonths}</TableCell>
                    <TableCell>{agreement.agreementId}</TableCell>
                    <TableCell>{agreement.isActive ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                            <IconButton onClick={viewClickHandler(agreement.agreementId)}>
                                <EyeIcon className='h-4 w-4'/>
                            </IconButton>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}
export default AgreementTableBody;