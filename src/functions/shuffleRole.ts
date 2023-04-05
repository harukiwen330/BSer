import type {User} from "@prisma/client";
import {sample, without} from "underscore";
import {newScore} from "./newScore";

export function shuffleRole(roomUsers: User[]) {
    const roles: {
        playerId: string;
        hasBeenFinder: boolean;
        isTruther: boolean;
        isLiar: boolean;
        isFinder: boolean;
        score: number;
    }[] = [];
    const neverBeenFinder = roomUsers.filter((user) => !user.hasBeenFinder);
    const reset = neverBeenFinder.length === 0;
    const newFinder = reset ? (sample(roomUsers) as User) : (sample(neverBeenFinder) as User);
    const newTruther = sample(without(roomUsers, newFinder)) as User;

    roles.push(
        {
            playerId: newFinder.userId,
            hasBeenFinder: true,
            isTruther: false,
            isFinder: true,
            isLiar: false,
            score: newFinder.score + newScore(newFinder)
        },
        {
            playerId: newTruther.userId,
            hasBeenFinder: reset ? false : newTruther.hasBeenFinder,
            isTruther: true,
            isFinder: false,
            isLiar: false,
            score: newTruther.score + newScore(newTruther)
        }
    );

    for (let i = 0; i < roomUsers.length; i++) {
        if (roomUsers[i]?.userId !== newFinder.userId  &&
            roomUsers[i]?.userId !== newTruther.userId) {
            roles.push({
                playerId: roomUsers[i]?.userId as string,
                hasBeenFinder: reset ? false : (roomUsers[i]?.hasBeenFinder as boolean),
                isTruther: false,
                isFinder: false,
                isLiar: true,
                score: (roomUsers[i]?.score as number) + newScore(roomUsers[i] as User)
            });
        }
    }
    return roles;
}
