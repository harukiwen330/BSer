import type {User} from "@prisma/client";
import type {NextPage} from "next";
import {useRouter} from "next/router";
import NotExist from "~/components/NotExist";
import Player from "~/components/Player";
import Ready from "~/components/Ready";
import {shuffleRole} from "~/functions/shuffleRole";
import {api} from "../../../../utils/api";
import en from "~/languages/en.json";
import zh from "~/languages/zh.json";
import {useEffect, useState} from "react";
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
    const [isLoading, setIsLoading] = useState(false);
    const [words, setWords] = useState<WikipediaProps>({
        title: "",
        category: "",
        text: ""
    });
    const [initialFetch, setInitialFetch] = useState<boolean>(false);
    const invalidate = async () => {
        await utils.room.getRoom.invalidate({roomId: roomId});
        await utils.user.getUser.invalidate({userId: userId});
        await utils.user.getRoomUsers.invalidate({roomId: roomId});
    };
    const deleteRoomUsers = api.user.deleteRoomUsers.useMutation({
        onMutate() {
            setIsLoading(true);
        },
        async onSuccess() {
            await invalidate();
        }
    });
    const deleteRoom = api.room.deleteRoom.useMutation({
        async onSuccess() {
            await invalidate();
            setIsLoading(false);
        }
    });
    const deleteUser = api.user.deleteUser.useMutation({
        onMutate() {
            setIsLoading(true);
        },
        async onSuccess() {
            await invalidate();
            setIsLoading(false);
        }
    });

    const newGameUser = api.user.newGame.useMutation({
        onMutate() {
            setIsLoading(true);
        },
        async onSuccess() {
            await invalidate();
        }
    });
    const newGameRoom = api.room.newGame.useMutation({
        async onSuccess() {
            await invalidate();
            setIsLoading(false);
        }
    });
    const lockWord = api.room.lockWord.useMutation({
        onMutate() {
            setIsLoading(true);
        },
        async onSuccess() {
            await invalidate();
            setIsLoading(false);
        }
    });
    const hideText = api.room.hideText.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const usedShushRoom = api.room.usedShush.useMutation({
        onMutate() {
            setIsLoading(true);
        },
        async onSuccess() {
            await invalidate();
        }
    });
    const usedShushUser = api.user.usedShush.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const shush = api.user.shush.useMutation({
        async onSuccess() {
            await invalidate();
            setIsLoading(false);
        }
    });
    const usedChoiceRoom = api.room.usedChoice.useMutation({
        onMutate() {
            setIsLoading(true);
        },
        async onSuccess() {
            await invalidate();
        }
    });
    const usedChoiceUser = api.user.usedChoice.useMutation({
        async onSuccess() {
            await invalidate();
        }
    });
    const choice = api.user.choice.useMutation({
        async onSuccess() {
            await invalidate();
            setIsLoading(false);
        }
    });
    const returnMenu = async () => {
        await router.push("/");
    };
    // Testing Ground
    useEffect(() => {
        if (user?.isFinder && !initialFetch) {
            const fetchData = async () => {
                await fetchWords();
                setInitialFetch(true);
            };

            void fetchData();
        }
    }, [user, initialFetch]);
    const langJson = room?.lang === "en" ? en : zh;

    if (!room || !user || room === undefined || user === undefined || roomUsers === undefined) return <NotExist langJson={langJson} returnMenu={returnMenu as VoidFunction} />;

    const roomPlayers = roomUsers.filter((player) => room?.playerIds.includes(player.userId));
    const role = user.isTruther ? langJson.truther : user.isFinder ? langJson.finder : langJson.liar;
    const roomPlayersNoFinder = roomPlayers?.slice().filter((player) => !player.isFinder);

    // Testing Ground
    const fetchWords = async (): Promise<void> => {
        setIsLoading(true);
        try {
            // eslint-disable-next-line
            const response = require("wtf_wikipedia").extend(require("wtf-plugin-api")).extend(require("wtf-plugin-classify"));
            // eslint-disable-next-line
            const OpenCC = require("opencc-js");
            // eslint-disable-next-line
            const converter = OpenCC.Converter({from: "cn", to: "hk"});
            // eslint-disable-next-line
            const getRandomPage = response.getRandomPage as (options: {lang: string}) => Promise<{title: () => string; classify: () => {type: string}; category: () => string; text: () => string}>;
            const doc = await getRandomPage({lang: room.lang});
            // eslint-disable-next-line
            const title: string = room.lang === "en" ? doc.title() : converter(doc.title());
            // eslint-disable-next-line
            const category: string = room.lang === "en" ? doc.classify().type : converter(doc.category());
            // eslint-disable-next-line
            const text: string = room.lang === "en" ? doc.text() : converter(doc.text());
            setWords({
                title: title,
                category: category,
                text: text
            });
        } catch (error) {
            console.error("Error fetching random Wikipedia page:", error);
        }
        setIsLoading(false);
    };

    const handleNextWord = async () => {
        await fetchWords();
    };

    const handleChosenWord = () => {
        handleLockWord(words?.title, words?.category, words?.text);
        setTimeout(() => {
            void handleTimesUp();
        }, 31000);
    };

    const handleNewGame = () => {
        const roles = shuffleRole(roomUsers);
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i] as {userId: string; hasBeenFinder: boolean; isTruther: boolean; isFinder: boolean; isLiar: boolean; score: number};
            newGameUser.mutate({
                userId: role.userId,
                hasBeenFinder: role.hasBeenFinder,
                isTruther: role.isTruther,
                isLiar: role.isLiar,
                isFinder: role.isFinder,
                score: role.score
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
            {isManaging && (
                <Manager roomId={room.roomId} isHost={user.isHost} isLoading={isLoading} handleKick={handleKick} baseUrl={"https://www.bser.app".concat(router.asPath.replace(`/user/${userId}`, ""))} langJson={langJson} roomUsers={roomUsers} />
            )}
            {!user.isTruther && !user.isLiar && !user.isFinder && !isManaging && (
                <Ready langJson={langJson} roomId={roomId} url={url} isHost={user.isHost} roomUsers={roomUsers} handleLeave={handleLeave as VoidFunction} handleNewGame={handleNewGame} />
            )}
            {(user.isTruther || user.isLiar || user.isFinder) && !isManaging && (
                <Player
                    isLoading={isLoading}
                    words={words}
                    langJson={langJson}
                    role={role}
                    room={room}
                    roomPlayers={roomPlayers}
                    roomPlayersNoFinder={roomPlayersNoFinder}
                    user={user}
                    handleChosenWord={handleChosenWord}
                    handleNextWord={handleNextWord as VoidFunction}
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
