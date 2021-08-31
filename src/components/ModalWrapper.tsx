/* eslint-disable react/no-children-prop */
import { ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalProps,
} from "@chakra-ui/react";

interface ModalWrapperProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt="8rem" pt="1.2rem">
        <ModalCloseButton />
        <ModalBody py="2rem">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalWrapper;
