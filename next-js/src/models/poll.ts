/**
 * Represents a poll
 */

export type Poll = {
  id: string
  voteMap: Map<number, number>

  //user input
  description: string
  expirationDate: Date
  option1: string
  option2: string
  option3: string
}
