import { Flex, Text, Image, VStack, HStack } from "@chakra-ui/react";
import React from "react";
import PercentChange from "./PercentChange";

type Props = {
    data: {
        id: number;
        rank: number;
        img: string;
        symbol: string;
        marketCap: number;
        price: number;
        percentChange: number;
    };
    handleClick: any;
};

const Card = ({ data, handleClick }: Props) => {
    const { id, rank, img, symbol, marketCap, price, percentChange } = data;

    return (
        <Flex
            cursor="pointer"
            onClick={() => handleClick(data)}
            w="370px"
            h="60px"
            bgColor="#2F2E2E"
            borderRadius="5px"
            alignItems="center"
            justify="space-around"
            px={3}
            gap={5}>
            <HStack spacing="24px">
                <Text fontWeight="500" color="#FFFFFF" fontSize="12px">
                    {`#${rank}`}
                </Text>
                <HStack spacing="12px">
                    <Image
                        borderRadius="full"
                        boxSize="28px"
                        src={img}
                        alt="Dan Abramov"
                    />
                    <VStack alignItems="flex-start" spacing="0">
                        <Text fontWeight="700" color="#FFFFFF" fontSize="14px">
                            {symbol}
                        </Text>
                        <Text fontWeight="400" color="#707070" fontSize="11px">
                            {Number(
                                Math.round(marketCap / 1000000000).toFixed(2)
                            )}{" "}
                            Bn
                        </Text>
                    </VStack>
                </HStack>
            </HStack>
            <Text fontWeight="700" color="#FFFFFF" fontSize="12px">
                ${price}
            </Text>
            <PercentChange percentChange={percentChange} />
        </Flex>
    );
};

export default Card;
