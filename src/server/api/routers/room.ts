import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "../trpc";

export const roomRouter = createTRPCRouter({
    getRoom: publicProcedure.input(z.object({roomId: z.string()})).query(({ctx, input}) => {
        return ctx.prisma.room.findUnique({
            where: {roomId: input.roomId}
        });
    }),
    createRoom: publicProcedure.input(z.object({
        lang: z.string(),
        roomId: z.string(), 
        userId: z.string(), 
        name: z.string()
    })).mutation(({ctx, input}) => {
        return ctx.prisma.room.create({
            data: {
                lang: input.lang,
                roomId: input.roomId,
                users: {
                    create: {
                        name: input.name,
                        userId: input.userId,
                        isHost: true,
                        isFinder: false,
                        isLiar: false,
                        isTruther: false,
                        isShushed: false,
                        isChosen: false,
                        isCorrectlyShushed: false,
                        isCorrectlyChosen: false,
                        score: 0
                    }
                },
                isShushUsed: false,
                isChoiceUsed: false,
                isShowingText: false,
                isGameStart: false,
                title: "",
                category: "",
                text: "",
                playerIds: [input.userId]
            }
        });
    }),
    newGame: publicProcedure.input(z.object({roomId: z.string(), playerIds: z.string().array()})).mutation(({ctx, input}) => {
        return ctx.prisma.room.update({
            where: {
                roomId: input.roomId
            },
            data: {
                isShowingText: false,
                isShushUsed: false,
                isChoiceUsed: false,
                title: "",
                category: "",
                text: "",
                playerIds: input.playerIds
            }
        });
    }),
    lockWord: publicProcedure
        .input(
            z.object({
                roomId: z.string(),
                title: z.string(),
                category: z.string(),
                text: z.string()
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.room.update({
                where: {
                    roomId: input.roomId
                },
                data: {
                    isShowingText: true,
                    title: input.title,
                    category: input.category,
                    text: input.text
                }
            });
        }),
    hideText: publicProcedure
        .input(
            z.object({
                roomId: z.string()
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.room.update({
                where: {
                    roomId: input.roomId
                },
                data: {
                    isShowingText: false
                }
            });
        }),
    usedShush: publicProcedure
        .input(
            z.object({
                roomId: z.string()
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.room.update({
                where: {
                    roomId: input.roomId
                },
                data: {
                    isShushUsed: true
                }
            });
        }),
    usedChoice: publicProcedure
        .input(
            z.object({
                roomId: z.string()
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.room.update({
                where: {
                    roomId: input.roomId
                },
                data: {
                    isChoiceUsed: true
                }
            });
        }),
    deleteRoom: publicProcedure
        .input(
            z.object({
                roomId: z.string()
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.room.deleteMany({
                where: {
                    roomId: input.roomId
                }
            });
        }),
    cleanRoom: publicProcedure.mutation(({ctx}) => {
        return ctx.prisma.room.deleteMany({
            where: {
                updateAt: {
                    lt: new Date(Date.now() - 1000 * 60 * 20)
                }
            }
        });
    })
});
