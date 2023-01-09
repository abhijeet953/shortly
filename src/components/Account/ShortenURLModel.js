import { Close as CloseIcon } from "@mui/icons-material"
import { Dialog , DialogTitle , DialogContent ,DialogActions , Button , Box ,TextField , IconButton} from "@mui/material"
import { useState } from "react";


const ShortenURLModel = ({ handleClose , createShortenLink}) => {

  const [form, setForm] = useState({
    name: "",
    longUrl: "",
  });

  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

    const handleSubmit = ()=>{
      createShortenLink(form.name,form.longUrl)
    }

  return (
    <Dialog open={true} onClose={handleClose} fullWidth>
            <DialogTitle>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                Create short URL
                <IconButton onClick={handleClose} size="small">
                  <CloseIcon />
                </IconButton>
              </Box> 
          </DialogTitle>
          <DialogContent>
            <Box mb={3}><TextField  variant='filled' label="Name" fullWidth value={form.name} onChange={handleChange} name="name"/></Box>
                          <TextField variant='filled' label="Long URL" fullWidth value={form.longUrl} onChange={handleChange} name="longUrl"/> 
          </DialogContent>
          <DialogActions>
            <Box mr={2} my={1}><Button onClick={handleSubmit} color='primary' variant='contained' disableElevation>Shorten</Button></Box>
          </DialogActions>
    </Dialog>
  )
}

export default ShortenURLModel