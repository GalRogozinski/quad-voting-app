/**
 * Represents a poll
 */

export type Poll = {
  pollID: number
  pollAddress: string
  //user input
  name: string
  description: string
  expirationDate: Date
  vote_options: string[]
  //UI helpers
  openModal: boolean
}

export type SignUpOps = {
  pub_key: string
  //signup gatekeeper contract
  sg_data: string
  //initial choice credit contract address
  ivcp_data: string
}
