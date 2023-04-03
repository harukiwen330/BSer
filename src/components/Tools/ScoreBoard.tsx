import type {User} from "@prisma/client";
import React from "react";
import {newScore} from "~/functions/newScore";
import styles from "../../pages/index.module.css";

type ScoreBoardProps = {
    roomPlayers: User[];
};

const ScoreBoard = ({roomPlayers}: ScoreBoardProps) => {
    return (
        <div className={styles.card}>
            <h1 style={{textAlign: "center"}}>Score Board</h1>
            {Array.from(Array(roomPlayers.length).keys()).map((index) => {
                const player = roomPlayers[index] as User;
                const score = newScore(player);
                return (
                    <div key={index} style={{fontSize: "12px"}} className={styles.card}>
                        <p>
                            {player.name} [{player.isTruther && <span className={styles.greenSpan}>Truth Teller</span>}
                            {player.isLiar && <span className={styles.redSpan}>Liar</span>}
                            {player.isFinder && <span className={styles.blueSpan}>Finder</span>}] : {player?.score} (
                                <span className={score > 0 ? styles.greenSpan : score == 0 ? styles.blueSpan : styles.redSpan}>{score}</span>) 
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default ScoreBoard;
