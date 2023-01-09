import {React,memo} from 'react'
import { Typography , Button , Box ,  } from '@mui/material';
import { BarChart as ChartIcon} from '@mui/icons-material'
import {format} from 'date-fns';

const LinkCard = ({id,createdAt,name,longURL,shortCode,totalClicks,deleteLink,copyLink}) => {
    const shortUrl = `${window.location.host}/${shortCode}`;
    console.log("link card rendered");
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box>
            <Typography variant='overline' color='textSecondary'>Created at {format(createdAt,'d MMM, HH:mm')}</Typography>
            <Box my={2}>
            <Typography style={{marginBottom:"5px"}} variant="h5">{name}</Typography>
            <Typography>{longURL}</Typography>
            </Box>
                <Box display="flex" alignItems="center">
                    <Typography color="primary">{shortUrl}</Typography>
                    <Box mx={2}><Button onClick={()=>copyLink(shortUrl)} color="primary" size="small" variant="outlined">Copy</Button></Box>
                    <Button onClick={()=>deleteLink(id)} color="secondary" size="small" variant="contained" disableElevation>Delete</Button>
                </Box>
            </Box>
            <Box>
            <Box display='flex' justifyContent='center'>
                <Typography>{totalClicks}</Typography>
                <ChartIcon/>
            </Box>
            <Typography variant='overline'>Total Clicks</Typography>
        </Box>
    </Box>
  )
}

export default memo(LinkCard)