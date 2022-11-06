import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  ScaleFade,
  useToast,
} from "@chakra-ui/react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { SingleDatepicker } from "../../../components/DayzedDatepicker"
import { useAuthDispatch } from "../../../contexts/AuthContext"
import { register as RegisterUser } from "../../../services/AuthService"
import { User } from "../../../types/User"

export default function Register() {
  let navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [date, setDate] = useState(new Date())
  const dispatch = useAuthDispatch()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()
  const goLogin = () => {
    navigate("/auth/")
  }
  const onSubmit = async (user: any) => {
    dispatch({ type: "LOADING" })
    try {
      user.role = 2
      user.dob = date
      await RegisterUser(user as User).then(
        () => {
          toast({
            title: "User successfully registered!",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
          reset()
        },
        (error) => {
          toast({
            title: "User failed to register!",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        }
      )
    } catch (errors) {
      console.log(errors)
      if (errors instanceof Error) {
        toast({
          title: "There is something happened in server!",
          description: "Please contact administrator!",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    } finally {
      dispatch({ type: "STOP_LOADING" })
    }
  }

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} width={768} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link onClick={goLogin} color={"blue.400"}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </ScaleFade>
  )
}
