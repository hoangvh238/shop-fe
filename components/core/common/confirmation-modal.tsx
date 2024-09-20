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
          <div className="w-16 h-16 bg-red-200 rounded-full flex justify-center items-center border-8 border-red-100">
            <Icon
              icon={"solar:check-circle-linear"}
              fontSize={24}
              className="text-red-600"
            />
          </div>
        );
      case "success":
        return (
          <div className="w-16 h-16 bg-green-200 rounded-full flex justify-center items-center border-8 border-green-100">
            <Icon
              icon={"solar:check-circle-linear"}
              fontSize={24}
              className="text-green-600"
            />
          </div>
        );
      case "warning":
        return (
          <div className="w-16 h-16 bg-yellow-200 rounded-full flex justify-center items-center border-8 border-yellow-100">
            <Icon
              icon={"solar:danger-circle-linear"}
              fontSize={24}
              className="text-yellow-600"
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
            <div className="text-lg font-semibold mt-3">{header}</div>
            <div className="text-sm text-foreground-80 mt-2 text-center px-5">
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
