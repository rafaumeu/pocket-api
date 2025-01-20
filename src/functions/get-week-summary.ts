import { and, desc, eq, gte, lte, sql } from 'drizzle-orm'
import { goalCompletions, goals } from '../db/schema'
import { db } from '../db'
import dayjs from 'dayjs'
interface GetWeekSummaryRequest {
  userId: string
}
export async function getWeekSummary({ userId }: GetWeekSummaryRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()
  const goalsCreateUptoWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(and(lte(goals.createdAt, lastDayOfWeek), eq(goals.userId, userId)))
  )
  const goalCompletedInWeek = db.$with('goal_completion_in_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        completedAtDate: sql`
        DATE(${goalCompletions.createdAt})
        `.as('completedAtDate'),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))

      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goals.userId, userId)
        )
      )
      .orderBy(desc(goalCompletions.createdAt))
  )
  const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
    db
      .select({
        completedAtDate: goalCompletedInWeek.completedAtDate,
        completions: sql`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${goalCompletedInWeek.id},
              'title', ${goalCompletedInWeek.title},
              'completedAt', ${goalCompletedInWeek.completedAt}
            )
          )
          `.as('completions'),
      })
      .from(goalCompletedInWeek)
      .groupBy(goalCompletedInWeek.completedAtDate)
      .orderBy(desc(goalCompletedInWeek.completedAtDate))
  )
  type GoalsPerDay = Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >
  const result = await db
    .with(goalsCreateUptoWeek, goalCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      complete: sql`(SELECT COUNT(*) FROM ${goalCompletedInWeek})`.mapWith(
        Number
      ),
      total:
        sql`(SELECT SUM(${goalsCreateUptoWeek.desiredWeeklyFrequency}) FROM ${goalsCreateUptoWeek})`.mapWith(
          Number
        ),
      goalsPerDay: sql<GoalsPerDay>`
      JSON_OBJECT_AGG(
        ${goalsCompletedByWeekDay.completedAtDate},
        ${goalsCompletedByWeekDay.completions}
      )
      `,
    })
    .from(goalsCompletedByWeekDay)
  return { summary: result[0] }
}
