import React from "react"
import { ViewIcon } from "@chakra-ui/icons"
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { User } from "../../types/User"

export default function ViewUser(user: User) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        colorScheme="teal"
        aria-label="View user"
        icon={<ViewIcon />}
        onClick={onOpen}
      />
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              {Object.entries(user).map((value) => (
                <Text key={value[0]}>
                  {value[0]}: {value[1]}
                </Text>
              ))}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
