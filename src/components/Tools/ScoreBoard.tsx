import type {User} from "@prisma/client";
import React from "react";
import {newScore} from "~/functions/newScore";
import type { LangJsonProps } from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";

type ScoreBoardProps = {
    langJson: LangJsonProps;
    roomPlayers: User[];
};

const ScoreBoard = ({langJson, roomPlayers}: ScoreBoardProps) => {
    return (
        <div className={styles.card}>
            <h1 style={{textAlign: "center"}}>{langJson.scoreBoard}</h1>
            {Array.from(Array(roomPlayers.length).keys()).map((index) => {
                const player = roomPlayers[index] as User;
                const score = newScore(player);
                return (
                    <div key={index} style={{fontSize: "12px"}} className={styles.card}>
                        <p>
                            {player.name} [{player.isTruther && <span className={styles.greenSpan}>{langJson.truther}</span>}
                            {player.isLiar && <span className={styles.redSpan}>{langJson.liar}</span>}
                            {player.isFinder && <span className={styles.blueSpan}>{langJson.finder}</span>}] : {player?.score} (
                                <span className={score > 0 ? styles.greenSpan : score == 0 ? styles.blueSpan : styles.redSpan}>{score}</span>) 
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default ScoreBoard;
