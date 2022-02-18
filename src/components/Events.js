import Event from "./Event"
import { Header, Icon } from 'semantic-ui-react'

function Events({events}) {
    console.log(events[0])
    return (
        <div className="eventsdiv">
            <Header as='h1' block>
                Todays Events
            </Header>
            {events.filter((x) => x.image !== "").map((x, y) => (
                <Event event = {x} key = {y} />
            ))} 
        </div>
    )
}

export default Events