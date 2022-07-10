import "react-app-polyfill/stable"
import React from "react"

import { useWeb3React } from "@web3-react/core"
import Head from "next/head"
import Link from "next/link"

// import { VerifierOpts, verifyClient } from "@cli/ts/verifyClient"
import NewPollModal from "@components/NewPollModal"
import SignupModal from "@components/SignupModal"
import VoteModal from "@components/VoteModal"
import { MaciKeyPair, Poll } from "@models/poll"
import { fetchPolls, generateKeysAPI } from "@pages/_app"
import ConnectWeb3 from "@pages/connect"
// import { Keypair, PCommand } from "quad-voting-maci/domainobjs"

export default function Home() {
  const [openPoll, setOpenPoll] = React.useState(false)
  const [polls, setPolls] = React.useState([] as Poll[])
  const [poll, setPoll] = React.useState({} as Poll)
  const [openSignUpModal, setOpenSignUpModal] = React.useState(false)
  const [openVoteModal, setOpenVoteModal] = React.useState(false)
  const [openResultsModal, setOpenResultsModal] = React.useState(false)



  const [maciKeyPairs, setMaciKeyPairs] = React.useState({} as MaciKeyPair)
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
    // let poll = {} as Poll
    // poll = Object.assign(poll, data)
    // // const args = determineArgs(data)
    // // deployPollApi(MACI_CONTRACT, args)
    // window.localStorage.setItem(poll.id, JSON.stringify(data))
    // console.log(data)
    // // cryptoExperiment()
    // verifyClient(null, {} as VerifierOpts)
    // setOpenPoll(false)
  }

  // React.useEffect(() => {
  //   let mounted = true
  //   generateKeysAPI(
  //     (res) => {
  //       if (mounted) {
  //         let keys = JSON.parse(res.data)
  //         console.log(keys)
  //         setMaciKeyPairs(keys)
  //       }
  //     },
  //     (err) => {
  //       console.error(err)
  //       throw new Error(err.stack)
  //     }
  //   )
  // }, [maciKeyPairs])

  React.useEffect(() => {
    let mounted = true
    fetchPolls(
      (res) => {
        if (mounted) {
          console.log(res.data)
          let pollsObj = JSON.parse(res.data)
          console.log(pollsObj)
          if (pollsObj.constructor !== Array) {
            pollsObj = [pollsObj]
          }
          setPolls(pollsObj)
        }
      },
      (err) => {
        console.error(err)
        throw new Error(err.message)
      }
    )
    return () => {
      mounted = false
    }
  }, [])

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
            <div>
              {polls.map((poll) => (
                <div
                  key="poll"
                  className="container"
                  style={{
                    padding: "15px",
                    background: "white",
                    width: "500px",
                    textAlign: "center",
                    marginTop: "15px",
                  }}
                >
                  <div
                    style={{ fontFamily: "Helvetica", marginBottom: "15px" }}
                  >
                    Fun Poll
                  </div>
                  <div>
                    <button
                      style={{ padding: "5px", marginRight: "10px" }}
                      type="button"
                      onClick={() => {
                        setPoll(poll)
                        //invoke new key creation
                        generateKeysAPI(
                          (res) => {
                            console.log("maci keys are " + res.data)
                            setMaciKeyPairs(res.data)
                          },
                          (err) => {
                            console.log("key creation error: " + err)
                            throw new Error(err.message)
                          }
                        )
                        setOpenSignUpModal(true)
                        // setMaciKeyPairs({ pk: "", sk: "" })
                      }}
                    >
                      Sign Up
                    </button>
                    <button
                      style={{ padding: "5px", marginRight: "10px" }}
                      type="button"
                      onClick={() => {
                        setPoll(poll)
                        setOpenVoteModal(true)
                      }}
                    >
                      Vote Fairly!
                    </button>
                    <button
                      style={{ padding: "5px", marginRight: "10px" }}
                      type="button"
                      onClick={() => {
                        setPoll(poll)
                        setOpenResultsModal(true)
                      }}
                    >
                      Show results and Verify!
                    </button>
                  </div>
                </div>
              ))}
              <div>
                    <SignupModal
                      poll={poll}
                      open = {openSignUpModal}
                      handleClose = {() => {
                        setOpenSignUpModal(false)
                        }
                      }
                      pk={maciKeyPairs.pk}
                      sk={maciKeyPairs.sk}
                    ></SignupModal>
                  </div>
                  <div>
                    <VoteModal 
                    poll={poll}
                    isOpen = {openVoteModal}
                    handleClose = {() => {
                     setOpenVoteModal(false)
                      }
                    }/>
                  </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
