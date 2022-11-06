import {
  Flex,
  Heading,
  HStack,
  ScaleFade,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAuthDispatch, useAuthState } from "../../contexts/AuthContext"
import { getAll } from "../../services/UserService"
import { User } from "../../types/User"
import AddUser from "./AddUser"
import DeleteUser from "./DeleteUser"
import EditUser from "./EditUser"
import ViewUser from "./ViewUser"

export default function Users() {
  const [users, setUsers] = useState<any>([])
  const [userAction, setUserAction] = useState(null)
  const { user } = useAuthState()
  const dispatch = useAuthDispatch()
  const toast = useToast()
  const bg = useColorModeValue("white", "dark")
  const fetchData = async () => {
    try {
      await getAll().then((response) => {
        setUsers(response.data)
      })
    } catch (err) {
      toast({
        title: "There is something happened in server!",
        description: "Please contact administrator.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleAction = (value: any) => {
    setUserAction(value)
  }

  useEffect(() => {
    dispatch({ type: "LOADING" })
    fetchData()
    dispatch({ type: "STOP_LOADING" })
  }, [userAction, dispatch])

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Stack paddingRight={10} paddingLeft={5} paddingTop={5}>
        <Flex>
          <Heading size="lg">User Management</Heading>
        </Flex>
        <Flex alignContent={"space-between"}>
          <Spacer />
          <AddUser sendData={handleAction} />
        </Flex>
        <TableContainer borderRadius={10} shadow="lg" backgroundColor={bg}>
          <Table marginTop={5} variant="striped" colorScheme={"teal"}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Age</Th>
                <Th>Occupation</Th>
                <Th>Username</Th>
                <Th>Role</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((userRow: User) => {
                return (
                  <Tr key={userRow.id}>
                    <Td>
                      {userRow.firstName} {userRow.lastName}
                    </Td>
                    <Td>{userRow.email}</Td>
                    <Td>
                      {Math.abs(
                        new Date(
                          Date.now() - new Date(userRow.dob).getTime()
                        ).getUTCFullYear() - 1970
                      )}
                    </Td>
                    <Td>{userRow.occupation}</Td>
                    <Td>{userRow.username}</Td>
                    <Td>{userRow.role === 1 ? "Admin" : "User"}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <ViewUser {...userRow} />
                        <EditUser user={userRow} sendData={handleAction} />
                        {user?.email === userRow.email ? null : (
                          <DeleteUser
                            user={userRow}
                            sendData={handleAction}
                          />
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </ScaleFade>
  )
}
