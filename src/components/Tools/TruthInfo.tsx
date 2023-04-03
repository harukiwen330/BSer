import type {Room} from "@prisma/client";
import React from "react";
import styles from "../../pages/index.module.css";

type TruthInfoProps = {
    room: Room;
};

const TruthInfo = ({room}: TruthInfoProps) => {
    return (
        <div className={styles.card}>
            <h2>{room?.title}</h2>
            <p>{room?.category}</p>
            <p style={{textAlign: "left"}}>{room?.text}</p>
        </div>
    );
};

export default TruthInfo;
