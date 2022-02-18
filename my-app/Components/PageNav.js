import { Button, ButtonGroup } from "@chakra-ui/react";

const PageNav = ({ nav, setCharacterUrl }) => {

    let previousUrl = nav.prev;
    let nextUrl = nav.next;

    return (
        <>
            <div className="tab">
                <ButtonGroup>
                    <Button
                        id="default"
                        data-tab="previous"
                        className="navTab active"
                        onClick={() => setCharacterUrl(previousUrl)}
                >
                        Previous
                    </Button>
                    <Button
                        data-tab="info"
                        className="navTab"
                        onClick="openTab(event, 'info')"
                >
                        Info
                    </Button>
                    <Button
                        data-tab="next"
                        className="navTab"
                        onClick={() => setCharacterUrl(nextUrl)}
                >
                        Next
                    </Button>
                </ButtonGroup>
            </div>
        </>
    )
}

export default PageNav