import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
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
import { FiUserPlus } from "react-icons/fi"
import { SingleDatepicker } from "../../components/DayzedDatepicker"
import { useAuthDispatch } from "../../contexts/AuthContext"
import { register as RegisterUser } from "../../services/AuthService"
import { User } from "../../types/User"

interface AUProps {
  sendData: any
}

const AddUser: React.FC<AUProps> = ({ sendData }: AUProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()

  const [date, setDate] = useState(new Date())

  const dispatch = useAuthDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  // Methods
  const onSubmit = async (user: any) => {
    dispatch({ type: "LOADING" })
    try {
      user.dob = date
      await RegisterUser(user as User).then(() => {
        toast({
          title: "User created!",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        reset()
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
      <Button
        onClick={onOpen}
        leftIcon={<FiUserPlus />}
        colorScheme="teal"
      >
        Add User
      </Button>
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
            <ModalHeader>Add new user</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={5}>
                <HStack>
                  <FormControl
                    isRequired
                    isInvalid={Boolean(errors.firstName)}
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      id="firstName"
                      placeholder="First Name"
                      type="text"
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
                    {...register("username")}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={Boolean(errors.email)}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
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
                    {...register("occupation")}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <SingleDatepicker
                    date={date}
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
                    {...register("role")}
                  >
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                  </Select>
                </FormControl>
                <FormControl
                  id="password"
                  isRequired
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
                Add User
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AddUser
