import Event from "./Event"

function Events({events}) {
    return (
        <>
            {events.filter((x) => x.image !== "").map((x, y) => (
                <Event event = {x} key = {y} />
            ))} 
        </>
    )
}

export default Events