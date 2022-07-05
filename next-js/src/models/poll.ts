/**
 * Represents a poll
 */

export type Poll = {
  //contract info
  pollID: number
  pollAddr: string
  maciAddress: string

  //user input
  poll_name: string
  description: string
  expirationDate: Date
  vote_options: string[]
  //tally
  newTallCommitment: string
  tally: number[]
  //UI helpers
  openSignUpModal: boolean
  openVoteModal: boolean
  openResultsModal: boolean
}

export type SignUpOps = {
  pub_key: string
  //signup gatekeeper contract
  sg_data: string
  //initial choice credit contract address
  ivcp_data: string
}

export type PublishOps = {
  pollID: number
  privKey: string
  pubKey: string
  maciAddress: string
  stateID: number
  voteOptionIndex: number
  nonce: number
  newPubkey: string
  salt: string
}

export type MaciKeyPair = {
  pk: string
  sk: string
}
