import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals, users } from './schema'
async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)
  const [user] = await db
    .insert(users)
    .values([
      {
        name: 'John',
        email: 'j@j.com',
        avatarUrl: 'https://i.pravatar.cc/300?u=j@j.com',
        externalAccountId: 123,
      },
    ])
    .returning()
  const result = await db
    .insert(goals)
    .values([
      { userId: user.id, title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { userId: user.id, title: 'Fazer exercícios', desiredWeeklyFrequency: 3 },
      { userId: user.id, title: 'Leitura', desiredWeeklyFrequency: 2 },
    ])
    .returning()
  const startOfWeek = dayjs().startOf('week')
  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
