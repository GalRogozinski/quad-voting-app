import React from "react"

import { Web3ReactProvider } from "@web3-react/core"
import axios from "axios"
import { AppProps } from "next/app"

import Web3Manager from "@components/connectors/Web3Manager"
import connectors from "@connectors"
import "../styles/tailwind.scss"

const SERVER_URL = "http://quadvoting.twilightparadox.com:3001/"
const MACI = "maci/"

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const signUpAPI = async (
    signUpOps: JSON,
    resFunc: Function,
    errFunc: Function
  ) => {
    axios
      .post(SERVER_URL + MACI + "signup", signUpOps)
      .then((response) => resFunc(response))
      .catch((error) => errFunc(error))
  }

  return (
    <Web3ReactProvider connectors={connectors}>
      <Web3Manager />
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
