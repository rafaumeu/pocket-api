import z from 'zod'

import { createGoalCompletion } from '../../functions/create-completion'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        tags: ['goals'],
        description: 'Complete a goal',
        body: z.object({
          goalId: z.string(),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { goalId } = request.body
      await createGoalCompletion({
        goalId,
      })
      return reply.status(201).send()
    }
  )
}
