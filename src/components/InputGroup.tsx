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
        flexDirection={["column", "row", "row", "row"]}
      >
        <Text
          as="label"
          marginRight={["auto", "unset", "unset", "unset"]}
          pl={["5px", "0", "0", "0"]}
        >
          {label}:
        </Text>
        <ChakraInputGroup w={["full", "xs", "xs", "xs"]} {...rest}>
          {hasLeftItem && <InputLeftAddon children={InputLeftItem} />}
          {children}
        </ChakraInputGroup>
      </HStack>
      <Text
        paddingLeft={["5px", "5rem", "5rem", "5rem"]}
        fontSize="sm"
        color="red.600"
        style={{
          marginTop: 0,
        }}
      >
        {hasSomeError}
      </Text>
    </VStack>
  );
};

export default InputGroup;
