import { Icon } from "@iconify/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import React, { useMemo } from "react";

interface ConfirmationModalProps {
  header: string | React.ReactNode;
  message: string | React.ReactNode;
  actionText: string;
  type: "danger" | "success" | "warning";
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmationModal({
  header,
  message,
  actionText,
  type,
  onConfirm,
  onClose,
  ...props
}: ConfirmationModalProps) {
  const iconConfirm = useMemo(() => {
    switch (type) {
      case "danger":
        return (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-red-100 bg-red-200">
            <Icon
              className="text-red-600"
              fontSize={24}
              icon={"solar:check-circle-linear"}
            />
          </div>
        );
      case "success":
        return (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-green-100 bg-green-200">
            <Icon
              className="text-green-600"
              fontSize={24}
              icon={"solar:check-circle-linear"}
            />
          </div>
        );
      case "warning":
        return (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-yellow-100 bg-yellow-200">
            <Icon
              className="text-yellow-600"
              fontSize={24}
              icon={"solar:danger-circle-linear"}
            />
          </div>
        );
    }
  }, [type]);

  return (
    <Modal
      isOpen={true}
      // onOpenChange={onOpenChange}
      onClose={onClose}
      {...props}
    >
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col items-center pt-5">
            {iconConfirm}
            <div className="mt-3 text-lg font-semibold">{header}</div>
            <div className="text-foreground-80 mt-2 px-5 text-center text-sm">
              {message}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            className="text-white"
            color={type}
            onPress={() => {
              onConfirm();
              onClose();
            }}
          >
            {actionText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;
