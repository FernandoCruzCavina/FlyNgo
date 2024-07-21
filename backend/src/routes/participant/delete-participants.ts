import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { ClientError } from '../../errors/client-error'

export async function deleteParticipants(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete(
        '/trips/:tripId/participants',
        {
            schema: {
                params: z.object({
                    tripId: z.string().uuid()
                }),
                body: z.object({
                    participantId: z.string().uuid(),
                })
            },
        },
        async (request) => {
            const { tripId } = request.params
            const { participantId } = request.body

            const trip = await prisma.trip.findUnique({
                where: {id: tripId}
            })

            if(!trip){
                throw new Error('tripId not found')
            }

            const participant = await prisma.participant.findUnique({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    is_confirmed: true,
                },
                where: {id: participantId},
            })

            if (!participant) {
                throw new ClientError('Participant not found')
            }

            await prisma.participant.delete({        
                where: {id: participantId}
            })

            return {}

        }
    )

}