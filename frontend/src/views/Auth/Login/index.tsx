import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  HStack,
  Spacer,
  ScaleFade,
  useToast,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuthDispatch } from "../../../contexts/AuthContext"
import { login } from "../../../services/AuthService"

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const dispatch = useAuthDispatch()
  const toast = useToast()

  async function doLogin({ username, password }: any) {
    try {
      await login(username, password).then(
        (result) => {
          toast({
            title: "Login Successful!",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
          localStorage.setItem("user", JSON.stringify(result.user))
          localStorage.setItem("token", result.token)
          dispatch({
            type: "LOGIN",
            payload: result.user,
          })
          navigate("/")
        },
        (error) => {
          console.log(error)
          toast({
            title: "Login Failed!",
            description: "User or password is incorrect!",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        }
      )
    } catch (error) {
      toast({
        title: "Login Failed!",
        description: "Server error!",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }
  function goRegister() {
    navigate("/auth/register")
  }
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={8}
          mx={"auto"}
          minW={"md"}
          maxW={"lg"}
          py={12}
          px={6}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign In</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(doLogin)}>
              <Stack spacing={4}>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.username)}
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    {...register("username")}
                  />
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.username)}
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                </FormControl>
                <Stack>
                  <HStack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                    my={2}
                  >
                    <Spacer />
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </HStack>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Sign in
                  </Button>
                  <Button
                    bg={"gray.400"}
                    color={"white"}
                    _hover={{
                      bg: "gray.500",
                    }}
                    onClick={goRegister}
                  >
                    Register Now!
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </ScaleFade>
  )
}
