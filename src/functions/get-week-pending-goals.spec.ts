import { describe, expect, it } from 'vitest'
import { makeUser } from '../../tests/factories/make-user'
import { makeGoal } from '../../tests/factories/make-goal'
import { makeGoalCompletion } from '../../tests/factories/make-goal-completion'
import { getWeekPendingGoals } from './get-week-pending-goals'

describe('create goal completion', () => {
  it('should be able to get week pending goals', async () => {
    const user = await makeUser()
    const goal1 = await makeGoal({
      userId: user.id,
      title: 'Test Goal',
      desiredWeeklyFrequency: 5,
    })
    const goal2 = await makeGoal({
      userId: user.id,
      title: 'Test Goal 2',
      desiredWeeklyFrequency: 1,
    })
    const goal3 = await makeGoal({
      userId: user.id,
      title: 'Test Goal 3',
      desiredWeeklyFrequency: 2,
    })
    await makeGoalCompletion({ goalId: goal1.id })
    await makeGoalCompletion({ goalId: goal2.id })
    await makeGoalCompletion({ goalId: goal3.id })
    await makeGoalCompletion({ goalId: goal3.id })
    const result = await getWeekPendingGoals({ userId: user.id })
    expect(result).toEqual({
      pendingGoals: expect.arrayContaining([
        expect.objectContaining({
          title: 'Test Goal',
          desiredWeeklyFrequency: 5,
          completionCount: 1,
        }),
        expect.objectContaining({
          title: 'Test Goal 2',
          desiredWeeklyFrequency: 1,
          completionCount: 1,
        }),
        expect.objectContaining({
          title: 'Test Goal 3',
          desiredWeeklyFrequency: 2,
          completionCount: 2,
        }),
      ]),
    })
  })
})
