import { shuffle } from "underscore";

export function shuffleRole(numOfPlayers: number) {
    const roles: {
        isTruther: boolean;
        isLiar: boolean;
        isFinder: boolean;
    }[] = [
        {isFinder: true, isLiar: false, isTruther: false},
        {isFinder: false, isLiar: false, isTruther: true},
        {isFinder: false, isLiar: true, isTruther: false}
    ];
    for (let i = 0; i < numOfPlayers - 3; i++) {
        roles.push({isFinder: false, isLiar: true, isTruther: false});
    }
    return shuffle(roles);
}
