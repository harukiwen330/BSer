import React, {type Dispatch,type SetStateAction, useState} from "react";
import styles from "../pages/index.module.css";
import type {User} from "@prisma/client";
import JoinBtn from "./Tools/JoinBtn";
import MenuBtn from "./Tools/MenuBtn";
import InputName from "./Tools/InputName";
import {CheckCircleFill} from "react-bootstrap-icons";

type GuestProps = {
    playerName: string;
    setPlayerName: Dispatch<SetStateAction<string>>;
    roomUsers: User[];
    roomId: string;
    returnMenu: () => void;
    handleJoin: () => void;
};

const Guest = ({playerName, setPlayerName, roomUsers, roomId, returnMenu, handleJoin}: GuestProps) => {
    const nameNotEmpty = playerName.replace(/[\W_]+/g, "") !== "";
    const [isConfirmName, setIsConfirmName] = useState(false);
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>{roomId}</h1>
                
                <InputName isConfirmName={isConfirmName} setIsConfirmName={setIsConfirmName} playerName={playerName} setPlayerName={setPlayerName} />

                {!isConfirmName && nameNotEmpty && (
                    <div className={styles.card} onClick={() => setIsConfirmName(true)}>
                        <CheckCircleFill />
                    </div>
                )}

                {isConfirmName && roomUsers.length <= 7 && nameNotEmpty && <JoinBtn handleJoin={handleJoin} />}
                <MenuBtn returnMenu={returnMenu} />
            </div>
        </main>
    );
};

export default Guest;
