import {type NextPage} from "next";
import {nanoid, customAlphabet} from "nanoid";
import Head from "next/head";
import {api} from "~/utils/api";
import Menu from "~/components/Menu";
import {useRouter} from "next/router";
import {useState} from "react";
import Entering from "~/components/Entering";
import en from "../languages/en.json";
import zh from "../languages/zh.json";

const alphabet = "3456789ABCDEFGHJKMNPQRSTUVWXY";

const Home: NextPage = () => {
    const router = useRouter();
    const utils = api.useContext();
    const [playerName, setPlayerName] = useState("");
    const [joinRoomId, setJoinRoomId] = useState("");
    const [lang, setLang] = useState("en");
    const [langJson, setLangJson] = useState(en);

    const [roomId] = useState(customAlphabet(alphabet, 4));
    const [userId] = useState(nanoid);

    const room = api.room.getRoom.useQuery({roomId: joinRoomId}, {refetchInterval: 500}).data;
    const createRoom = api.room.createRoom.useMutation({
        async onSuccess() {
            await utils.room.getRoom.invalidate({roomId: roomId});
            await utils.user.getUser.invalidate({userId: userId});
            await utils.user.getRoomUsers.invalidate({roomId: roomId}).then(async () => await router.push(`/room/${roomId}/user/${userId}`));
        }
    });
    const createUser = api.user.createUser.useMutation({
        async onSuccess() {
            await utils.room.getRoom.invalidate({roomId: joinRoomId});
            await utils.user.getUser.invalidate({userId: userId});
            await utils.user.getRoomUsers.invalidate({roomId: joinRoomId});
            await router.push(`/room/${joinRoomId}/user/${userId}`);
        }
    });
    const cleanUsers = api.user.cleanUsers.useMutation();
    const cleanRoom = api.room.cleanRoom.useMutation();
    const handleHost = () => {
        cleanUsers.mutate();
        cleanRoom.mutate();
        createRoom.mutate({roomId: roomId, name: playerName, userId: userId, lang: lang});
    };
    const handleJoin = () => {
        cleanUsers.mutate();
        cleanRoom.mutate();
        createUser.mutate({roomId: joinRoomId, name: playerName, userId: userId});
    };
    const handleLangChange = () => {
        if (lang === "en") {
            setLang("zh");
            setLangJson(zh);
        } else {
            setLang("en");
            setLangJson(en);
        }
    };
    if (room !== null || room !== undefined) {
        return (
            <>
                <Head>
                    <title>BSer.app</title>
                    <meta name="description" content="A Game Full of BS." />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Menu lang={lang} langJson={langJson} room={room} playerName={playerName} setPlayerName={setPlayerName} joinRoomId={joinRoomId} setJoinRoomId={setJoinRoomId} handleJoin={handleJoin} handleHost={handleHost} handleLangChange={handleLangChange}/>
            </>
        );
    }
    return <Entering />;
};

export default Home;
