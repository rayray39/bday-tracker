import { Button, Stack } from '@mui/material';
import './App.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { useState } from 'react';


function App() {
    const [dateSelected, setDateSelected] = useState<Dayjs | null>(null);

    const handleButtonClick = () => {
        console.log('day selected ' + dateSelected?.date());
        if (dateSelected?.month()) {
            console.log('month selected ' + (dateSelected.month() + 1));
        }
        console.log('year selected ' + dateSelected?.year());
        console.log(dateSelected);
    }

    return (
        <Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={dateSelected} onChange={(newValue) => setDateSelected(newValue)}/>
            </LocalizationProvider>
            <Button onClick={handleButtonClick}>click me</Button>
        </Stack>
    );
}

export default App
