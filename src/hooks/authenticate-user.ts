import type { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticateUserHook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.code(401).send({ message: 'Unauthorized' })
  }
}
