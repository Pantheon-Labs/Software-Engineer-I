import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Button,
    useDisclosure,
  } from '@chakra-ui/react'

function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <h1 className = "welcome">WELCOME !</h1>
            <img src = "https://static01.nyt.com/images/2019/05/29/realestate/00skyline-south4/88ce0191bfc249b6aae1b472158cccc4-superJumbo.jpg"/>
            <p className = "text">This website is a work in progress and includes some news and NYC park events.</p>
            <p className = "text">Check it out and let me know what you think</p>
            <Button onClick={onOpen} colorScheme='blue' size='lg' className = "supportbutton">Support Me!</Button>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Hint Hint</ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <img src = "https://media.cntraveler.com/photos/6053b191f490bda87b43dfc7/16:9/w_2560%2Cc_limit/01-velo-"/>
        </>
    )
}

export default Home