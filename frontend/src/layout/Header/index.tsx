import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import React, { useRef } from "react"
import { ColorModeSwitcher } from "../../ColorModeSwitcher"
import { Logo } from "../../Logo"

export default function Header() {
  const headerRef = useRef(null)
  return (
    <Flex
      as="header"
      position="sticky"
      //direction="column"
      top="0"
      w="100vw"
      p={0}
      boxShadow={useColorModeValue(
        "0px 0.25rem 0.75rem 0px rgb(190 194 255 / 18%)",
        "0px 0.25rem 0.75rem 0px rgb(0 14 81 / 35%)"
      )}
      zIndex={999}
      ref={headerRef}
    >
      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        w="100%"
        maxW="1366px"
        m="auto"
        px="20px"
        py={3}
      >
        <Logo />
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  )
}
