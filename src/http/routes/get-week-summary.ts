import type { FastifyPluginAsync } from 'fastify'
import { getWeekSummary } from '../../functions/get-week-summary'
import { z } from 'zod'
import { authenticateUserHook } from '../../hooks/authenticate-user'

export const getWeekSummaryRoute: FastifyPluginAsync = async app => {
  app.get(
    '/summary',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        description: 'Get week summary',
        response: {
          200: z.object({
            summary: z.array(
              z.object({
                completed: z.number(),
                total: z.number(),
                goalsPerDay: z.record(
                  z.string(),
                  z.array(
                    z.object({
                      id: z.string(),
                      title: z.string(),
                      completedAt: z.string(),
                    })
                  )
                ),
              })
            ),
          }),
        },
      },
    },
    async request => {
      const userId = request.user.sub
      const { summary } = await getWeekSummary({ userId })
      return { summary }
    }
  )
}
