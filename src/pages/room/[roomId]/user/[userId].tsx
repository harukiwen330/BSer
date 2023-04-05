import type {User} from "@prisma/client";
import type {NextPage} from "next";
import {useRouter} from "next/router";
import Loading from "~/components/Loading";
import Player from "~/components/Player";
import Ready from "~/components/Ready";
import {shuffleRole} from "~/functions/shuffleRole";
import {api} from "../../../../utils/api";
import en from "~/languages/en.json";
import zh from "~/languages/zh.json";
import {useState} from "react";
import Manager from "~/components/Manager";
import ManageBtn from "~/components/Tools/ManageBtn";

export type WikipediaProps = {
    title: string;
    category: string;
    text: string;
};

const Lobby: NextPage = () => {
    const router = useRouter();
    const {roomId, userId} = router.query as {roomId: string; userId: string};
    const url = "https://www.bser.app".concat(router.asPath.replace(`/user/${userId}`, ""));
    const utils = api.useContext();
    const room = api.room.getRoom.useQuery({roomId: roomId}, {refetchInterval: 500}).data;
    const user = api.user.getUser.useQuery({userId: userId}, {refetchInterval: 500}).data;
    const roomUsers = api.user.getRoomUsers.useQuery({roomId: roomId}, {refetchInterval: 500, refetchOnMount: true}).data?.sort();
    const [isManaging, setIsManaging] = useState(false);
    const invalidate = async () => {
        await utils.room.getRoom.invalidate({roomId: roomId});
        await utils.user.getUser.invalidate({userId: userId});
        await utils.user.getRoomUsers.invalidate({roomId: roomId});
    };
    const deleteRoomUsers = api.user.deleteRoomUsers.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const deleteUser = api.user.deleteUser.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const deleteRoom = api.room.deleteRoom.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const newGameRoom = api.room.newGame.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const newGameUser = api.user.newGame.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const lockWord = api.room.lockWord.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const hideText = api.room.hideText.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const shush = api.user.shush.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const usedShushUser = api.user.usedShush.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const usedShushRoom = api.room.usedShush.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const choice = api.user.choice.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const usedChoiceUser = api.user.usedChoice.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const usedChoiceRoom = api.room.usedChoice.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const returnMenu = async () => {
        await router.push("/");
    };
    if (!room || !user || room === undefined || user === undefined || roomUsers === undefined) return <Loading returnMenu={returnMenu as VoidFunction} />;

    const langJson = room.lang === "en" ? en : zh;
    const roomPlayers = roomUsers.filter((player) => room?.playerIds.includes(player.userId));
    const role = user.isTruther ? langJson.truther : user.isFinder ? langJson.finder : langJson.liar;
    const roomPlayersNoFinder = roomPlayers?.slice().filter((player) => !player.isFinder);

    const handleNewGame = () => {
        const roles = shuffleRole(roomUsers);
        for (let i = 0; i < roles.length; i++) {
            newGameUser.mutate({
                hasBeenFinder: roles[i]?.hasBeenFinder as boolean,
                userId: roles[i]?.playerId as string,
                isTruther: roles[i]?.isTruther as boolean,
                isLiar: roles[i]?.isLiar as boolean,
                isFinder: roles[i]?.isFinder as boolean,
                score: roles[i]?.score as number
            });
        }
        newGameRoom.mutate({
            roomId: roomId,
            playerIds: roomUsers.map((player) => player.userId)
        });
    };

    const handleTimesUp = () => {
        hideText.mutate({roomId});
    };
    const handleLeave = async () => {
        if (user?.isHost || roomUsers.length <= 3) {
            deleteRoomUsers.mutate({roomId: roomId});
            deleteRoom.mutate({roomId: roomId});
        } else {
            deleteUser.mutate({userId: userId});
        }
        await returnMenu();
    };
    const handleKick = (playerId: string) => {
        if (roomUsers.length <= 3) {
            deleteRoomUsers.mutate({roomId: roomId});
            deleteRoom.mutate({roomId: roomId});
        } else {
            deleteUser.mutate({userId: playerId});
        }
    };
    const handleLockWord = (title: string, category: string, text: string) => {
        lockWord.mutate({roomId, title, category, text});
    };

    const handleShush = (player: User) => {
        usedShushRoom.mutate({roomId: roomId});
        if (player.isLiar) {
            usedShushUser.mutate({userId: userId, isCorrectlyShushed: true});
        } else {
            usedShushUser.mutate({userId: userId, isCorrectlyShushed: false});
        }
        shush.mutate({userId: player.userId});
    };
    const handleChoose = (player: User) => {
        usedChoiceRoom.mutate({roomId: roomId});
        if (player.isLiar) {
            usedChoiceUser.mutate({userId: userId, isCorrectlyChosen: false});
        } else {
            usedChoiceUser.mutate({userId: userId, isCorrectlyChosen: true});
        }
        choice.mutate({userId: player.userId});
    };
    return (
        <>
            <ManageBtn isManaging={isManaging} setIsManaging={setIsManaging} />
            {isManaging && <Manager isHost={user.isHost} handleKick={handleKick} baseUrl={"https://www.bser.app".concat(router.asPath.replace(userId, ""))} langJson={langJson} roomUsers={roomUsers} />}
            {!user.isTruther && !user.isLiar && !user.isFinder && !isManaging && (
                <Ready langJson={langJson} roomId={roomId} url={url} isHost={user.isHost} roomUsers={roomUsers} handleLeave={handleLeave as VoidFunction} handleNewGame={handleNewGame} />
            )}
            {(user.isTruther || user.isLiar || user.isFinder) && !isManaging && (
                <Player
                    langJson={langJson}
                    role={role}
                    room={room}
                    roomPlayers={roomPlayers}
                    roomPlayersNoFinder={roomPlayersNoFinder}
                    user={user}
                    handleLockWord={handleLockWord}
                    handleTimesUp={handleTimesUp}
                    handleShush={handleShush}
                    handleChoose={handleChoose}
                    handleNewGame={handleNewGame}
                    handleLeave={handleLeave as VoidFunction}
                />
            )}
        </>
    );
};

export default Lobby;
