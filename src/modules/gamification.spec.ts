import { expect, test } from 'vitest'
import {
  calculateExperienceForNextLevel,
  calculateLevelFromExperience,
} from './gamification'

test('total experience to level ', async () => {
  const exp1 = calculateExperienceForNextLevel(1)
  const exp2 = calculateExperienceForNextLevel(2)
  const exp4 = calculateExperienceForNextLevel(3)
  expect(exp1).toEqual(20)
  expect(exp2).toEqual(20 + 26)
  expect(exp4).toEqual(20 + 26 + 33)
})
test('level from experience', async () => {
  const level1 = calculateLevelFromExperience(5)
  const level2 = calculateLevelFromExperience(20)
  const level4 = calculateLevelFromExperience(20 + 26 + 33 + 43)
  expect(level1).toEqual(1)
  expect(level2).toEqual(2)
  expect(level4).toEqual(4)
})
