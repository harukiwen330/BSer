import type {Room} from "@prisma/client";
import React, {type Dispatch, type SetStateAction, useState} from "react";
import {CheckCircleFill} from "react-bootstrap-icons";
import styles from "../pages/index.module.css";
import GithubBtn from "./Tools/GithubBtn";
import HostBtn from "./Tools/HostBtn";
import InputJoinId from "./Tools/InputJoinId";
import InputName from "./Tools/InputName";
import JoinBtn from "./Tools/JoinBtn";

type MenuProps = {
    room: Room | null | undefined;
    joinRoomId: string;
    playerName: string;
    setJoinRoomId: Dispatch<SetStateAction<string>>;
    setPlayerName: Dispatch<SetStateAction<string>>;
    handleJoin: () => void;
    handleHost: () => void;
};

type PlayerChoicesProps = {
    roomExist: boolean;
    joinRoomId: string;
    setJoinRoomId: Dispatch<SetStateAction<string>>;
    handleHost: () => void;
    handleJoin: () => void;
};

const Menu = ({room, joinRoomId, setJoinRoomId, playerName, setPlayerName, handleJoin, handleHost}: MenuProps) => {
    const roomExist = room !== null && room !== undefined;
    const nameNotEmpty = playerName.replace(/[\W_]+/g, "") !== "";
    const [isConfirmName, setIsConfirmName] = useState(false);
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    <span className={styles.yellowSpan}>
                        <i>BSer</i>
                    </span>
                </h1>
                <InputName isConfirmName={isConfirmName} setIsConfirmName={setIsConfirmName} playerName={playerName} setPlayerName={setPlayerName} />
                {!isConfirmName && nameNotEmpty && (
                    <div className={styles.button} onClick={() => setIsConfirmName(true)}>
                        <CheckCircleFill />
                    </div>
                )}

                {nameNotEmpty && isConfirmName && <PlayerChoices roomExist={roomExist} joinRoomId={joinRoomId} setJoinRoomId={setJoinRoomId} handleHost={handleHost} handleJoin={handleJoin} />}
            </div>
        </main>
    );
};

const PlayerChoices = ({roomExist, joinRoomId, setJoinRoomId, handleHost, handleJoin}: PlayerChoicesProps) => {
    return (
        <div className={styles.cardRow}>
            <HostBtn handleHost={handleHost} />
            <InputJoinId joinRoomId={joinRoomId} setJoinRoomId={setJoinRoomId} />
            {roomExist && <JoinBtn handleJoin={handleJoin} />}
            <GithubBtn />
        </div>
    );
};

export default Menu;
