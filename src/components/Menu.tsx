import type {Room} from "@prisma/client";
import React, {type Dispatch, type SetStateAction, useState} from "react";
import {CheckCircleFill} from "react-bootstrap-icons";
import type {LangJsonProps} from "~/languages/langJsonProps";
import styles from "../pages/index.module.css";
import Entering from "./Entering";
import GithubBtn from "./Tools/GithubBtn";
import HostBtn from "./Tools/HostBtn";
import InputJoinId from "./Tools/InputJoinId";
import InputName from "./Tools/InputName";
import JoinBtn from "./Tools/JoinBtn";
import LangBtn from "./Tools/LangBtn";
import Title from "./Tools/Title";

type MenuProps = {
    isLoading: boolean;
    room: Room | null | undefined;
    joinRoomId: string;
    playerName: string;
    lang: string;
    langJson: LangJsonProps;
    setJoinRoomId: Dispatch<SetStateAction<string>>;
    setPlayerName: Dispatch<SetStateAction<string>>;
    handleJoin: () => void;
    handleHost: () => void;
    handleLangChange: () => void;
};

type PlayerChoicesProps = {
    langJson: LangJsonProps;
    roomExist: boolean;
    joinRoomId: string;
    setJoinRoomId: Dispatch<SetStateAction<string>>;
    handleHost: () => void;
    handleJoin: () => void;
};

const Menu = ({isLoading, room, joinRoomId, lang, langJson, setJoinRoomId, playerName, setPlayerName, handleJoin, handleHost, handleLangChange}: MenuProps) => {
    const roomExist = room !== null && room !== undefined;
    const nameNotEmpty = playerName.replace(/[\W_]+/g, "") !== "";
    const [isConfirmName, setIsConfirmName] = useState(false);
    if (!isLoading) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <LangBtn lang={lang} handleLangChange={handleLangChange} />
                    <Title langJson={langJson} />
                    <InputName langJson={langJson} isConfirmName={isConfirmName} setIsConfirmName={setIsConfirmName} playerName={playerName} setPlayerName={setPlayerName} />
                    {!isConfirmName && nameNotEmpty && (
                        <div className={styles.button} onClick={() => setIsConfirmName(true)}>
                            <CheckCircleFill />
                        </div>
                    )}

                    {nameNotEmpty && isConfirmName && <PlayerChoices langJson={langJson} roomExist={roomExist} joinRoomId={joinRoomId} setJoinRoomId={setJoinRoomId} handleHost={handleHost} handleJoin={handleJoin} />}
                </div>
            </main>
        );
    }
    return <Entering langJson={langJson} />;
};

const PlayerChoices = ({langJson, roomExist, joinRoomId, setJoinRoomId, handleHost, handleJoin}: PlayerChoicesProps) => {
    return (
        <div className={styles.cardRow}>
            {<HostBtn langJson={langJson} handleHost={handleHost} />}
            <InputJoinId langJson={langJson} joinRoomId={joinRoomId} setJoinRoomId={setJoinRoomId} />
            {roomExist && <JoinBtn langJson={langJson} handleJoin={handleJoin} />}
            {!roomExist && (
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>{langJson.join}</h3>
                </div>
            )}
            <GithubBtn />
        </div>
    );
};

export default Menu;
