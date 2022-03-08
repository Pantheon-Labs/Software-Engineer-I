import { Box, Image } from '@chakra-ui/react'
import { Divider, Grid, Segment } from 'semantic-ui-react'

function Article({article}) {
    return (
      <div className = "boxdiv">
      <Box maxW='xlg' className = "box" boxShadow='dark-lg'> 
        <h1 className = "articletitle">
            {article.title}
        </h1>
        <Segment>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <a href = {article.url}>
                {article.multimedia ? <Image src={article.multimedia[1].url} alt={"a"} className = "image"/> : <></>}
              </a>
            </Grid.Column>
            <Grid.Column>
              <div className = "text">                        
                <p>{article.abstract}</p>
              </div>   
            </Grid.Column>
          </Grid>
          <Divider vertical></Divider>
        </Segment>                             
      </Box>
    </div>
    )
  }

export default Article