import { Box, Button, Stack, TextField } from '@mui/material';
import './App.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { useState } from 'react';


function App() {
    // the date that has been selected through the date picker
    const [dateSelected, setDateSelected] = useState<Dayjs | null>(null);
    // the name that has been entered into the textfield
    const [nameEntered, setNameEntered] = useState<string>('');
    // the list of dates that have been selected and saved
    const [datesSaved, setDatesSaved] = useState<string[]>([]);
    // the list of names that have been saved
    const [names, setNames] = useState<string[]>([]);

    const handleButtonClick = () => {
        console.log(dateSelected?.format('DD-MMMM-YYYY'));
        console.log("name = " + nameEntered);
        if (dateSelected && nameEntered) {
            // append the new date and new name into dateSaved array and names array 
            setDatesSaved(prev => [...prev, dateSelected.format('DD-MMMM-YYYY')]);
            setNames(prev => [...prev, nameEntered]);
        }
        // clear the fields
        setDateSelected(null);
        setNameEntered('');
    }

    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            margin:'auto',
            marginTop:'80px',
            overflowX:'hidden'
        }}>
            <Stack spacing={2}>
            <TextField id="filled-basic" label="Enter name" variant="filled" value={nameEntered} onChange={(event) => setNameEntered(event.target.value)}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{width:'400px'}} value={dateSelected} onChange={(newValue) => setDateSelected(newValue)}/>
                </LocalizationProvider>
                <Button sx={{width:'400px'}} variant='contained' onClick={handleButtonClick}>Add Bday</Button>
            </Stack>

            <Stack>
                {datesSaved.map((date, index) => (
                    <Box key={index}>{names[index]}-{date}</Box>
                ))}
            </Stack>
        </Box>
    );
}

export default App
