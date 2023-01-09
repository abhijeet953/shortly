import React, { useMemo } from 'react'
import { Typography , Button , Box , Grid , Divider ,Snackbar} from '@mui/material'
import Navbar from './Navbar'
import { useState ,Fragment , useEffect , useCallback } from 'react'
import LinkCard from './LinkCard'
import ShortenURLModel from './ShortenURLModel';
import { app, firestore ,auth } from '../../firebase';
import { nanoid } from "nanoid";
import copy from 'copy-to-clipboard'

// const dummyData=[{
//     id:'xyz',
//     createdAt:new Date(),
//     name:'My website',
//     longURL:'https://google.com',
//     shortCode:'ab1234',
//     totalClicks:313
// },
// {
//     id:'abc',
//     createdAt:new Date(),
//     name:'My website',
//     longURL:'https://google.com',
//     shortCode:'ab1234',
//     totalClicks:313
// },{
//     id:'def',
//     createdAt:new Date(),
//     name:'My website',
//     longURL:'https://google.com',
//     shortCode:'ab1234',
//     totalClicks:313
// }
// ]

const Account = () => {
    const [clipboard,setClipboard]=useState(false)
    const [openModel,setOpenModel] = useState(false);
    const[links,setLinks]=useState([]);
    // const userUid = auth.currentUser.uid;
    const linksPathRef = useMemo(()=>firestore.collection('users').doc(auth.currentUser.uid).collection('links'),[]);



    const handleCreateShortenLink = async (name,longURL) =>{
        console.log("yes");
        const link={
            name,
            longURL:longURL.includes('https://') || longURL.includes('http://') ? longURL:`http://${longURL}`,
            createdAt: app.firestore.FieldValue.serverTimestamp(),
            shortCode : nanoid(6),
            totalClicks:0 
        };

        const resp = await firestore.collection('users').doc(auth.currentUser.uid).collection('links').add(link);
        setLinks(links=>[...links,{ ...link , createdAt:new Date(),id:resp.id}])
        setOpenModel(false);
    };

    useEffect(()=>{
        const fetchLinks = async () =>{
           const snapshot =  await firestore.collection('users').doc(auth.currentUser.uid).collection('links').get(); 
            const tempLinks =[]; 
           snapshot.forEach(doc => tempLinks.push({...doc.data(),id:doc.id,createdAt:doc.data().createdAt.toDate()}))
            setLinks(tempLinks)
        }
        fetchLinks();
    },[linksPathRef]);


    const handleDeleteLink = useCallback(async (linkDocID) =>{
        await firestore.collection('users').doc(auth.currentUser.uid).collection('links').doc(linkDocID).delete();
        setLinks(oldLinks=>oldLinks.filter((link)=>link.id!==linkDocID))
    },[])

    const handleCopyLink =useCallback((shortUrl) =>{
        copy(shortUrl);
        setClipboard(true)
    },[])

  return (
    <>
    <Snackbar open={clipboard} autoHideDuration={1000} onClose={()=>setClipboard(false)} message="Copied to Clipboard"/>
    {openModel && <ShortenURLModel createShortenLink={handleCreateShortenLink}  handleClose={()=>setOpenModel(false)}/>}
       <Navbar />
       <Box mt={5}>
            <Grid container justifyContent='center'>
                <Grid item  xs={8}>
                    <Box display="flex" mb={5}>
                        <Typography mr={3} variant="h4">Links</Typography>
                        <Button onClick={()=>setOpenModel(true)} variant='contained' color='primary' disableElevation>Create</Button>
                    </Box>
                    
                    {links.sort(
                        (prevLink, nextLink) =>
                          nextLink.createdAt - prevLink.createdAt
                      ).map( (link,idx)=>
                        <Fragment key ={link.id}>
                       <LinkCard   id={link.id} createdAt={link.createdAt} name={link.name} longURL={link.longURL} shortCode={link.shortCode} totalClicks={link.totalClicks}  deleteLink={ handleDeleteLink} copyLink={handleCopyLink}/>
                        {
                            idx!==links.length - 1 &&
                            <Box my={4}><Divider/></Box>
                        } 
                        </Fragment>
                        )}
                    
                </Grid>  
            </Grid>
        </Box>
    </>
  )
}

export default Account