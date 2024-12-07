import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Dialog,
} from "@material-tailwind/react";

const CreateAgreementDialog = ({ ownerAddress, onCreate, onCancel, open, handleOpen }) => {
  const [formData, setFormData] = useState({
    ownerAddress: ownerAddress || "",
    tenantAddress: "",
    securityDeposit: "",
    monthlyRent: "",
    tenureInMonths: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onCreate(formData);
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="h-full w-full">
        <CardBody>
          <Typography variant="h5" className="mb-4">
            Create New Agreement
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Owner Address"
                name="ownerAddress"
                disabled={ownerAddress ? true : false}
                value={ownerAddress ?? formData.ownerAddress}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Tenant Address"
                name="tenantAddress"
                value={formData.tenantAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                label="Security Deposit"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                type="number"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                label="Monthly Rent"
                name="monthlyRent"
                value={formData.monthlyRent}
                onChange={handleChange}
                type="number"
                required
              />
            </div>
            {/* tenureInMonths */}
            <div className="mb-4">
              <Input
                label="Tenure in Months"
                name="tenureInMonths"
                value={formData.tenureInMonths}
                onChange={handleChange}
                type="number"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="text" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
};

export default CreateAgreementDialog;
