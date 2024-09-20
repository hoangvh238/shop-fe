import { Icon } from "@iconify/react";
import {
  Avatar,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React, { useMemo } from "react";

function UserProfileModal({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const accountInfo = useMemo(() => {
    return (
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p className="text-default-500">Username</p>
          <p className="font-medium">Thangtvb</p>
        </div>
        <div>
          <p className="text-default-500">Email</p>
          <p className="font-medium">Thangtvb.dev@gmail.com</p>
        </div>
        <div>
          <p className="text-default-500">Phone</p>
          <p className="font-medium">+84 123 456 789</p>
        </div>
        <div>
          <p className="text-default-500">Department</p>
          <p className="font-medium">Phòng...</p>
        </div>
        <div>
          <p className="text-default-500">Address</p>
          <p className="font-medium">Ho Chi Minh City, Vietnam</p>
        </div>
        <div>
          <p className="text-default-500">Gender</p>
          <p className="font-medium">Male</p>
        </div>
        <div>
          <p className="text-default-500">ID Card</p>
          <p className="font-medium">123 456 789</p>
        </div>
        <div>
          <p className="text-default-500">Azure ID</p>
          <p className="font-medium">fake-azure-id-123</p>
        </div>
      </div>
    );
  }, []);

  const paymentInfo = useMemo(() => {
    return (
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p className="text-default-500">Fullname</p>
          <p className="font-medium">Thang Van Bao</p>
        </div>
        <div>
          <p className="text-default-500">Phone</p>
          <p className="font-medium">+84 123 456 789</p>
        </div>
        <div>
          <p className="text-default-500">Email</p>
          <p className="font-medium">thangtvb.dev@gmail.com</p>
        </div>
        <div>
          <p className="text-default-500">CCCD</p>
          <p className="font-medium">123456789123</p>
        </div>
        <div>
          <p className="text-default-500">Account number</p>
          <p className="font-medium">1234567890</p>
        </div>
        <div>
          <p className="text-default-500">Bank name</p>
          <p className="font-medium">Vietcombank</p>
        </div>
        <div>
          <p className="text-default-500">Tax number</p>
          <p className="font-medium">123456789</p>
        </div>
        <div>
          <p className="text-default-500">Address</p>
          <p className="font-medium w-full truncate">
            123 Street, District 1, Ho Chi Minh City, Vietnam
          </p>
        </div>
      </div>
    );
  }, []);

  return (
    <Modal isOpen={true} size="2xl" onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2>User Profile</h2>
        </ModalHeader>
        <ModalBody className="pb-5 transition-all">
          <div className="flex gap-4 flex-col items-center">
            <Avatar
              className="h-20 w-20"
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            />
            <div className="flex flex-col items-center justify-center text-xl">
              <p className="font-medium">Tran Van Bao Thang</p>
              <span className="text-small text-default-500">Admin</span>
            </div>
          </div>
          <Divider />
          <Tabs aria-label="Options" variant="underlined" color="primary">
            <Tab
              key="photos"
              title={
                <div className="flex items-center space-x-2">
                  <Icon icon="solar:info-circle-linear" />
                  <span>Account</span>
                </div>
              }
            >
              {accountInfo}
            </Tab>
            <Tab
              key="music"
              title={
                <div className="flex items-center space-x-2">
                  <Icon icon="solar:wallet-money-linear" />
                  <span>Payment</span>
                </div>
              }
            >
              {paymentInfo}
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UserProfileModal;
