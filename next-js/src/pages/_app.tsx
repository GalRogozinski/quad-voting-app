import React from "react"

import { Web3ReactProvider } from "@web3-react/core"
import axios from "axios"
import { AppProps } from "next/app"

import Web3Manager from "@components/connectors/Web3Manager"
import connectors from "@connectors"
import "../styles/tailwind.scss"
import config from "config.json"

const SERVER_URL = `${config.server_url}:${config.server_port}`

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const fetchPolls = async () => {}
  const signUpAPI = async (
    signUpOps: JSON,
    resFunc: Function,
    errFunc: Function
  ) => {
    axios
      .post(`${SERVER_URL}\\${config.maci}\\signup`, signUpOps)
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
