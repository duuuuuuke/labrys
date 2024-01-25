import { Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

const Navbar = () => {
    return (
        <Flex as="nav" bg="gray.300" h={55} p={3} justify="center" gap={5}>
            <Link fontSize={20} href="/">
                Home
            </Link>
            <Link fontSize={20} href="/myToken">
                My Tokens
            </Link>
        </Flex>
    );
};

export default Navbar;
