import { Box, Image, Badge } from '@chakra-ui/react'
import { Divider, Grid, Segment } from 'semantic-ui-react'

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
          <Segment>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <a href = {event.link}>
                  <Image src={event.image} alt={"a"} className = "image"/> 
                </a>
              </Grid.Column>
              <Grid.Column>
                <div className = "eventtext">                        
                  <div dangerouslySetInnerHTML={{ __html: event.description }} />
                </div>   
              </Grid.Column>
            </Grid>
            <Divider vertical></Divider>
          </Segment>                             
        </Box>
      </div>
    )
  }

export default Event