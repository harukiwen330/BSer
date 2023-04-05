import React from "react";
import {DoorOpen} from "react-bootstrap-icons";
import styles from "../../pages/index.module.css";

type MenuBtnProps = {
    returnMenu: () => void;
};

const MenuBtn = ({returnMenu}: MenuBtnProps) => {
    return (
        // <div style={{alignItems: "center"}} onClick={returnMenu} className={styles.button}>
        <div onClick={returnMenu} className={styles.cornerBtn}>
            <DoorOpen />
        </div>
    );
};

export default MenuBtn;
