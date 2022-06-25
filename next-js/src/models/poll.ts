/**
 * Represents a poll
 */

export type Poll = {
  id: string
  description: string
  expirationDate: Date
  option1: string
  option2: string
  option3: string
  voteMap: Map<number, number>
}
