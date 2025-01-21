import { describe, expect, it } from 'vitest'
import { makeUser } from '../../tests/factories/make-user'
import { makeGoal } from '../../tests/factories/make-goal'
import { createGoalCompletion } from './create-completion'
import { makeGoalCompletion } from '../../tests/factories/make-goal-completion'

describe('create goal completion', () => {
  it('should be able to create a new goal', async () => {
    const user = await makeUser()
    const goal = await makeGoal({ userId: user.id })

    const result = await createGoalCompletion({
      userId: user.id,
      goalId: goal.id,
    })
    expect(result).toEqual({
      goalCompletion: expect.objectContaining({
        id: expect.any(String),
        goalId: goal.id,
      }),
    })
  })
})
it('should not be able to complete a goal more times them it expects', async () => {
  const user = await makeUser()
  const goal = await makeGoal({ userId: user.id, desiredWeeklyFrequency: 1 })
  await makeGoalCompletion({ goalId: goal.id })
  await expect(
    createGoalCompletion({ userId: user.id, goalId: goal.id })
  ).rejects.toThrow()
})
