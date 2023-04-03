import Link from "next/link";
import React from "react";
import { Github } from "react-bootstrap-icons";
import styles from "../../pages/index.module.css";

const GithubBtn = () => {
    return (
        <Link className={styles.button} href="https://github.com/harukiwen330/YouLiar" target="_blank">
            <h3 className={styles.cardTitle}>
                <span className={styles.yellowSpan}>
                    <Github />
                </span>
            </h3>
        </Link>
    );
};

export default GithubBtn;
