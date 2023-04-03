import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "../trpc";

export const userRouter = createTRPCRouter({
    getUser: publicProcedure.input(z.object({userId: z.string()})).query(({ctx, input}) => {
        return ctx.prisma.user.findUnique({
            where: {
                userId: input.userId
            }
        });
    }),
    getRoomUsers: publicProcedure.input(z.object({roomId: z.string()})).query(({ctx, input}) => {
        return ctx.prisma.user.findMany({
            where: {
                roomId: input.roomId
            }
        });
    }),
    createUser: publicProcedure
        .input(
            z.object({
                roomId: z.string(),
                userId: z.string(),
                name: z.string(),
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.user.create({
                data: {
                    name: input.name,
                    roomId: input.roomId,
                    userId: input.userId,
                    isHost: false,
                    isFinder: false,
                    isLiar: false,
                    isTruther: false,
                    isShushed: false,
                    isCorrectlyShushed: false,
                    isCorrectlyChosen: false,
                    isChosen: false,
                    score: 0
                }
            });
        }),
    newGame: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                isTruther: z.boolean(),
                isFinder: z.boolean(),
                isLiar: z.boolean(),
                score: z.number()
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.user.update({
                where: {userId: input.userId},
                data: {
                    isTruther: input.isTruther,
                    isLiar: input.isLiar,
                    isFinder: input.isFinder,
                    isCorrectlyShushed: false,
                    isCorrectlyChosen: false,
                    isChosen: false,
                    isShushed: false,
                    score: input.score
                }
            });
        }),
    shush: publicProcedure.input(z.object({userId: z.string()})).mutation(({ctx, input}) => {
        return ctx.prisma.user.update({
            where: {userId: input.userId},
            data: {isShushed: true}
        });
    }),
    usedShush: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                isCorrectlyShushed: z.boolean()
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.user.update({
                where: {userId: input.userId},
                data: {
                    isCorrectlyShushed: input.isCorrectlyShushed
                }
            });
        }),
    choice: publicProcedure.input(z.object({userId: z.string()})).mutation(({ctx, input}) => {
        return ctx.prisma.user.update({
            where: {userId: input.userId},
            data: {isChosen: true}
        });
    }),
    usedChoice: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                isCorrectlyChosen: z.boolean()
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.user.update({
                where: {userId: input.userId},
                data: {
                    isCorrectlyChosen: input.isCorrectlyChosen
                }
            });
        }),
    deleteUser: publicProcedure
        .input(
            z.object({
                userId: z.string()
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.user.delete({
                where: {
                    userId: input.userId
                }
            });
        }),
    deleteRoomUsers: publicProcedure
        .input(
            z.object({
                roomId: z.string()
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.user.deleteMany({
                where: {
                    roomId: input.roomId
                }
            });
        }),
    cleanUsers: publicProcedure.mutation(({ctx}) => {
        return ctx.prisma.user.deleteMany({
            where: {
                updateAt: {
                    lt: new Date(Date.now() - 1000 * 60 * 20)
                }
            }
        });
    })
});
