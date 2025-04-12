import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAgreementById } from '../useContract/readContract';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';
import ContractContext from '../context/ContractContext';
import Layout from '../layout';
import OwnerAgreementDetails from '../components/OwnerAgreementDetails';
import TenantAgreementDetails from '../components/TenantAgreementPage';

const AgreementPage = () => {
    const { agreementId } = useParams();
    const { account } = useContext(ContractContext);
    const navigate = useNavigate();
    const LoadingMessage = "Loading agreement details...";

    // Fetch agreement details using the agreementId
    const { data, isLoading, error } = useQuery({
        queryKey: ['agreement', agreementId],
        queryFn: () => getAgreementById(agreementId), // Replace with the actual function to fetch agreement details
        enabled: !!agreementId, // Only run the query if agreementId is available
    });
    // console.log("data", data);
    // console.log("account", account);
    // Redirect to notFound page if account is neither ownerId nor tenantId
    useEffect(() => {
        if (data && account) {
            const { ownerAddress, tenantAddress } = data.agreements[0];
            // Normalize the strings to lowercase for comparison
            if (
                account !== ownerAddress.trim().toLowerCase() &&
                account.trim().toLowerCase() !== tenantAddress.trim().toLowerCase()
            ) {
                navigate('/notFound'); // Redirect to notFound page
            }
        }
    }, [data, account, navigate]);

    if (isLoading) return <Loader text={LoadingMessage} />;
    if (error) return <div>Error loading agreement details: {error.message}</div>;

    return (
        <Layout>
        { account.trim().toLowerCase() === data.agreements[0].ownerAddress.trim().toLowerCase() ? (
            <OwnerAgreementDetails agreement={data.agreements[0]} />
            // <div>Owner Agreement Details</div>
        ) : (
            <TenantAgreementDetails agreement={data.agreements[0]} />
            // <div>Tenant Agreement Details</div>
        ) }
        {/* <TenantAgreementDetails agreement={data.agreements[0]} /> */}
        </Layout>
    );
};

export default AgreementPage;