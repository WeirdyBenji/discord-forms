import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

const forms = [
  { id: 1, slug: "pm0324" },
  { id: 2, slug: "mtp24" },
  { id: 3, slug: "spb24" },
  { id: 4, slug: "pm1024" },
  { id: 5, slug: "pau24" },
  { id: 6, slug: "tls24" },
]
const answers = [{
  id: 1,
  discordId: "121212121212",
  formSlug: "mtp24"
}]

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

fastify.get('/campaigns/:id', async function handler (request, reply) {
  const form = forms.filter(e => e.slug === request.params.id)[0]
  if (!form) return reply.callNotFound();
  return form
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
