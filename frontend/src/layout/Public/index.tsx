import React, { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"

export default function Public(props: PropsWithChildren) {
  return (
    <>
      {props.children}
      <Outlet />
    </>
  )
}
