import type {User} from "@prisma/client";

export function newScore(player: User):number {
    let score = 0;
    if (player.isFinder && player.isCorrectlyShushed) {
        score++;
    }
    if ((player.isFinder && !player.isCorrectlyShushed) || (player.isLiar && player.isShushed) || (player.isTruther && player.isShushed)) {
        score--;
    }
    if ((player.isFinder && player.isCorrectlyChosen) || (player.isTruther && player.isChosen) || (player.isLiar && player.isChosen)) {
        score++;
    }
    return score
}
