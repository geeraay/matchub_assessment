import { FiHome, FiUsers, FiLogOut, FiInfo } from "react-icons/fi"

import { IconType } from "react-icons"

interface LinkItemProps {
  name: string
  icon: IconType
  to: string
}

export const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, to: "/" },
  { name: "Users", icon: FiUsers, to: "/users" },
  { name: "About Us", icon: FiInfo, to: "/about" },
]
