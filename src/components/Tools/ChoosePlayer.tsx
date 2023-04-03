import type { User } from "@prisma/client";
import React from "react";
import styles from "../../pages/index.module.css";

type ChoosePlayerProps = {
    roomPlayersNoFinder: User[];
    handleFunction: (player: User) => void;
};

const ChoosePlayer = ({roomPlayersNoFinder,handleFunction}:ChoosePlayerProps) => {
    return (
        <div  className={styles.card}>
            {Array.from(Array(roomPlayersNoFinder.length).keys()).map((index) => (
                <div key={index} onClick={() => handleFunction(roomPlayersNoFinder[index] as User)} className={styles.button}>
                    <p>{roomPlayersNoFinder[index]?.name}</p>
                </div>
            ))}
        </div>
    );
};

export default ChoosePlayer;
