import { Box, Image, Badge } from '@chakra-ui/react'

function Event({event}) {
  
    return (
      <div className = "boxdiv">
        <Box maxW='xlg' className = "box" boxShadow='dark-lg'>
          <Badge px='2' colorScheme='teal'>
              New Event
          </Badge>  
          <h1 className = "articletitle">
            {event.title}
          </h1>
          <Image src={event.image} alt={"a"} className = "image"/> 
          <div className = "text">                        
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
          </div>                       
        </Box>
      </div>
    )
  }

export default Event