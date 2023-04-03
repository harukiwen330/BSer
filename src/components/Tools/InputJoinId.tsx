import React, {type Dispatch, type SetStateAction} from "react";
import styles from "../../pages/index.module.css";
type InputJoinIdProps = {
    joinRoomId: string;
    setJoinRoomId: Dispatch<SetStateAction<string>>;
};

const InputJoinId = ({joinRoomId, setJoinRoomId}: InputJoinIdProps) => {
    return (
        <div className={styles.button}>
            <input
                style={{backgroundColor: "#12aaaa", color: "white", fontFamily: "CascadiaMono"}}
                onChange={(event) => setJoinRoomId(event.target.value.toUpperCase())}
                maxLength={4}
                placeholder={`Room ID (Max 4)`}
                value={joinRoomId}
                className={styles.cardTitle}
            />
        </div>
    );
};

export default InputJoinId;
