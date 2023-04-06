import type {User} from "@prisma/client";
import {sample} from "underscore";
import {newScore} from "./newScore";

export function shuffleRole(roomUsers: User[]) {
    const roles: {
        userId: string;
        hasBeenFinder: boolean;
        isTruther: boolean;
        isLiar: boolean;
        isFinder: boolean;
        score: number;
    }[] = [];
    const neverBeenFinder = roomUsers.filter((user) => !user.hasBeenFinder);
    const reset = neverBeenFinder.length === 0;
    const newFinder = reset ? (sample(roomUsers) as User) : (sample(neverBeenFinder) as User);
    const noNewFinder = roomUsers.filter((user) => user.userId !== newFinder.userId);
    const newTruther = sample(noNewFinder) as User;
    
    for (let i = 0; i < roomUsers.length; i++) {
        if (roomUsers[i] !== newFinder && roomUsers[i] !== newTruther) {
            const player = roomUsers[i] as User;
            roles.push({
                userId: player.userId,
                hasBeenFinder: reset ? false : player.hasBeenFinder,
                isTruther: false,
                isFinder: false,
                isLiar: true,
                score: player.score + newScore(player)
            });
        }
    }
    roles.push({
        userId: newFinder.userId,
        hasBeenFinder: true,
        isTruther: false,
        isFinder: true,
        isLiar: false,
        score: newFinder.score + newScore(newFinder)
    });
    roles.push({
        userId: newTruther.userId,
        hasBeenFinder: reset ? false : newTruther.hasBeenFinder,
        isTruther: true,
        isFinder: false,
        isLiar: false,
        score: newTruther.score + newScore(newTruther)
    });
    return roles;
}
