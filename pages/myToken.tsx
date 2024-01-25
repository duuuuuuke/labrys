import Card from "@/components/Card";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useTokenStore } from "@/store/store";
import { useEffect } from "react";

type TokenInfo = {
    id: number;
    rank: number;
    img: string;
    symbol: string;
    marketCap: number;
    price: number;
    percentChange: number;
};

const MyTokenPage = () => {
    const tokenList = useTokenStore((state) => state.myTokens);
    const addTokenToList = useTokenStore((state) => state.addToken);
    const updateTokenList = useTokenStore((state) => state.updateToken);
    const deleteToken = useTokenStore((state) => state.removeToken);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/myTokens");
            if (!response.ok) {
                return <Heading>Something went wrong!</Heading>;
            }
            const resData = await response.json();
            if (resData.length > 0) {
                resData.forEach((token: TokenInfo) => {
                    if (tokenList) {
                        if (!tokenList.map((t) => t.id).includes(token.id)) {
                            addTokenToList(token);
                        } else {
                            updateTokenList(token.id, token);
                        }
                    } else {
                        addTokenToList(token);
                    }
                });
            }
            console.log(resData);
            return resData;
        };
        fetchData();
    }, [tokenList]);
    console.log(tokenList);

    const removeToken = async (tokenInfo: TokenInfo) => {
        deleteToken(tokenInfo.id);
        const response = await fetch("/api/myTokens", {
            method: "DELETE",
            body: JSON.stringify(tokenInfo),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            return <Heading>Something went wrong!</Heading>;
        }
        const resData = await response.json();
        console.log(resData);
        return;
    };
    console.log(tokenList);
    return (
        <>
            <Container as="section" maxWidth="3xl" textAlign="center" mt={5}>
                <Heading>My Tokens</Heading>
                <Box>
                    <Text>This is a box</Text>
                </Box>
                <Flex flexDir="column" gap={5} alignItems="center" mt={5}>
                    {tokenList.map((info) => (
                        <Card
                            key={info.id}
                            data={info}
                            handleClick={removeToken}
                        />
                    ))}
                </Flex>
            </Container>
        </>
    );
};

// export const getServerSideProps = async () => {
//     const client = await MongoClient.connect(
//         "mongodb+srv://dukebai8383:Jug5DxXe5St3Up6G@cluster0.bllkxkt.mongodb.net/myTokens?retryWrites=true&w=majority"
//     );
//     const db = client.db();

//     const myTokensCollection = db.collection("myTokens");
//     const myTokens = await myTokensCollection.find().toArray();
//     client.close();
//     return {
//         props: {
//             data: myTokens.map((token) => ({
//                 rank: token.rank,
//                 img: token.img,
//                 symbol: token.symbol,
//                 marketCap: token.marketCap,
//                 price: token.price,
//                 percentChange: token.percentChange
//             }))
//         }
//     };
// };

export default MyTokenPage;
