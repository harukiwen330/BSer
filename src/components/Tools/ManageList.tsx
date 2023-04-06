import type {User} from "@prisma/client";
import React, {type Dispatch, type SetStateAction} from "react";
import {QrCodeScan, XCircleFill} from "react-bootstrap-icons";
import type {LangJsonProps} from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";

type ManageListProps = {
    isHost: boolean;
    isLoading: boolean;
    langJson: LangJsonProps;
    roomUsers: User[];
    setChosenId: Dispatch<SetStateAction<string>>;
    setPlayerName: Dispatch<SetStateAction<string>>;
    handleKick: (playerId: string) => void;
};

const ManageList = ({isHost, isLoading, langJson, roomUsers, setChosenId, setPlayerName, handleKick}: ManageListProps) => {
    const handleQrClick = (player: User) => {
        setChosenId(player.userId);
        setPlayerName(player.name);
    };
    return (
        <div className={styles.card}>
            <h1 className={styles.cardTitle}>{langJson.managerScreen}</h1>
            {Array.from(Array(roomUsers.length).keys()).map((index) => {
                const player = roomUsers[index] as User;
                return (
                    <div key={index} className={styles.manageRow}>
                        <div key={index} style={{fontSize: "12px"}} className={styles.card}>
                            <span className={player.isHost ? styles.blueSpan : ""}>{player.name}</span> [{player.score}]
                        </div>
                        <div key={index} onClick={() => handleQrClick(player)} className={styles.button}>
                            <QrCodeScan />
                        </div>
                        {!player.isHost && isHost && !isLoading && (
                            <div key={index} onClick={() => handleKick(player.userId)} className={styles.button}>
                                <XCircleFill />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ManageList;
