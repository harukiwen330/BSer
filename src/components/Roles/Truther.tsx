import type {Room, User} from "@prisma/client";
import React from "react";
import type {LangJsonProps} from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";
import PlayerIdTag from "../Tools/PlayerIdTag";
import ScoreBoard from "../Tools/ScoreBoard";
import TopicInfo from "../Tools/TopicInfo";
import TruthInfo from "../Tools/TruthInfo";

type TrutherProps = {
    langJson: LangJsonProps;
    isChoosingWord: boolean;
    isWaitingPlayer: boolean;
    isShushingPlayer: boolean;
    isChoosingPlayer: boolean;
    isResult: boolean;
    room: Room;
    user: User;
    roomPlayers: User[];
    role: string;
};
const Truther = ({langJson, isChoosingWord, isWaitingPlayer, isShushingPlayer, isChoosingPlayer, isResult, room, user, roomPlayers, role}: TrutherProps) => {
    return (
        <div className={styles.container}>
            {isChoosingWord && (
                <div className={styles.card}>
                    <p>{langJson.waitingOther}</p>
                </div>
            )}
            {isWaitingPlayer && (
                <>
                    <h1 style={{color: "white"}} className={styles.cardText}>
                        {role}
                    </h1>
                    <h2 className={styles.cardTitle}>
                        <span className={styles.yellowSpan}>{langJson.readingOther}</span>
                    </h2>
                    <TruthInfo room={room} />
                </>
            )}
            {isShushingPlayer && (
                <>
                    <PlayerIdTag langJson={langJson} user={user} />
                    <TopicInfo room={room} />
                    <div className={styles.card}>
                        <p>{langJson.shushOther}</p>
                    </div>
                </>
            )}
            {isChoosingPlayer && (
                <>
                    <PlayerIdTag langJson={langJson} user={user} />
                    <TopicInfo room={room} />
                    <div className={styles.card}>
                        <p>{langJson.pickOther}</p>
                    </div>
                </>
            )}
            {isResult && (
                <>
                    <PlayerIdTag langJson={langJson} user={user} />
                    <ScoreBoard langJson={langJson} roomPlayers={roomPlayers} />
                    <TruthInfo room={room} />
                </>
            )}
        </div>
    );
};

export default Truther;
