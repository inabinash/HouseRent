const createAgreement = async (
  contract,
  agreement
) => {
  const {
    ownerAddress,
    tenantAddress,
    securityDeposit,
    monthlyRent,
    tenureInMonths,
  } = agreement;

  console.log("ownerAddress", ownerAddress);
  console.log("tenantAddress", tenantAddress);

  if (
    !contract ||
    !ownerAddress ||
    !tenantAddress ||
    !securityDeposit ||
    !monthlyRent ||
    !tenureInMonths
  ) {
    alert("Please Fill all the details ");
    return null;
  }
  const tx = await contract.createAgreement(
    ownerAddress,
    tenantAddress,
    securityDeposit,
    monthlyRent,
    tenureInMonths
  );

  console.log("tx", tx);
  const res = await tx.wait();
  
  console.log("Agreement created ,", res);
  // console.log("events :",res.events[res.events.length - 1])
  return res;
};

const depositSecuirty = async (
  contract,
  account,
  ownerAddress,
  tenantAddress,
  securityDeposit,
  agreementId
) => {
  if (
    !contract ||
    !account ||
    !ownerAddress ||
    !tenantAddress ||
    !agreementId ||
    !securityDeposit
  ){
    alert("Please Fill all the details ");
    return null;
  }
  const tx = await contract.depositSecuirty(
    ownerAddress,
    tenantAddress,
    securityDeposit,
    agreementId
  );
  const res = await tx.wait();
  console.log("Security Deposited");
  return res;
};

const payMonthlyRent = async (
  contract,
  account,
  ownerAddress,
  tenantAddress,
  monthlyRent,
  agreementId
) => {
  if (
    !contract ||
    !account ||
    !ownerAddress ||
    !tenantAddress ||
    !agreementId ||
    !monthlyRent
  ){
    alert("Please Fill all the details ");
    return null;
  }
  const tx = await contract.payMonthlyRent(ownerAddress, tenantAddress, monthlyRent, agreementId);
  const res = await tx.wait();
  console.log("Monthly Rent Paid");
  return res;
};

const cancelAgreement = async (contract, account, agreementId) => {
  if (!contract || !account || !agreementId) {
    alert("Please Fill all the details ");
    return null;
  }
  const tx = await contract.cancelAgreement(agreementId);
  const res= tx.wait();
  return res;
};

export { createAgreement, payMonthlyRent, depositSecuirty, cancelAgreement };
