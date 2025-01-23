import { z } from 'zod'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getUser } from '../../functions/get-user'
import { authenticateUserHook } from '../../hooks/authenticate-user'

export const getProfileRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/profile',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['auth'],
        description: 'get authenticated user profile',
        operationId: 'getProfile',
        response: {
          200: z.object({
            profile: z.object({
              id: z.string(),
              name: z.string().nullable(),
              email: z.string().nullable(),
              avatarUrl: z.string().url(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub
      const { user } = await getUser({
        userId,
      })
      return reply.code(200).send({ profile: user })
    }
  )
}
