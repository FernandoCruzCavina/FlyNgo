import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { ClientError } from '../../errors/client-error'

export async function deleteLink(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete(
        '/trips/:tripId/links',
        {
            schema: {
                params: z.object({
                    tripId: z.string().uuid()
                }),
                body: z.object({
                    linkId: z.string().uuid(),
                })
            },
        },
        async (request) => {
            const { tripId } = request.params
            const { linkId } = request.body

            const trip = await prisma.trip.findUnique({
                where: {id: tripId}
            })

            if(!trip){
                throw new Error('tripId not found')
            }

            const link = await prisma.link.findUnique({
                select: {
                    id: true,
                    title: true,
                    url: true
                },
                where: {id: linkId},
            })

            if (!link) {
                throw new ClientError('Link not found')
            }

            await prisma.link.delete({        
                where: {id: linkId }
            })

            return 

        }
    )

}