import { Button, Card, CardContent, Table, TableContainer } from "@mui/material";
import React, { useContext, useState } from "react";
import AgreementTableHeader from "./AgreementTableHeader";
import AgreementTableBody from "./AgreementTableBody";
import CreateAgreementDialog from "../CreateAgreement";
import { createAgreement } from "../../useContract/writeContract";
import ContractContext from "../../context/ContractContext";
const AgreementTable = ({ userType }) => {
  const [showCreateAgreement, setShowCreateAgreement] = useState(false);
  const { account,contract } = useContext(ContractContext);
  
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
  };
  const handleCancelCreateAgreement = () => {
    setShowCreateAgreement(false);
  };
  return (
    <>
    <Card className="mt-4">
      <CardContent className="overflow-auto px-0">
        <div className="flex justify-between mb-4">
          <h2>
            {userType === "owner" ? "Owner Agreements" : "Tenant Agreements"}
          </h2>
        {userType === "owner" ? (
          showCreateAgreement ? (
            <CreateAgreementDialog
              onCreate={handleCreateAgreement}
              onCancel={handleCancelCreateAgreement}
              ownerAddress={account}
              open={showCreateAgreement}
              handleOpen={() => setShowCreateAgreement(false)}
            />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateAgreementClick}
            >
              <h3>Create Agreement</h3>
            </Button>
          )
        ) : null}
        </div>
        <TableContainer >
          <Table
            aria-label="simple table"
            className="min-w-full"
          >
            <AgreementTableHeader userType={userType} />
            <AgreementTableBody userType={userType}/>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
    </>
  );
};

export default AgreementTable;
