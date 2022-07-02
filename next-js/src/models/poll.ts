/**
 * Represents a poll
 */

export type Poll = {
  id: string

  //user input
  description: string
  expirationDate: Date
  option1: string
  option2: string
  option3: string
}
