import z from 'zod'

import { createGoalCompletion } from '../../functions/create-completion'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authenticateUserHook } from '../../hooks/authenticate-user'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        description: 'Complete a goal',
        operationId: 'createCompletion',
        body: z.object({
          goalId: z.string(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { goalId } = request.body
      const userId = request.user.sub
      await createGoalCompletion({
        goalId,
        userId,
      })
      return reply.status(201).send()
    }
  )
}
