import { beforeEach, describe, expect, it, vi } from 'vitest'

import { authenticateFromGithubCode } from './authenticate-from-github-code'
import { db } from '../db'
import { users } from '../db/schema'
import { and, eq, ne } from 'drizzle-orm'
import * as github from '../modules/github-oauth'
import { makeUser } from '../../tests/factories/make-user'

describe('authenticate from github code', () => {
  beforeEach(() => {
    vi.mock('../modules/github-oauth')
    vi.clearAllMocks()
  })
  it('should be able to authenticate from github code', async () => {
    vi.spyOn(github, 'getUserFromAccessToken').mockResolvedValueOnce({
      id: 1231,
      name: 'John Doe',
      email: 'j@j.com',
      avatar_url: 'https://i.pravatar.cc/300?u=j@j.com',
    })
    const sut = await authenticateFromGithubCode({
      code: '1234567890',
    })
    expect(sut.token).toEqual(expect.any(String))
    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.externalAccountId, 1231))
    expect(userOnDb.name).toEqual('John Doe')
  })
})
it('should be able to authenticate with existing github user', async () => {
  const existing = await makeUser({
    name: 'Jane Doe',
  })
  await db
    .delete(users)
    .where(
      and(
        ne(users.id, existing.id),
        eq(users.externalAccountId, existing.externalAccountId)
      )
    )
  vi.spyOn(github, 'getUserFromAccessToken').mockResolvedValueOnce({
    id: existing.externalAccountId,
    name: 'John Doe',
    email: 'j@j.com',
    avatar_url: 'https://i.pravatar.cc/300?u=j@j.com',
  })
  const sut = await authenticateFromGithubCode({
    code: '1234567890',
  })
  expect(sut.token).toEqual(expect.any(String))
  const [userOnDb] = await db
    .select()
    .from(users)
    .where(eq(users.id, existing.id))
  expect(userOnDb.name).toEqual('Jane Doe')
})
