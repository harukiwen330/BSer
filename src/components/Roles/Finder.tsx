import type {Room, User} from "@prisma/client";
import React, {useEffect, useState} from "react";
import styles from "../../pages/index.module.css";
import type {WikipediaProps} from "~/pages/room/[roomId]/user/[userId]";
import ScoreBoard from "../Tools/ScoreBoard";
import PlayerIdTag from "../Tools/PlayerIdTag";
import ChoosePlayer from "../Tools/ChoosePlayer";
import TopicInfo from "../Tools/TopicInfo";
import TruthInfo from "../Tools/TruthInfo";

type FinderProps = {
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
    handleTimesUp: () => void;
    handleLockWord: (title: string, category: string, text: string) => void;
    handleShush: (player: User) => void;
    handleChoose: (player: User) => void;
    handleNewGame: () => void;
};

const Finder = ({
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
    handleTimesUp,
    handleLockWord,
    handleShush,
    handleChoose,
    handleNewGame
}: FinderProps) => {
    const [words, setWords] = useState<WikipediaProps>({
        title: "",
        category: "",
        text: ""
    });
    const [initialFetch, setInitialFetch] = useState<boolean>(false);

    useEffect(() => {
        if (user.isFinder && !initialFetch) {
            const fetchData = async () => {
                await fetchWords();
                setInitialFetch(true);
            };

            void fetchData();
        }
    }, [user, initialFetch]);

    const fetchWords = async (): Promise<void> => {
        try {
            // eslint-disable-next-line
            const response = require("wtf_wikipedia").extend(require("wtf-plugin-api")).extend(require("wtf-plugin-classify"));
            // eslint-disable-next-line
            const getRandomPage = response.getRandomPage as (options: {lang: string}) => Promise<{title: () => string; classify: () => {type: string}; text: () => string}>;
            const doc = await getRandomPage({lang: "en"});
            const title: string = doc.title();
            const category: string = doc.classify().type;
            const text: string = doc.text();

            setWords({
                title: title,
                category: category,
                text: text
            });
        } catch (error) {
            console.error("Error fetching random Wikipedia page:", error);
        }
    };

    const handleNextWord = () => {
        void fetchWords();
    };

    const handleChosenWord = () => {
        handleLockWord(words?.title, words?.category, words?.text);
        setTimeout(() => {
            void handleTimesUp();
        }, 31000);
    };

    return (
        <div className={styles.container}>
            {isChoosingWord && (
                <>
                    <h1 className={styles.cardTitle}>
                        Choose a <span className={styles.yellowSpan}> weird word</span>
                    </h1>
                    <div className={styles.card}>
                        <h2>{words.title}</h2>
                        <p>{words.category}</p>
                        <div style={{textAlign: "center"}} className={styles.button} onClick={handleChosenWord}>
                            <span className={styles.yellowSpan}>Play with this Topic</span>
                        </div>
                        <div style={{textAlign: "center"}} className={styles.button} onClick={handleNextWord}>
                            Change Topic
                        </div>
                    </div>
                </>
            )}
            {isWaitingPlayer && (
                <>
                    <h1 className={styles.cardTitle}>
                        Wait for <span className={styles.yellowSpan}>30s</span>
                    </h1>
                    <TopicInfo room={room} />
                    <div className={styles.card}>
                        <p className={styles.cardText}>After 30s, listen carefully to players&apos; definitions.</p>
                        <p className={styles.cardText}>
                            <span className={styles.redSpan}>Shush</span> a player who you think is talking bs.
                        </p>
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
                    <p className={styles.cardTitle}>
                        <span className={styles.redSpan}>Shush</span> a player
                    </p>
                    <ChoosePlayer roomPlayersNoFinder={roomPlayersNoFinder} handleFunction={handleShush} />
                </>
            )}
            {isChoosingPlayer && (
                <>
                    <PlayerIdTag user={user} />
                    <TopicInfo room={room} />
                    <h2 className={styles.cardTitle}>
                        Pick the <span className={styles.greenSpan}>Truth Teller</span>
                    </h2>
                    <ChoosePlayer roomPlayersNoFinder={roomPlayersNoFinder} handleFunction={handleChoose} />
                </>
            )}
            {isResult && (
                <>
                    <PlayerIdTag user={user} />
                    <ScoreBoard roomPlayers={roomPlayers} />
                    <div
                        style={{textAlign: "center"}}
                        className={styles.button}
                        onClick={() => {
                            handleNewGame();
                            void fetchWords();
                        }}
                    >
                        New Game
                    </div>
                    <TruthInfo room={room}/> 
                </>
            )}
        </div>
    );
};

export default Finder;
