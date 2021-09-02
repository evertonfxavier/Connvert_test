/* eslint-disable react/no-children-prop */
import {
  HStack,
  InputGroup as ChakraInputGroup,
  InputGroupProps,
  InputLeftAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface IInputGroup extends InputGroupProps {
  children: ReactNode;
  label: string;
  InputLeftItem?: ReactNode | string;
  hasLeftItem?: boolean;
  hasSomeError: string;
}

const InputGroup: React.FC<IInputGroup> = ({
  children,
  label,
  InputLeftItem,
  hasLeftItem,
  hasSomeError,
  ...rest
}) => {
  return (
    <VStack w="full" justifyContent="flex-start" alignItems="flex-start">
      <HStack
        as="fieldset"
        w="full"
        textAlign="right"
        justifyContent="space-between"
      >
        <Text as="label">{label}:</Text>
        <ChakraInputGroup w="xs" {...rest}>
          {hasLeftItem && <InputLeftAddon children={InputLeftItem} />}
          {children}
        </ChakraInputGroup>
      </HStack>
      <Text paddingLeft="5rem" fontSize="sm" color="red.600">
        {hasSomeError}
      </Text>
    </VStack>
  );
};

export default InputGroup;
