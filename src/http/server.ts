import fastify from 'fastify'

const app = fastify()

app.listen({ port: 3000 }).then(() => {
  console.log(`
    Server listening on port 3000
    acesse em: http://localhost:3000
  `)
})
