import type {Room, User} from "@prisma/client";
import React from "react";
import styles from "../../pages/index.module.css";
import PlayerIdTag from "../Tools/PlayerIdTag";
import ScoreBoard from "../Tools/ScoreBoard";
import TopicInfo from "../Tools/TopicInfo";
import TruthInfo from "../Tools/TruthInfo";

type LiarProps = {
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
const Liar = ({isChoosingWord, isWaitingPlayer, isShushingPlayer, isChoosingPlayer, isResult, room, user, roomPlayers, role}: LiarProps) => {
    return (
        <div className={styles.container}>
            {isChoosingWord && (
                <div className={styles.card}>
                    <p>Waiting for Finder to pick the word.</p>
                </div>
            )}
            {isWaitingPlayer && (
                <>
                    <h2 className={styles.cardTitle}>
                        <span className={styles.yellowSpan}>30s</span> to read
                    </h2>
                    <div className={styles.card}>
                        <h2>{room.title}</h2>
                        <p>{room.category}</p>
                        <p style={{textAlign:"left"}}>Pretend you&apos;re reading the definition! Invent the description and convince the Finder that it&apos;s true! The Truth Teller has details such as the event&apos;s date, specific information, and location. Some provided paragraphs can be quite lengthy! Mimicking the act of scrolling down can enhance the realism of your acting!</p>
                    </div>
                    <h1 style={{color: "white"}} className={styles.cardText}>
                        {role}
                    </h1>
                </>
            )}
            {isShushingPlayer && (
                <>
                    <PlayerIdTag user={user} />
                    <TopicInfo room={room} />
                    <div className={styles.card}>
                        <p>Finder will shush a player</p>
                    </div>
                </>
            )}
            {isChoosingPlayer && (
                <>
                    <PlayerIdTag user={user} />
                    <TopicInfo room={room} />
                    <div className={styles.card}>
                        <p>Finder will choose who is Truth Teller</p>
                    </div>
                </>
            )}
            {isResult && (
                <>
                    <PlayerIdTag user={user} />
                    <ScoreBoard roomPlayers={roomPlayers} />
                    <TruthInfo room={room} />
                </>
            )}
        </div>
    );
};

export default Liar;