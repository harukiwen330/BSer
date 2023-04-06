import type {User} from "@prisma/client";
import React, {useState} from "react";
import type {LangJsonProps} from "~/languages/langJsonProps";
import styles from "../pages/index.module.css";
import ManageList from "./Tools/ManageList";
import QrCode from "./Tools/QrCode";

type ManagerProps = {
    isHost: boolean;
    isLoading: boolean;
    baseUrl: string;
    langJson: LangJsonProps;
    roomUsers: User[];
    handleKick: (playerId: string) => void;
};

const Manager = ({isHost, isLoading, baseUrl, langJson, roomUsers, handleKick}: ManagerProps) => {
    const [chosenId, setChosenId] = useState("");
    const [playerName, setPlayerName] = useState("");
    return (
        <main className={styles.main}>
            {playerName !== "" && <h1 className={styles.cardTitle}>{playerName}</h1>}
            {chosenId !== "" && <QrCode langJson={langJson} url={baseUrl.concat(chosenId)} />}
            <ManageList isHost={isHost} isLoading={isLoading} langJson={langJson} roomUsers={roomUsers} setPlayerName={setPlayerName} setChosenId={setChosenId} handleKick={handleKick} />
        </main>
    );
};

export default Manager;
