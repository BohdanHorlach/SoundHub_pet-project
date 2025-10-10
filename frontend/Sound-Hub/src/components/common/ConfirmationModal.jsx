import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";


export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <>
      <Dialog open={isOpen} handler={onClose}>
        <DialogHeader>You sure?</DialogHeader>
        <DialogBody>
          This action cannot be undone. Do you want to proceed?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose} className="mr-1">
            <span>No</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              onClose();

              if (onConfirm)
                onConfirm();
            }}
          >
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}