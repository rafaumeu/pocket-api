import type { FastifyPluginAsync } from 'fastify'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'

export const getPendingRoute: FastifyPluginAsync = async app => {
  app.get('/pending-goals', async () => {
    const { pendingGoals } = await getWeekPendingGoals()
    return { pendingGoals }
  })
}
