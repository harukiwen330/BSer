import React, {type Dispatch, type SetStateAction} from "react";
import {Pen} from "react-bootstrap-icons";
import styles from "../../pages/index.module.css";
type InputJoinIdProps = {
    isConfirmName: boolean;
    setIsConfirmName: Dispatch<SetStateAction<boolean>>;
    playerName: string;
    setPlayerName: Dispatch<SetStateAction<string>>;
};

const InputName = ({isConfirmName, setIsConfirmName, playerName, setPlayerName}: InputJoinIdProps) => {
    if (isConfirmName) {
        return (
            <div style={{alignItems: "center"}} className={styles.card}>
                <div className={styles.cardRow}>
                    <p>Hello {playerName}!</p>
                </div>
                <div className={styles.button} onClick={() => setIsConfirmName(false)}>
                    <Pen />
                </div>
            </div>
        );
    }
    return (
        <div className={styles.card}>
            <input
                style={{backgroundColor: "#12aaaa", color: "white", fontFamily: "CascadiaMono"}}
                autoFocus
                onChange={(event) => setPlayerName(event.target.value)}
                maxLength={7}
                placeholder={`Your Name (max 7)`}
                value={playerName}
                className={styles.cardTitle}
            />
        </div>
    );
};

export default InputName;
