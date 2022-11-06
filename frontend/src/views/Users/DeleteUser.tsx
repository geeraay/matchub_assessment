import { DeleteIcon } from "@chakra-ui/icons"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useRef } from "react"
import { useAuthDispatch } from "../../contexts/AuthContext"
import { deleteUser } from "../../services/UserService"
import { User } from "../../types/User"

interface DUProps {
  user: User
  sendData: any
}
const DeleteUser: React.FC<DUProps> = ({ user, sendData }: DUProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const toast = useToast()
  const dispatch = useAuthDispatch()
  const onDelete = async () => {
    dispatch({ type: "LOADING" })
    try {
      await deleteUser(user.id).then((response) => {
        toast({
          title: "User deleted!",
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
        colorScheme="red"
        aria-label="Delete user"
        icon={<DeleteIcon />}
        onClick={onOpen}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteUser
