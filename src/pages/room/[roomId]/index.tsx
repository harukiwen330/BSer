import type {NextPage} from "next";
import {useRouter} from "next/router";
import {api} from "../../../utils/api";
import {nanoid} from "nanoid";
import Guest from "~/components/Guest";
import NotExist from "~/components/NotExist";
import {useState} from "react";
import en from "../../../languages/en.json"
import zh from "../../../languages/zh.json"

const WaitingRoom: NextPage = () => {
    const [playerName, setPlayerName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const utils = api.useContext();
    const [userId] = useState(nanoid);
    const router = useRouter();
    const {roomId} = router.query as {roomId: string};
    const room = api.room.getRoom.useQuery({roomId: roomId}, {refetchInterval: 500}).data;
    const roomUsers = api.user.getRoomUsers.useQuery({roomId: roomId}, {refetchInterval: 1000}).data;
    const createUser = api.user.createUser.useMutation({
        onMutate() {
            setIsLoading(true);
        },
        async onSuccess() {
            await utils.room.getRoom.invalidate({roomId: roomId});
            await utils.user.getUser.invalidate({userId: userId});
            await utils.user.getRoomUsers.invalidate({roomId: roomId});
            await router.push(`/room/${roomId}/user/${userId}`);
            setIsLoading(false);
        }
    });
    const returnMenu = async () => {
        await router.push(`/`);
    };
    const handleJoin = () => {
        createUser.mutate({roomId: roomId, userId: userId, name:playerName});
    };
    const langJson = (room?.lang === 'en') ? en : zh;

    if (!room || room === undefined || roomUsers === undefined) {
        return <NotExist langJson={langJson} returnMenu={returnMenu as VoidFunction} />;
    }
    
    return <Guest 
        isLoading = {isLoading}
        langJson = {langJson}
        playerName ={playerName}
        setPlayerName = {setPlayerName}
        roomUsers={roomUsers} 
        roomId={roomId} 
        returnMenu={returnMenu as VoidFunction} 
        handleJoin={handleJoin} 
    />;
};

export default WaitingRoom;
