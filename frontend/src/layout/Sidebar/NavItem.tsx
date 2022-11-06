import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react"
import { ReactNode } from "react"
import { IconType } from "react-icons"
import { useNavigate } from "react-router-dom"

interface NavItemProps extends FlexProps {
  to: string
  icon: IconType
  children: ReactNode
}

export const NavItem = ({ to, icon, children, ...rest }: NavItemProps) => {
  let navigate = useNavigate()
  return (
    <Link
      onClick={() => navigate(to)}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "teal.500",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}
