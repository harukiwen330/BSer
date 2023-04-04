import type {User} from "@prisma/client";
import React from "react";
import type { LangJsonProps } from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";

type HotBtnProps = {
    langJson: LangJsonProps;
    user: User;
};

const PlayerIdTag = ({langJson, user}: HotBtnProps) => {
    return (
        <div className={styles.card}>
            <h1 className={styles.cardPlayerId}>{user.name}</h1>
            {user.isShushed && !user.isChosen && (
                <span>
                    <span className={styles.redSpan}>{langJson.isShushNotChosen}</span>
                </span>
            )}
            {user.isShushed && user.isChosen && (
                <span>
                    <span className={styles.yellowSpan}>{langJson.isShushIsChosen}</span>
                </span>
            )}
            {!user.isShushed && user.isChosen && (
                <span>
                    <span className={styles.greenSpan}>{langJson.notShushIsChosen}</span>
                </span>
            )}
        </div>
    );
};

export default PlayerIdTag;
