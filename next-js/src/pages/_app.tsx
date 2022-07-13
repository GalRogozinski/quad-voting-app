import React from "react"

import { Web3ReactProvider } from "@web3-react/core"
import axios, { AxiosError, AxiosResponse } from "axios"
import { AppProps } from "next/app"

import Web3Manager from "@components/connectors/Web3Manager"
import connectors from "@connectors"
import "../styles/tailwind.scss"
import { PublishOps, SignUpOps } from "@models/poll"
import config from "config.json"

const COORDINATOR_URL = `${config.server_url}:${config.server_port}`
const PERSONAL_SERVER_URL = `${config.personal_server_url}:${config.personal_server_port}`

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8"
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"

const fetchPolls = (
  resFunc: (res: AxiosResponse) => void,
  errFunc: (err: AxiosError<any>) => void
) => {
  console.log("Fetching polls")
  axios
    .get(`${COORDINATOR_URL}/maci/polls`)
    .then((response) => resFunc(response))
    .catch((error) => errFunc(error))
}

const signUpAPI = (
  signUpOps: SignUpOps,
  resFunc: (res: AxiosResponse) => void,
  errFunc: (err: AxiosError<any>) => void
) => {
  axios
    .post(`${COORDINATOR_URL}/maci/signup`, signUpOps)
    .then((response) => resFunc(response))
    .catch((error) => errFunc(error))
}

const publishAPI = (
  publishOps: PublishOps,
  resFunc: (res: AxiosResponse) => void,
  errFunc: (err: AxiosError<any>) => void
) => {
  axios
    .post(`${COORDINATOR_URL}/maci/publishMessage`, publishOps)
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
export { fetchPolls, signUpAPI, publishAPI }
