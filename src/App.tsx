import { Box, Button, Card, CardActions, CardContent, Stack, TextField, Typography } from '@mui/material';
import './App.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';


function App() {
    // the date that has been selected through the date picker
    const [dateSelected, setDateSelected] = useState<Dayjs | null>(null);
    // the name that has been entered into the textfield
    const [nameEntered, setNameEntered] = useState<string>('');
    // a list of tuples to store each bday as a tuple pair [bday, name]
    const [bdayObjects, setBdayObjects] = useState<[bday:string, name:string][]>([]);

    const fetchAllBdays = async () => {
        const response = await fetch('http://localhost:5000/all-bday', {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        })

        if (!response.ok) {
            alert('Error in getting all bdays!');
            return;
        }

        const data = await response.json();
        data.bdays.forEach((bday: { date: string; name: string; }) => {
            setBdayObjects((prev) => [...prev, [bday.date, bday.name]])
        });
        console.log(data.message);
    }

    useEffect(() => {
        fetchAllBdays();
    }, [])

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

    const handleAddBday = () => {
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

    const addToCloseFriends = (date:string, name:string) => {
        console.log(`adding to close friends, date: ${date}, name:${name}`);
    }

    const deleteBday = async (date:string, name:string)  => {
        const response = await fetch('http://localhost:5000/delete-bday', {
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                deletingDate: date,
                deletingName: name
            })
        })

        if (!response.ok) {
            alert('Error in deleting bday!');
            return;
        }

        console.log(`deleting bday, date: ${date}, name:${name}`);
        const data = await response.json();
        console.log(data.message);

        // remove the bday by filtering out from existing array
        setBdayObjects(prev => prev.filter(([existingDate, existingName]) => !(existingDate === date && existingName === name)));
    }

    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            margin:'auto',
            marginTop:'40px',
            overflowX:'hidden'
        }}>
            <Stack spacing={2}>
            <TextField id="filled-basic" label="Enter name" variant="filled" value={nameEntered} onChange={(event) => setNameEntered(event.target.value)}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{width:'400px'}} value={dateSelected} onChange={(newValue) => setDateSelected(newValue)}/>
                </LocalizationProvider>
                <Button sx={{width:'400px'}} variant='contained' onClick={handleAddBday}>Add Bday</Button>
            </Stack>

            <Stack spacing={2} sx={{width:'400px', marginTop:'60px'}}>
                {
                    bdayObjects.map((object, index) => (
                        <Box key={index}>
                            <Card variant='outlined'>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {object[1]}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{object[0]}</Typography>
                                </CardContent>
                                <CardActions sx={{
                                    display:'flex',
                                    justifyContent:'space-between'
                                }}>
                                    <Button variant='outlined' onClick={() => addToCloseFriends(object[0], object[1])} size="small">Add to Close Friends</Button>
                                    <Button variant='outlined' onClick={() => deleteBday(object[0], object[1])} size="small">Delete</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    ))
                }
            </Stack>
        </Box>
    );
}

export default App
