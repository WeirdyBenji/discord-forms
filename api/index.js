import Fastify from 'fastify'
import forms from './forms.json' assert {type: 'json'};
import users from './answers.json' assert {type: 'json'};

const fastify = Fastify({
  logger: true
})

fastify.get('/campaigns/:campId', async function handler (request, reply) {
  const { campId } = request.params
  const { discordId } = request.query

  const formSelected = forms.filter(e => e.slug === campId)[0]
  if (!formSelected) return reply.callNotFound();

  const usersFiltered = users.filter(e => e.discordId === discordId)
  const lastUserAnswer = usersFiltered?.[usersFiltered.length - 1];

  const discordKeys = ["discordId", "discordUsername", "discordGlobalName"]
  let url = new URL(formSelected.gformUrl)
  discordKeys.map(e => formSelected.formKeys[e]
    && request.query[e]
    && url.searchParams.append(formSelected.formKeys[e], request.query[e]))

  if (lastUserAnswer) {
    const formKeys = Object.keys(formSelected.formKeys)
      .filter(e => discordKeys.indexOf(e) === -1)
    formKeys.map(e => formSelected.formKeys[e]
      && lastUserAnswer[e]
      && url.searchParams.append(formSelected.formKeys[e], lastUserAnswer[e]))
  }

  return { url }
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
