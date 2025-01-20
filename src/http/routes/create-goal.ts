import { z } from 'zod'

import { createGoal } from '../../functions/create-goal'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        tags: ['goals'],
        description: 'Create a goal',
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { title, desiredWeeklyFrequency } = request.body
      await createGoal({
        title,
        desiredWeeklyFrequency,
      })
      return reply.code(201).send({})
    }
  )
}
