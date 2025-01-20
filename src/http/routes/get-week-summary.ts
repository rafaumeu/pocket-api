import type { FastifyPluginAsync } from 'fastify'
import { getWeekSummary } from '../../functions/get-week-summary'
import { z } from 'zod'

export const getWeekSummaryRoute: FastifyPluginAsync = async app => {
  app.get(
    '/summary',
    {
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
    async () => {
      const { summary } = await getWeekSummary()
      return { summary }
    }
  )
}
