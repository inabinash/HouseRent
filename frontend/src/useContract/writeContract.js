const createAgreement = async (
  contract,
  account,
  ownerAddress,
  tenantAddress,
  securityDeposit,
  monthlyRent,
  tenureInMonths
) => {
  if (
    !contract ||
    !ownerAddress ||
    !tenantAddress ||
    !securityDeposit ||
    !monthlyRent ||
    !tenureInMonths
  )
    return false;
  const res = await contract.methods
    .createAgreement(
      ownerAddress,
      tenantAddress,
      securityDeposit,
      monthlyRent,
      tenureInMonths
    )
    .send({ from: account });

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
  )
    return false;
  const res = await contract.methods
    .depositSecuirty(ownerAddress, tenantAddress, securityDeposit, agreementId)
    .send({ from: account });
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
  )
    return false;
  const res = await contract.methods
    .payMonthlyRent(ownerAddress, tenantAddress, monthlyRent, agreementId)
    .send({ from: account });
  return res;
};

const cancelAgreement = async (contract, account, agreementId) => {
  if (!contract || !account || !agreementId) return false;
  const res = await contract.methods
    .cancelAgreement(agreementId)
    .send({ from: account });
  return res;
};

export { createAgreement, payMonthlyRent, depositSecuirty, cancelAgreement };
