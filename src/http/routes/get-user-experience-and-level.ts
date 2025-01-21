import { z } from 'zod'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authenticateUserHook } from '../../hooks/authenticate-user'
import { getUserLevelAndExperience } from '../../functions/get-user-level-and-experience'

export const getUserExperienceAndLevelRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/profile/gamification',
      {
        onRequest: [authenticateUserHook],
        schema: {
          tags: ['users', 'gamification'],
          description: 'get user experience and level',
          operationId: 'getUserExperienceAndLevel',
          response: {
            200: z.object({
              profile: z.object({
                experience: z.number(),
                level: z.number(),
                experienceToNextLevel: z.number(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = request.user.sub
        const { level, experience, experienceToNextLevel } =
          await getUserLevelAndExperience({
            userId,
          })
        return reply
          .code(200)
          .send({ profile: { experience, level, experienceToNextLevel } })
      }
    )
  }
