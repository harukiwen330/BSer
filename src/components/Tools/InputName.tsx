import React, {type Dispatch, type SetStateAction} from "react";
import {Pen} from "react-bootstrap-icons";
import type {LangJsonProps} from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";
type InputJoinIdProps = {
    langJson: LangJsonProps;
    isConfirmName: boolean;
    setIsConfirmName: Dispatch<SetStateAction<boolean>>;
    playerName: string;
    setPlayerName: Dispatch<SetStateAction<string>>;
};

const InputName = ({langJson, isConfirmName, setIsConfirmName, playerName, setPlayerName}: InputJoinIdProps) => {
    if (isConfirmName) {
        return (
            <>
                <div className={styles.cardRow}>
                    <div className={styles.card}>
                        <p>
                            {langJson.greet}{" "}
                            {playerName}!
                        </p>
                    </div>
                    <div style={{alignItems: "center"}} className={styles.button} onClick={() => setIsConfirmName(false)}>
                        <Pen />
                    </div>
                </div>
            </>
        );
    }
    return (
        <div className={styles.card}>
            <input
                style={{backgroundColor: "#12aaaa", color: "white", fontFamily: "CascadiaMono"}}
                autoFocus
                onChange={(event) => setPlayerName(event.target.value)}
                maxLength={7}
                placeholder={langJson.namePlaceHolder}
                value={playerName}
                className={styles.cardTitle}
            />
        </div>
    );
};

export default InputName;
