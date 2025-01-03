import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
 
export function ConnectCryptoModal({ isOpen, setIsOpen }) {
 
  const handleOpen = () => setIsOpen((cur) => !cur);
 
  return (
    <>
      <Dialog size="xs" open={isOpen} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Connect a Wallet
            </Typography>
            <Typography color="gray" variant="paragraph">
              Choose which card you want to connect
            </Typography>
          </div>

          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>


        </DialogHeader>
        <DialogBody className="overflow-y-auto !px-5">
          <div className="mb-6">
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="py-3 font-semibold uppercase opacity-70"
            >
              Popular
            </Typography>
            <ul className="-ml-2 mt-3 flex flex-col gap-1">
              <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md">
                <img
                  src="https://docs.material-tailwind.com/icons/metamask.svg"
                  alt="metamast"
                  className="h-6 w-6"
                />
                <Typography
                  className="uppercase"
                  color="blue-gray"
                  variant="h6"
                >
                  Connect with MetaMask
                </Typography>
              </MenuItem>
              <MenuItem className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md">
                <img
                  src="https://docs.material-tailwind.com/icons/coinbase.svg"
                  alt="metamast"
                  className="h-6 w-6 rounded-md"
                />
                <Typography
                  className="uppercase"
                  color="blue-gray"
                  variant="h6"
                >
                  Connect with Coinbase
                </Typography>
              </MenuItem>
            </ul>
          </div>
          <div>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="py-4 font-semibold uppercase opacity-70"
            >
              Other
            </Typography>
            <ul className="-ml-2.5 mt-4 flex flex-col gap-1">
              <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md">
                <img
                  src="https://docs.material-tailwind.com/icons/trust-wallet.svg"
                  alt="metamast"
                  className="h-7 w-7 rounded-md border border-blue-gray-50"
                />
                <Typography
                  className="uppsecase"
                  color="blue-gray"
                  variant="h6"
                >
                  Connect with Trust Wallet
                </Typography>
              </MenuItem>
            </ul>
          </div>
        </DialogBody>
        <DialogFooter className="justify-between gap-2">
          <Typography variant="small" color="gray" className="font-normal">
            New to Ethereum wallets?
          </Typography>
          <Button variant="outlined" size="sm">
            Learn More
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
 
export default ConnectCryptoModal;