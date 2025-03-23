import React, { useState , useContext} from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


import { TransactionsTable } from "./components/TransactionComp";
import AgreementTable from "./components/AggrementComp";
import CreateAgreementDialog from "./components/CreateAgrement";
import { createAgreement } from "./useContract/writeContract";
import { Typography , IconButton, Button} from "@mui/material";
import ContractContext from "./context/ContractContext";
import { useQuery } from "@tanstack/react-query";
import { getAgreementsOfOwner } from "./useContract/readContract";

const Owner = () => {

  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showCreateAgreement, setShowCreateAgreement] = useState(false);
  const [agreementsData, setAgreementsData] = useState([]);

  const { account ,contract} = useContext(ContractContext);
  
  const handleAgreementClick = (agreementId) => {
    console.log("Agreement clicked", agreementId);
    setSelectedAgreement(agreementId);
    setShowTransactions(true);
  };

  const handleBackClick = () => {
    // setShowTransactions(false);
    // setSelectedAgreement(null);
  };

  // Use Custom Hooks
  // const {
  //   data: agreementsData,
  //   loading: agreementsStatus,
  //   refetch: refetchAgreements,
  // } = useAgreementsOfOwner(user.address);

  // const {
  //   data: transactionsData,
  //   loading: transactionsStatus,
  //   refetch: refetchTransactions,
  // } = useTransactionsOfOwner(user.address);

  const handleCreateAgreementClick = () => {
    console.log("Create Agreement clicked");
    setShowCreateAgreement(true);
  };


  // Handle Create Agreement
  const handleCreateAgreement = async (e, newAgreement) => {
    console.log("newAgreement", newAgreement);
    setShowCreateAgreement(false);
    try{
      const res = await createAgreement(contract , newAgreement);
      console.log("Agreement created", res);
    }catch(error){
      console.error("Error creating agreement:", error);
    }

    // try {
    //   console.log(newAgreement);
    // setShowCreateAgreement(false);
    //   const res = await createAgreement(
    //     contract,
    //     newAgreement.ownerAddress,
    //     newAgreement.tenantAddress,
    //     newAgreement.securityDeposit,
    //     newAgreement.monthlyRent,
    //     newAgreement.tenureInMonths
    //   );
    //   console.log("Agreement created", res);
    //   await refetchAgreements();
    //   await refetchTransactions();
    // } catch (error) {
    //   console.error("Error creating agreement:", error);
    // }
  };

  const handleCancelCreateAgreement = () => {
    setShowCreateAgreement(false);
  };


  const {data , isLoading} = useQuery(
    {
      queryKey: ["agreements" , account],
      queryFn: ()=>getAgreementsOfOwner(account)
    }
  );

  console.log("data", data);


  // if (agreementsStatus === "loading" || transactionsStatus === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (agreementsStatus === "error" || transactionsStatus === "error") {
  //   return <div>Error loading data.</div>;
  // }

  return (
    <div className="container mx-auto mt-10">
      <Typography variant="h5" className="mb-2">
        Owner Page
      </Typography>
      <Typography>
        Welcome to the Owner section. Here you can manage your properties and
        view tenant information.
      </Typography>
      {showCreateAgreement  ?(

        <CreateAgreementDialog
          onCreate={handleCreateAgreement}
          onCancel={handleCancelCreateAgreement}
          ownerAddress={account}
          open={showCreateAgreement}
          handleOpen={() => setShowCreateAgreement(false)}
        />
      )
      :(
        <Button onClick={()=>setShowCreateAgreement(true)}>
          <Typography variant="h5" className="mb-2">
            Create Agreement
          </Typography>
        </Button>
      )
      }

      {showTransactions ? (
        <>
          <IconButton variant="text" onClick={handleBackClick}>
            <ArrowLeftIcon className="h-6 w-6" />
          </IconButton>
          <TransactionsTable
            ownerAddress={account}
            rentPaid={selectedAgreement}
          />
        </>
      ) : 
          isLoading ? (
            <div>Loading...</div>
          ) : (
            <AgreementTable
              agreements={data?.agreements}
              onAgreementClick={handleAgreementClick}
              onAgreementCreate={handleCreateAgreementClick}
            />
          )
      }
    </div>
  );
};

export default Owner;
