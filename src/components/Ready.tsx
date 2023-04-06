import React from "react";
import QrCode from "./Tools/QrCode";
import styles from "../pages/index.module.css";
import MenuBtn from "./Tools/MenuBtn";
import NewBtn from "./Tools/NewBtn";
import type {User} from "@prisma/client";
import type {LangJsonProps} from "~/languages/langJsonProps";

type ReadyProps = {
    langJson: LangJsonProps;
    roomId: string;
    url: string;
    isHost: boolean;
    roomUsers: User[];
    handleLeave: () => void;
    handleNewGame: () => void;
};

const Ready = ({langJson, roomId, url, isHost, roomUsers, handleLeave, handleNewGame}: ReadyProps) => {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{roomId}</h1>
            <br />
            <span className={styles.yellowSpan}>
                <i>{roomUsers.length}/7</i>
            </span>
            <div className={styles.container}>
                <QrCode langJson={langJson} url={url} />

                {!isHost && (
                    <h3 className={styles.cardText}>
                        <span className={styles.yellowSpan}>
                            <i>{roomUsers.length < 3 ? langJson.notEnoughMsg : langJson.waitHostMsg}</i>
                        </span>
                    </h3>
                )}

                {isHost && roomUsers.length >= 3 && roomUsers.length <= 7 && <NewBtn langJson={langJson} handleNewGame={handleNewGame} />}
                <MenuBtn returnMenu={handleLeave} />
            </div>
        </main>
    );
};

export default Ready;
