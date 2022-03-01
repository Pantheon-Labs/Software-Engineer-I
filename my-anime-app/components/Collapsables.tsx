import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react"
import Link from "next/link"
import { ReactElement } from "react"

interface SagasCollapseProps {
    sagas: Array<any>
}

interface GenresCollapseProps {
    genres: Array<any>
}

interface CollapsableProps {
    title: string
    children: ReactElement[] | ReactElement
}

const boxStyle = {
    "color": "black",
    "p": "40px",
    "mt": "4",
    "bg": "teal.500",
    "rounded": "md",
    "shadow": "md"
}


const Collapsable = ({ title, children }: CollapsableProps) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <>
            <Button onClick={onToggle}>{title}</Button>
            <Collapse in={isOpen} animateOpacity>
                <Box style={boxStyle}>
                    {children}
                </Box>
            </Collapse>
        </>
    )
}

const SagasCollapse = ({ sagas }: SagasCollapseProps) => {

    return (
        <>
            <Collapsable title="Sagas">
                {sagas?.map(saga => {
                    return (
                        <Box>
                            <Collapsable title={saga.titles.en}>
                                <Box>{saga.descriptions.en}</Box>
                            </Collapsable>
                        </Box>
                    )
                })}
            </Collapsable>
        </>
    )
}

const GenresCollapse = ({ genres }: GenresCollapseProps) => {

    return (
        <>
            <Collapsable title="Genres">
                {genres?.map(genre => {
                    return (
                        <Box>
                            <Link href={`/genres/${genre}`}>
                                {genre}
                            </Link>
                        </Box>
                    )
                })}
            </Collapsable>
        </>
    )
}

export { SagasCollapse, GenresCollapse }