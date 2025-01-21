import { describe, expect, it } from 'vitest'
import { makeUser } from '../../tests/factories/make-user'
import { makeGoal } from '../../tests/factories/make-goal'
import { makeGoalCompletion } from '../../tests/factories/make-goal-completion'
import { getWeekSummary } from './get-week-summary'
import dayjs from 'dayjs'

describe('create week summary', () => {
  it('should be able to get week summary', async () => {
    const weekStartsAt = dayjs(new Date(2024, 9, 10))
      .startOf('week')
      .toDate()
    const user = await makeUser()
    const goal1 = await makeGoal({
      userId: user.id,
      title: 'Test Goal',
      desiredWeeklyFrequency: 5,
      createdAt: weekStartsAt,
    })
    const goal2 = await makeGoal({
      userId: user.id,
      title: 'Test Goal 2',
      desiredWeeklyFrequency: 1,
      createdAt: weekStartsAt,
    })
    const goal3 = await makeGoal({
      userId: user.id,
      title: 'Test Goal 3',
      desiredWeeklyFrequency: 2,
      createdAt: weekStartsAt,
    })
    await makeGoalCompletion({
      goalId: goal1.id,
      createdAt: dayjs(weekStartsAt).add(2, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal2.id,
      createdAt: dayjs(weekStartsAt).add(1, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(3, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(4, 'day').toDate(),
    })
    const result = await getWeekSummary({
      userId: user.id,
      weekStartsAt,
    })

    expect(result).toEqual({
      summary: expect.objectContaining({
        total: 8,
        completed: 4,
        goalsPerDay: {
          '2024-10-10': expect.arrayContaining([
            expect.objectContaining({
              title: 'Test Goal 3',
            }),
          ]),
          '2024-10-09': expect.arrayContaining([
            expect.objectContaining({
              title: 'Test Goal 3',
            }),
          ]),
          '2024-10-08': expect.arrayContaining([
            expect.objectContaining({
              title: 'Test Goal',
            }),
          ]),
          '2024-10-07': expect.arrayContaining([
            expect.objectContaining({
              title: 'Test Goal 2',
            }),
          ]),
        },
      }),
    })
  })
})
