import fastify from 'fastify'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPendingRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { authenticateFromGithubRoute } from './routes/authenticate-from-github'
import fastifyJwt from '@fastify/jwt'
import { env } from '../env'
import { getProfileRoute } from './routes/get-profile'
import { getUserExperienceAndLevelRoute } from './routes/get-user-experience-and-level'
import { resolve } from 'node:path'
import { writeFile } from 'node:fs/promises'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.register(fastifyCors, {
  origin: '*',
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'in.orbit',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})
app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingRoute)
app.register(getWeekSummaryRoute)
app.register(authenticateFromGithubRoute)
app.register(getProfileRoute)
app.register(getUserExperienceAndLevelRoute)

app.listen({ port: 3000 }).then(() => {
  console.log(`
    Server listening on port 3000
    acesse em: http://localhost:3000
  `)
})

if (env.NODE_ENV === 'development') {
  const specFile = resolve(__dirname, '../../swagger.json')
  app.ready().then(() => {
    const spec = JSON.stringify(app.swagger(), null, 2)
    writeFile(specFile, spec).then(() => {
      console.log(`Swagger spec written to ${specFile}`)
    })
  })
}
