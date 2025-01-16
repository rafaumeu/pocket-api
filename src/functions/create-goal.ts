import { db } from '../db'
import { goals } from '../db/schema'

interface CreadeGoalRequest {
  title: string,
  desiredWeeklyFrequency: number
}
export async function createGoal({title, desiredWeeklyFrequency}: CreadeGoalRequest) {
  const result = await db.insert(goals).values({
    title,
    desiredWeeklyFrequency
  }).returning()

  const goal = result[0]

  return {
    goal
  }
}