import type {Room, User} from "@prisma/client";
import React from "react";
import type {LangJsonProps} from "../languages/langJsonProps";
import styles from "../pages/index.module.css";
import Finder from "./Roles/Finder";
import Liar from "./Roles/Liar";
import Truther from "./Roles/Truther";
import MenuBtn from "./Tools/MenuBtn";

type PlyerProps = {
    langJson: LangJsonProps;
    role: string;
    room: Room;
    roomPlayers: User[];
    roomPlayersNoFinder: User[];
    user: User;
    handleTimesUp: () => void;
    handleLockWord: (title: string, category: string, text: string) => void;
    handleShush: (player: User) => void;
    handleChoose: (player: User) => void;
    handleNewGame: () => void;
    handleLeave: () => void;
};

const Player = ({langJson, role, user, roomPlayersNoFinder, roomPlayers, room,  handleTimesUp, handleLockWord, handleShush, handleChoose, handleNewGame, handleLeave}: PlyerProps) => {
    const isChoosingWord = room.title === "" && !room?.isShowingText && !room.isShushUsed && !room.isChoiceUsed;
    const isWaitingPlayer = room.title !== "" && room?.isShowingText && !room.isShushUsed && !room.isChoiceUsed;
    const isShushingPlayer = room.title !== "" && !room?.isShowingText && !room.isShushUsed && !room.isChoiceUsed;
    const isChoosingPlayer = room.title !== "" && !room?.isShowingText && room.isShushUsed && !room.isChoiceUsed;
    const isResult = room.title !== "" && !room.isShowingText && room.isShushUsed && room.isChoiceUsed;
    return (
        <main className={styles.main}>
            <MenuBtn returnMenu={handleLeave} />
            
            {user.isFinder && (
                <Finder
                    langJson={langJson}
                    isChoosingWord={isChoosingWord}
                    isChoosingPlayer={isChoosingPlayer}
                    isWaitingPlayer={isWaitingPlayer}
                    isShushingPlayer={isShushingPlayer}
                    isResult={isResult}
                    role={role}
                    user={user}
                    roomPlayersNoFinder={roomPlayersNoFinder}
                    roomPlayers={roomPlayers}
                    room={room}
                    handleTimesUp={handleTimesUp}
                    handleLockWord={handleLockWord}
                    handleNewGame={handleNewGame}
                    handleShush={handleShush}
                    handleChoose={handleChoose}
                />
            )}
            {user.isTruther && (
                <Truther
                    langJson={langJson}
                    isChoosingWord={isChoosingWord}
                    isChoosingPlayer={isChoosingPlayer}
                    isWaitingPlayer={isWaitingPlayer}
                    isShushingPlayer={isShushingPlayer}
                    isResult={isResult}
                    room={room}
                    user={user}
                    roomPlayers={roomPlayers}
                    role={role}
                />
            )}
            {user.isLiar && (
                <Liar
                    langJson={langJson}
                    isChoosingWord={isChoosingWord}
                    isChoosingPlayer={isChoosingPlayer}
                    isWaitingPlayer={isWaitingPlayer}
                    isShushingPlayer={isShushingPlayer}
                    isResult={isResult}
                    room={room}
                    user={user}
                    roomPlayers={roomPlayers}
                    role={role}
                />
            )}
        </main>
    );
};

export default Player;
