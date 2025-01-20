import { beforeEach, describe, expect, it } from 'vitest'
import { users } from '../db/schema'
import { db } from '../db'
import { getUser } from './get-user'
import { eq } from 'drizzle-orm'

describe('get user', () => {
  beforeEach(async () => {
    await db.delete(users).where(eq(users.id, 'john-doe'))
  })
  it('should be able to get a user', async () => {
    await db.insert(users).values({
      id: 'john-doe',
      avatarUrl: 'https://i.pravatar.cc/300?u=j@j.com',
      externalAccountId: 123,
    })
    const result = await getUser({ userId: 'john-doe' })
    expect(result).toEqual({
      user: {
        id: 'john-doe',
        name: null,
        email: null,
        avatarUrl: 'https://i.pravatar.cc/300?u=j@j.com',
      },
    })
  })
})
