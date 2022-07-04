/**
 * Represents a poll
 */

export type Poll = {
  //contract info
  pollID: number
  pollAddress: string
  maciAddress: string

  //user input
  name: string
  description: string
  expirationDate: Date
  voteOptions: string[]
  //tally
  newTallCommitment: string
  tally: number[]
  //UI helpers
  openSignUpModal: boolean
  openVoteModal: boolean
  openResultsModal: boolean
}

export type SignUpOps = {
  pubKey: string
  //signup gatekeeper contract
  sgData: string
  //initial choice credit contract address
  ivcpData: string
}

export type PublishOps = {
  pollID: number
  privKey: string
  pubKey: string
  maciAddress: string
  stateIndex: number
  voteOptionIndex: number
  nonce: number
  newPubkey: string
  salt: string
}

export type MaciKeyPair = {
  pk: string
  sk: string
}
