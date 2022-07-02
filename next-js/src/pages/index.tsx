import "react-app-polyfill/stable"
import React from "react"

import { useWeb3React } from "@web3-react/core"
import Head from "next/head"
import Link from "next/link"

import { VerifierOpts, verifyClient } from "@cli/ts/verifyClient"
import NewPollModal from "@components/NewPollModal"
import { Poll } from "@models/poll"
import { fetchPolls } from "@pages/_app"
import ConnectWeb3 from "@pages/connect"
// import { Keypair, PCommand } from "quad-voting-maci/domainobjs"

export default function Home() {
  const [openPoll, setOpenPoll] = React.useState(false)
  const [openSignup, setOpenSignup] = React.useState(false)
  const { account, chainId, connector, error, provider } = useWeb3React()
  function cancelPoll() {
    setOpenPoll(false)
  }

  // function cryptoExperiment() {
  //   let keypair = new Keypair()
  //   const command: PCommand = new PCommand(
  //     BigInt(1),
  //     keypair.pubKey,
  //     BigInt(0),
  //     BigInt(1),
  //     BigInt(1),
  //     BigInt(1),
  //     BigInt(1)
  //   )
  //   const signature = command.sign(keypair.privKey)
  //   const message = command.encrypt(
  //     signature,
  //     Keypair.genEcdhSharedKey(keypair.privKey, keypair.pubKey)
  //   )
  // }
  function createPoll(data: any) {
    let poll = {} as Poll
    poll = Object.assign(poll, data)
    // const args = determineArgs(data)
    // deployPollApi(MACI_CONTRACT, args)
    window.localStorage.setItem(poll.id, JSON.stringify(data))
    console.log(data)
    // cryptoExperiment()
    verifyClient(null, {} as VerifierOpts)
    setOpenPoll(false)
  }

  React.useEffect(() => {
    let polls: Poll[] = []
    fetchPolls(
      (res: any) => (polls = res.polls),
      (err: any) => {
        throw new Error(err)
      }
    )
  })

  return (
    <div>
      <div>
        <ConnectWeb3 />
      </div>
      <Head>
        <title>Quad Voting</title>

        <meta name="description" content="Vote Fairly!" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen justify-center bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100 py-20">
        <div>
          <h1 className="px-5 text-center text-4xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-6xl">
            Quad Voting
          </h1>

          <h2 className="mx-auto mt-8 max-w-4xl px-10 text-center text-base tracking-tight text-gray-600 sm:text-2xl md:mt-5 md:text-2xl">
            Vote Fairly!
          </h2>

          <div className="px-4 sm:px-0">
            <section
              className="mt-6 grid min-h-[350px] w-full grid-cols-1 rounded-lg bg-white sm:mt-20 sm:min-w-[1000px] sm:grid-cols-2"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 30px 60px 0px",
              }}
            >
              <div className="space-y-5 place-self-center px-4 py-24 text-center">
                <h3 className="text-3xl font-bold">Create Poll 👇</h3>

                <span className="inline-flex rounded-md shadow-sm">
                  <button type={"button"} onClick={() => setOpenPoll(true)}>
                    Find Out What Your Community Thinks
                  </button>
                  <NewPollModal
                    isOpen={openPoll}
                    onSubmit={createPoll}
                    onCancel={cancelPoll}
                  ></NewPollModal>
                </span>
              </div>

              <div className="space-y-5 place-self-center px-4 py-24 text-center">
                <h3 className="text-3xl font-bold">Register To Vote 👇</h3>

                <span className="inline-flex rounded-md shadow-sm">
                  <Link href="https://github.com/agcty/web3-starter">
                    <a
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-4 font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 active:bg-blue-700 sm:px-10"
                    >
                      Let's Make A Difference
                    </a>
                  </Link>
                </span>
              </div>
            </section>
            <p className="mt-6 text-center text-xs font-medium text-gray-600">
              Built by{" "}
              <a
                className="font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500 focus:underline focus:outline-none"
                href="https://twitter.com/agctyz"
              >
                @agctyz
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

interface FeatureListProps {
  children: React.ReactNode
}

function FeatureList({ children }: FeatureListProps) {
  return <ul className="space-y-5 px-12 py-12">{children}</ul>
}

function Feature({ children, main }) {
  return (
    <li className="flex items-center">
      <CheckIcon className="hiddden hidden h-5 w-5 flex-shrink-0 rounded-full bg-blue-600 p-1 text-gray-100 sm:inline" />
      <p className="ml-3 hidden text-lg text-gray-600 sm:inline">{children}</p>

      <p className="mx-auto sm:hidden">
        <InfoText text={main} />
      </p>
    </li>
  )
}

function InfoText({ text }) {
  return (
    <span className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 font-medium text-gray-700">
      <CheckIcon className="mr-3 inline-flex h-5 w-5 flex-shrink-0 rounded-full bg-blue-600 p-1 text-gray-100 sm:hidden" />
      {text}
    </span>
  )
}

function CheckIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
