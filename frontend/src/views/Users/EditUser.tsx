import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { SingleDatepicker } from "../../components/DayzedDatepicker"
import { useAuthDispatch } from "../../contexts/AuthContext"
import { editUser } from "../../services/UserService"
import { User } from "../../types/User"

interface EUProps {
  user: User
  sendData: any
}

const EditUser: React.FC<EUProps> = ({ user, sendData }: EUProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showPassword, setShowPassword] = useState(false)
  const [date, setDate] = useState(new Date())
  const toast = useToast()

  const dispatch = useAuthDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  // Methods
  const onSubmit = async (user: any) => {
    dispatch({ type: "LOADING" })
    try {
      user.dob = date
      await editUser(user.id, user as User).then(() => {
        toast({
          title: "User edited!",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "There is something happened in server!",
        description: "Please contact administrator.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      onClose()
      sendData(null)
      dispatch({ type: "STOP_LOADING" })
    }
  }
  return (
    <>
      <IconButton
        colorScheme="teal"
        aria-label="Update user"
        icon={<EditIcon />}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit user</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={5}>
                <HStack>
                  <FormControl isRequired hidden>
                    <Input
                      id="id"
                      type="text"
                      defaultValue={user.id}
                      {...register("id")}
                    />
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={Boolean(errors.firstName)}
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      id="firstName"
                      placeholder="First Name"
                      type="text"
                      defaultValue={user.firstName}
                      {...register("firstName")}
                    />
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={Boolean(errors.lastName)}
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      id="lastName"
                      placeholder="Last Name"
                      type="text"
                      defaultValue={user.lastName}
                      {...register("lastName")}
                    />
                  </FormControl>
                </HStack>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.username)}
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    id="username"
                    placeholder="Username"
                    type="text"
                    readOnly
                    defaultValue={user.username}
                    {...register("username")}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={Boolean(errors.email)}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    readOnly
                    defaultValue={user.email}
                    {...register("email")}
                  />
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.occupation)}
                >
                  <FormLabel>Occupation</FormLabel>
                  <Input
                    id="occupation"
                    placeholder="Occupation"
                    type="text"
                    defaultValue={user.occupation}
                    {...register("occupation")}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <SingleDatepicker
                    date={new Date(user.dob)}
                    onDateChange={setDate}
                    {...register("dob")}
                    name="dob"
                  />
                </FormControl>
                <FormControl isRequired isInvalid={Boolean(errors.role)}>
                  <FormLabel>Role</FormLabel>
                  <Select
                    id="role"
                    placeholder="Select role"
                    defaultValue={user.role}
                    {...register("role")}
                  >
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                  </Select>
                </FormControl>
                <FormControl
                  id="password"
                  isInvalid={Boolean(errors.password)}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                loadingText="Submitting"
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                Edit User
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditUser
