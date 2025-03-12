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
    // a list of tuples to store each bday as a tuple pair [bday, name]
    const [bdayObjects, setBdayObjects] = useState<[bday:string, name:string][]>([]);

    const addNewBday = async (newDate:string, newName:string) => {
        const response = await fetch('http://localhost:5000/add-bday', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                date: newDate,
                name: newName,
            })
        });

        if (!response.ok) {
            alert('Error in adding new bday!');
            return;
        }

        const data = await response.json();
        console.log(data.message);
    }

    const handleButtonClick = () => {
        console.log(dateSelected?.format('DD-MMMM-YYYY'));
        console.log("name = " + nameEntered);
        if (dateSelected && nameEntered) {
            // append the new date and new name into bdayObjects array
            const newDate:string = dateSelected.format('DD-MMMM-YYYY');
            const newName:string = nameEntered;
            const newBdayObject:[string, string] = [newDate, newName];
            setBdayObjects(prev => [...prev, newBdayObject]);
            addNewBday(newDate, newName);
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
                {
                    bdayObjects.map((object, index) => (
                        <Box key={index}>{object[0]} - {object[1]}</Box>
                    ))
                }
            </Stack>
        </Box>
    );
}

export default App
