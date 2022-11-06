import * as React from "react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"

import About from "./views/About"
import Home from "./views/Home"
import Users from "./views/Users"
import Public from "./layout/Public"
import Private from "./layout/Private"
import Login from "./views/Auth/Login"
import { AuthProvider } from "./contexts/AuthContext"
import Register from "./views/Auth/Register"
import Logout from "./views/Auth/Logout"
import Sidebar from "./layout/Sidebar"

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Sidebar>
              <Private />
            </Sidebar>
          }
        >
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="/auth" element={<Public />}>
          <Route index element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          <Route path="/auth/logout" element={<Logout />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  </ChakraProvider>
)
