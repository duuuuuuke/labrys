import Card from "@/components/Card";
import { Container, Flex, Heading, Box, Text } from "@chakra-ui/react";
import { useTokenStore } from "@/store/store";

const listData = [
    {
        id: 1,
        img: "https://bit.ly/dan-abramov",
        symbol: "BTC",
        marketCap: 852164659250.2758,
        price: 26123.21,
        percentChange: 5.6
    },
    {
        id: 2,
        img: "https://bit.ly/dan-abramov",
        symbol: "ETH",
        marketCap: 852164659250.2758,
        price: 26123.21,
        percentChange: 5.6
    },
    {
        id: 3,
        img: "https://bit.ly/dan-abramov",
        symbol: "DOT",
        marketCap: 852164659250.2758,
        price: 26123.21,
        percentChange: 5.6
    }
];

type Props = {
    data: {
        quote: any;
        id: number;
        img: string;
        symbol: string;
        marketCap: number;
        price: number;
        percentChange: number;
    }[];
};

type TokenInfo = {
    id: number;
    rank: number;
    img: string;
    symbol: string;
    marketCap: number;
    price: number;
    percentChange: number;
};

const HomePage = (props: Props) => {
    const { data } = props;
    const tokenList = useTokenStore((state) => state.myTokens);
    const addTokenToList = useTokenStore((state) => state.addToken);
    const addToken = async (tokenInfo: TokenInfo) => {
        if (
            tokenList &&
            !tokenList.map((token) => token.id).includes(tokenInfo.id)
        ) {
            addTokenToList(tokenInfo);
        }
        const res = await fetch("/api/myTokens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tokenInfo)
        });
        const resData = await res.json();
        console.log(resData);
    };
    console.log(tokenList);
    return (
        <>
            <Container as="section" maxWidth="3xl" textAlign="center" mt={5}>
                <Heading>Home</Heading>
                <Box>
                    <Text>This is a box</Text>
                </Box>
                <Flex flexDir="column" gap={5} alignItems="center" mt={5}>
                    {data.map((info, index) => (
                        <Card
                            key={index}
                            data={{
                                rank: index + 1,
                                id: info.id,
                                img: info.img || "https://bit.ly/dan-abramov",
                                symbol: info.symbol,
                                marketCap: info.quote.USD.market_cap,
                                price: info.quote.USD.price,
                                percentChange: info.quote.USD.percent_change_24h
                            }}
                            handleClick={addToken}
                        />
                    ))}
                </Flex>
            </Container>
        </>
    );
};

export const getServerSideProps = async () => {
    const res = await fetch(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20",
        {
            headers: {
                "X-CMC_PRO_API_KEY": "0cb61b43-fe49-42ce-8e3a-e030fb104f24"
            }
        }
    );
    if (!res.ok) {
        return {
            props: {
                data: listData
            }
        };
    }
    const data = await res.json();
    return {
        props: data
    };
};

export default HomePage;
