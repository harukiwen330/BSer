import type {User} from "@prisma/client";
import React from "react";
import styles from "../../pages/index.module.css";

type HotBtnProps = {
    user: User;
};

const PlayerIdTag = ({user}: HotBtnProps) => {
    return (
        <div className={styles.card}>
            <h1 className={styles.cardPlayerId}>{user.name}</h1>
            {user.isShushed && !user.isChosen && (
                <span>
                    You got <span className={styles.redSpan}>shushed</span> by Finder.
                </span>
            )}
            {user.isShushed && user.isChosen && (
                <span>
                    You got <span className={styles.redSpan}>shushed</span> & <span className={styles.greenSpan}>chosen</span> by Finder, weirdly.
                </span>
            )}
            {!user.isShushed && user.isChosen && (
                <span>
                    You have been <span className={styles.greenSpan}>chosen</span> by Finder.
                </span>
            )}
        </div>
    );
};

export default PlayerIdTag;
