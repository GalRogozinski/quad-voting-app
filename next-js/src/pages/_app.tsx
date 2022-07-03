import React from "react"

import { Web3ReactProvider } from "@web3-react/core"
import axios, { AxiosError, AxiosResponse } from "axios"
import { AppProps } from "next/app"

import Web3Manager from "@components/connectors/Web3Manager"
import connectors from "@connectors"
import "../styles/tailwind.scss"
import { SignUpOps } from "@models/poll"
import config from "config.json"

const SERVER_URL = `${config.server_url}:${config.server_port}`
axios.defaults.baseURL = SERVER_URL
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8"
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"

const fetchPolls = (
  resFunc: (res: AxiosResponse<any>) => void,
  errFunc: (err: AxiosError<any>) => void
) => {
  console.log("Fetching polls")
  axios
    .get(`maci/polls`)
    .then((response) => resFunc(response))
    .catch((error) => errFunc(error))
}

const signUpAPI = (
  signUpOps: SignUpOps,
  resFunc: Function,
  errFunc: Function
) => {
  axios
    .post(`maci/signup`, signUpOps)
    .then((response) => resFunc(response))
    .catch((error) => errFunc(error))
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Web3Manager />
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
export { fetchPolls, signUpAPI }
