import { Button, ButtonGroup } from "@chakra-ui/react";

const PageNav = ({ nav, page, setCharacterUrl, setRickUrl, setMortyUrl }) => {

    let previousUrl = nav.prev;
    let nextUrl = nav.next;

    return (
        <>
            <div className="buttonGroupContainer">
                <ButtonGroup>
                    <Button 
                    onClick={() => setRickUrl("https://rickandmortyapi.com/api/character/?page=1&name=Rick")}
                    >Ricks</Button>
                    <Button 
                    onClick={() => setCharacterUrl("https://rickandmortyapi.com/api/character/?page=1")}
                    >All</Button>
                    <Button 
                    onClick={() => setMortyUrl("https://rickandmortyapi.com/api/character/?page=1&name=Morty")}
                    >Mortys</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button
                        id="default"
                        data-tab="previous"
                        className="navTab active"
                        onClick={() => setCharacterUrl(previousUrl)}
                >
                        Previous
                    </Button>
                    <div className="pageInfo">
                        Page {page} of {nav.pages}
                    </div>
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