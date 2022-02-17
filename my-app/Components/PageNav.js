const PageNav = ({ nav, setCharacterUrl }) => {
    
    let previousUrl = nav.prev;
    let nextUrl = nav.next;

    return (
        <>
            <div className="tab">
                <button
                    id="default"
                    data-tab="previous"
                    className="navTab active"
                    onClick={() => setCharacterUrl(previousUrl)}
                >
                    Previous
                </button>
                <button
                    data-tab="info"
                    className="navTab"
                    onClick="openTab(event, 'info')"
                >
                    Info
                </button>
                <button
                    data-tab="next"
                    className="navTab"
                    onClick={() => setCharacterUrl(nextUrl)}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default PageNav