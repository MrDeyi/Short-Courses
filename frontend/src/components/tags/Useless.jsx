import {Button} from '@mui/material';
import {useState} from 'react';
import TagsDialog from './TagsDialog';


const Useless = () =>{
    let courseName = 'Machine Learning';
    const [open, setOpen] = useState(false);

    const onOpen = () =>{
        console.log('open')
        setOpen(true);
    }

   
    

    return(
        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Button variant = 'outlined' onClick = {onOpen}>Open Dialog</Button>
            <TagsDialog open = {open} close = {setOpen} courseName = {courseName} courseID = "2022ossp"/>

            <Button variant = 'outlined' >EG</Button>
        </div>
    )
}

export default Useless;