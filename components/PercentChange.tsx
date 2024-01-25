import { Flex, Text } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

type Props = {
    percentChange: number;
};

const PercentChange = (props: Props) => {
    let num = Number((Math.round(props.percentChange * 100) / 100).toFixed(2));
    // let num = Number((Math.round(0.5435345 * 100) / 100).toFixed(2));
    const textColor = num >= 0 ? "#24FF00" : "#FF0000";
    const bgColor = num >= 0 ? "#24FF001A" : "#FF00001A";
    return (
        <Flex
            w="46px"
            h="18px"
            borderRadius="4px"
            p="3px"
            bgColor={bgColor}
            justify="center"
            alignItems="center">
            {num >= 0 ? (
                <TriangleUpIcon color={textColor} w="8px" h="6px" />
            ) : (
                <TriangleDownIcon color={textColor} w="8px" h="6px" />
            )}
            <Text color={textColor} fontWeight="700" fontSize="10px">
                {Math.abs(num)}%
            </Text>
        </Flex>
    );
};

export default PercentChange;
