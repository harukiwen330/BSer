import type {Room, User} from "@prisma/client";
import React  from "react";
import styles from "../../pages/index.module.css";
import type {WikipediaProps} from "~/pages/room/[roomId]/user/[userId]";
import ScoreBoard from "../Tools/ScoreBoard";
import PlayerIdTag from "../Tools/PlayerIdTag";
import ChoosePlayer from "../Tools/ChoosePlayer";
import TopicInfo from "../Tools/TopicInfo";
import TruthInfo from "../Tools/TruthInfo";
import type {LangJsonProps} from "~/languages/langJsonProps";

type FinderProps = {
    isLoading: boolean;
    words: WikipediaProps;
    langJson: LangJsonProps;
    isChoosingWord: boolean;
    isWaitingPlayer: boolean;
    isShushingPlayer: boolean;
    isChoosingPlayer: boolean;
    isResult: boolean;
    role: string;
    user: User;
    roomPlayersNoFinder: User[];
    roomPlayers: User[];
    room: Room;
    handleChosenWord: () => void;
    handleNextWord: () => void;
    handleShush: (player: User) => void;
    handleChoose: (player: User) => void;
    handleNewGame: () => void;
};

const Finder = ({
    isLoading,
    words,
    langJson,
    isChoosingWord,
    isWaitingPlayer,
    isShushingPlayer,
    isChoosingPlayer,
    isResult,
    role,
    user,
    roomPlayersNoFinder,
    roomPlayers,
    room,
    handleChosenWord,
    handleNextWord,
    handleShush,
    handleChoose,
    handleNewGame
}: FinderProps) => {
    return (
        <div className={styles.container}>
            {isChoosingWord && (
                <>
                    <h1 className={styles.cardTitle}>
                        <span className={styles.yellowSpan}>{langJson.chooseWordMsg}</span>
                    </h1>
                    <div className={styles.card}>
                        <h2>{words.title}</h2>
                        <p>{words.category}</p>
                        {!isLoading && (
                            <>
                                <div style={{textAlign: "center"}} className={styles.button} onClick={handleChosenWord}>
                                    <span className={styles.yellowSpan}>{langJson.choose}</span>
                                </div>
                                <div style={{textAlign: "center"}} className={styles.button} onClick={handleNextWord}>
                                    {langJson.change}
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            {isWaitingPlayer && (
                <>
                    <h1 style={{color: "white"}} className={styles.cardText}>
                        {role}
                    </h1>
                    <h1 className={styles.cardTitle}>
                        <span className={styles.yellowSpan}>{langJson.waitFinder}</span>
                    </h1>
                    <TopicInfo room={room} />
                    <div className={styles.card}>
                        <p className={styles.cardText}>{langJson.waitFinderMsg1}</p>
                        <p className={styles.cardText}>{langJson.waitFinderMsg2}</p>
                    </div>
                </>
            )}
            {isShushingPlayer && (
                <>
                    <PlayerIdTag langJson={langJson} user={user} />
                    <TopicInfo room={room} />
                    <p className={styles.cardTitle}>
                        <span className={styles.redSpan}>{langJson.shushFinder}</span>
                    </p>
                    {!isLoading && <ChoosePlayer roomPlayersNoFinder={roomPlayersNoFinder} handleFunction={handleShush} />}
                </>
            )}
            {isChoosingPlayer && (
                <>
                    <PlayerIdTag langJson={langJson} user={user} />
                    <TopicInfo room={room} />
                    <h2 className={styles.cardTitle}>
                        <span className={styles.greenSpan}>{langJson.pickFinder}</span>
                    </h2>
                    {!isLoading && <ChoosePlayer roomPlayersNoFinder={roomPlayersNoFinder} handleFunction={handleChoose} />}
                </>
            )}
            {isResult && (
                <>
                    <PlayerIdTag langJson={langJson} user={user} />
                    <ScoreBoard langJson={langJson} roomPlayers={roomPlayers} />
                    {!isLoading && (
                        <div style={{textAlign: "center"}} className={styles.button} onClick={handleNewGame}>
                            {langJson.newGame}
                        </div>
                    )}
                    <TruthInfo room={room} />
                </>
            )}
        </div>
    );
};

export default Finder;
