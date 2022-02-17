import Event from "./Event"

function Events({events}) {
    console.log(events[0])
    return (
        <>
            {events.filter((x) => x.image !== "").map((x) => (
                <Event event = {x} />
            ))} 
        </>
    )
}

export default Events