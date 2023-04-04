import React, {type Dispatch, type SetStateAction} from "react";
import type { LangJsonProps } from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";
type InputJoinIdProps = {
    langJson: LangJsonProps;
    joinRoomId: string;
    setJoinRoomId: Dispatch<SetStateAction<string>>;
};

const InputJoinId = ({langJson, joinRoomId, setJoinRoomId}: InputJoinIdProps) => {
    return (
        <div className={styles.button}>
            <input
                style={{backgroundColor: "#12aaaa", color: "white", fontFamily: "CascadiaMono"}}
                onChange={(event) => setJoinRoomId(event.target.value.toUpperCase())}
                maxLength={4}
                placeholder={langJson.joinPlaceHolder}
                value={joinRoomId}
                className={styles.cardTitle}
            />
        </div>
    );
};

export default InputJoinId;
