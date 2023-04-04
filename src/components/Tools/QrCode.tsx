import {QRCodeSVG} from "qrcode.react";
import React, {useState} from "react";
import type {LangJsonProps} from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";

type QrCodeProps = {
    langJson: LangJsonProps;
    url: string;
};
const QrCode = ({langJson, url}: QrCodeProps) => {
    const [urlState, setUrlState] = useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setUrlState(true);
    };
    return (
        <div onClick={handleCopy as VoidFunction} className={styles.button}>
            <h4 className={styles.cardTitle}>
                {urlState && langJson.copiedQRCode}
                {!urlState && langJson.copyQRCode}
            </h4>
            <QRCodeSVG size={256} fgColor={`#FFFFFF`} bgColor={`#15aaaa`} value={url} />
        </div>
    );
};

export default QrCode;
