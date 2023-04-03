import type {Room} from "@prisma/client";
import React from "react";
import styles from "../../pages/index.module.css";

type TopicInfoProps = {
    room: Room;
};

const TopicInfo = ({room}: TopicInfoProps) => {
    return (
        <div className={styles.card}>
            <h2>{room.title}</h2>
            <p>{room.category}</p>
        </div>
    );
};

export default TopicInfo;
