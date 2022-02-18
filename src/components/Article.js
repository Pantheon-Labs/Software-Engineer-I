import { Box, Image, Badge } from '@chakra-ui/react'

function Article({article}) {
    return (
      <div className = "boxdiv">
        <Box className = "box" boxShadow='dark-lg'> 
          <h1 className = "articletitle">
            {article.title}
          </h1> 
          <a href = {article.url}>
            <Image src={article.multimedia[0].url} alt={"a"} className = "image"/> 
          </a>
          <div className = "text">                      
            <p>{article.abstract}</p>
          </div>                       
        </Box>
      </div>
    )
  }

export default Article