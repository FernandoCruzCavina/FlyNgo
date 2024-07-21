import fastify from 'fastify'
import cors from '@fastify/cors'
import { createTrip } from './routes/trip/create-trip'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { confirmTrip } from './routes/trip/confirm-trip'
import { confirmParticipants } from './routes/participant/confirm-participant'
import { createActivity } from './routes/activities/create-activity'
import { getActivities } from './routes/activities/get-activities'
import { deleteActivity } from './routes/activities/delete-activity'
import { createLink } from './routes/link/create-link'
import { getLinks } from './routes/link/get-links'
import { deleteLink } from './routes/link/delete-link'
import { getParticipants } from './routes/participant/get-participants'
import { createInvite } from './routes/participant/create-invite'
import { updateTrip } from './routes/trip/update-trip'
import { getTripDetails } from './routes/trip/get-trip-details'
import { getParticipant } from './routes/participant/get-participant'
import { deleteParticipants } from './routes/participant/delete-participants'
import { errorHandler } from './error-handler'
import { env } from './env'


const app = fastify()

app.register(cors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipants)
app.register(createActivity)
app.register(getActivities)
app.register(deleteActivity)
app.register(createLink)
app.register(getLinks)
app.register(deleteLink)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)
app.register(deleteParticipants)

app.listen({ port: env.PORT }).then(() => {
  console.log('Server running!')
})
