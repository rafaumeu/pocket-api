import type { FastifyPluginAsync } from 'fastify'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'
import { z } from 'zod'
import { authenticateUserHook } from '../../hooks/authenticate-user'

export const getPendingRoute: FastifyPluginAsync = async app => {
  app.get(
    '/pending-goals',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        description: 'Get pending goals for the current week',
        response: {
          200: z.object({
            pendingGoals: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                desiredWeeklyFrequency: z.number(),
                completionCount: z.number(),
              })
            ),
          }),
        },
      },
    },
    async request => {
      const userId = request.user.sub
      const { pendingGoals } = await getWeekPendingGoals({ userId })
      return { pendingGoals }
    }
  )
}
