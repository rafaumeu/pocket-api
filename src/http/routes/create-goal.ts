import { z } from 'zod'

import { createGoal } from '../../functions/create-goal'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authenticateUserHook } from '../../hooks/authenticate-user'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        description: 'Create a goal',
        operationId: 'createGoal',
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { title, desiredWeeklyFrequency } = request.body
      const userId = request.user.sub
      await createGoal({
        title,
        desiredWeeklyFrequency,
        userId,
      })
      return reply.code(201).send()
    }
  )
}
