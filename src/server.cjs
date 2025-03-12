const express = require('express');             // create the server
const fs = require('fs');                       // for reading and writing files
const path = require('path');                   // for working with files and directory paths
const cors = require('cors');                   // middleware for CORS (Cross Origin Resource Sharing)

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())

const dataFilePath = path.join(__dirname, '../data/data.json');

// read data from json file.
const readTableData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error in reading data: ${error}`);
    }
};

// write data back to the json file.
const writeTableData = (data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error in writing data to data.json: ${error}`);
    }
};

// add a new bday {date, name} to the list of bdays in data.json
app.post('/add-bday', (req, res) => {
    const {date, name} = req.body;

    if (!date || !name) {
        return res.status(400).json({ message:'Error in adding bday, date or name is missing.' });
    }

    try {
        const data = readTableData();
        data.push({date, name});
        writeTableData(data);

        return res.status(200).json({ message:`Successfully added new bday, date:${date}, name:${name}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error while saving new bday.' });
    }
})

// get all bdays in the list of bdays in data.json
app.get('/all-bday', (req, res) => {
    try {
        const data = readTableData();
        return res.status(200).json({ message:'Successfully retrieved all bdays.', bdays: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error while retrieving all bdays.' });
    }
})

// remove bday from the existing list of bdays in data.json
app.delete('/delete-bday', (req, res) => {
    const {deletingDate, deletingName} = req.body;

    if (!deletingDate || !deletingName) {
        return res.status(400).json({ message:'Error in deleting bday, date or name is missing.' });
    }

    try {
        const allBdays = readTableData();
        if (!allBdays) {
            return res.status(400).json({ message:'Error in deleting bday, empty data.' });
        }
        const newBdays = allBdays.filter(({date, name}) => !(date === deletingDate && name === deletingName));
        writeTableData(newBdays);

        return res.status(200).json({ message:`Successfully deleted bday, date:${deletingDate}, name:${deletingName}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error while deleting bday.' });
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});