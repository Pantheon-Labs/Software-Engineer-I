import { Box, Image, Badge } from '@chakra-ui/react'

function Event({event}) {
  
    return (
      <div className = "boxdiv">
        <Box maxW='lg' className = "box">
          <Badge px='2' colorScheme='teal'>
              New Event
          </Badge>  
          <Image src={event.image} alt={"a"} /> 
          <div className = "text">          
            <h1>
              {event.title}
            </h1>              
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
          </div>                       
        </Box>
      </div>
    )
  }

export default Event