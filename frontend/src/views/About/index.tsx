import { Flex, Heading, ScaleFade, Stack } from "@chakra-ui/react"
import React from "react"

export default function About() {
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Stack paddingRight={10} paddingLeft={5} paddingTop={5}>
        <Flex>
          <Heading size="lg">About us</Heading>
        </Flex>
      </Stack>
    </ScaleFade>
  )
}
