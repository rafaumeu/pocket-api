import fastify from 'fastify'

import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPendingRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.register(fastifyCors, {
  origin: '*',
})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingRoute)
app.register(getWeekSummaryRoute)

app.listen({ port: 3000 }).then(() => {
  console.log(`
    Server listening on port 3000
    acesse em: http://localhost:3000
  `)
})
