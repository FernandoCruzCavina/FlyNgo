import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { ClientError } from '../../errors/client-error'

export async function deleteActivity(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete(
        '/trips/:tripId/activities',
        {
            schema: {
                params: z.object({
                    tripId: z.string().uuid()
                }),
                body: z.object({
                    activityId: z.string().uuid(),
                })
            },
        },
        async (request) => {
            const { tripId } = request.params
            const { activityId } = request.body

            const trip = await prisma.trip.findUnique({
                where: {id: tripId}
            })

            if(!trip){
                throw new Error('tripId not found')
            }

            const activity = await prisma.activity.findUnique({
                select: {
                    id: true,
                    title: true,
                    occurs_at: true
                },
                where: {id: activityId},
            })

            if (!activity) {
                throw new ClientError('activity not found')
            }

            await prisma.activity.delete({        
                where: {id: activityId }
            })

            return {}

        }
    )

}