import React from "react";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardContent,
  CardActionArea,
  IconButton,
  Tooltip,
  Input, 
  Chip,
} from "@mui/material";

const TABLE_HEAD = [
  "ID",
  "Owner Address",
  "Tenant Address",
  "Security Deposit",
  "Monthly Rent",
  // "Start Time",
  // "End Time",
  "Tenure (Months)",
  "Agreement ID",
  "Is Active",
  "",
];

export function AgreementComp({
  // agreements,
  // onAgreementClick,
  // onAgreementCreate,
  // onPaySecurityDeposit,
  // tableHead = TABLE_HEAD,
  // isTenant = false,
}) {
  return (
    <Card>
      {/* <CardHeader floated={"false"} shadow={"false"} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Agreements
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last agreements
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            {!isTenant && (
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={onAgreementCreate}
              >
                <PlusIcon className="h-4 w-4" /> Create New Agreement HIHIHIHIHIHIH
              </Button>
            )}
          </div>
        </div>
      </CardHeader> */}
      <CardContent className="overflow-auto px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agreements?.map((agreement, index) => {
              const isLast = index === tableHead.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={agreement.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {agreement.id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {agreement.ownerAddress}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {agreement.tenantAddress}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {agreement.securityDeposit}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {agreement.monthlyRent}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {agreement.tenureInMonths}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {agreement.agreementId}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      variant="ghost"
                      className="w-max"
                      size="sm"
                      value={agreement.isActive ? "Active" : "Inactive"}
                      color={agreement.isActive ? "green" : "red"}
                    />
                  </td>
                  {isTenant && (
                    <>
                      <td className={classes + " text-center"}>
                        <Tooltip content="Deposit Security">
                          <Button
                            onClick={() =>
                              onPaySecurityDeposit(agreement.agreementId)
                            }
                            className="m-auto p-auto text-center"
                            color="blue"
                            disabled={
                              !agreement.isActive ||
                              agreement.isSecurityDeposited
                            }
                          >
                            {agreement.isSecurityDeposited
                              ? "Deposited"
                              : "Deposit Now"}
                          </Button>
                        </Tooltip>
                      </td>
                    </>
                  )}
                  <td className={classes}>
                    <Tooltip content="View Agreement">
                      <IconButton
                        variant="text"
                        onClick={() => onAgreementClick(agreement.agreementId)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
      {/* <CardActionArea className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardActionArea> */}
    </Card>
  );
}

export default AgreementComp;
