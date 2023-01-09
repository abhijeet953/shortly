import { CircularProgress, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { app, firestore } from '../../firebase';


const LinkRedirect = () => {
    const { shortCode } = useParams();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLinkDoc = async () => {
            const linkDoc = await firestore.collection('links').doc(shortCode).get();
            console.log(linkDoc.data);
            if (linkDoc.exists) {
                const { longURL, linkID, userUid } = linkDoc.data();
                firestore.collection('users').doc(userUid).collection('links').doc(linkID).update({
                    totalClicks: app.firestore.FieldValue.increment(0.5),
                })
                console.log(longURL);
                console.log(longURL);
                console.log(longURL);
                window.location.href = longURL;
            }
            else {
                setLoading(false);
            }
        };
        fetchLinkDoc()
    }, [])
    if (loading)
        return (
            <Box mt={10} textAlign='center'>
                <CircularProgress />
                <Typography>Redirecting</Typography>
            </Box>
        )
    else
        //Last time yehi error thorw ho rha tha so remove kar k dekh lena kya error dega is baar
        return (
            <Box mt={10} textAlign='center'>
                <Typography>Broken Link</Typography>

            </Box>
        )
}

export default LinkRedirect