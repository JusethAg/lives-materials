import { readFileSync } from 'fs';
const path = require('path');
const jsonPath = path.join(__dirname, 'dummy-data.json')

const rawData = readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' });
const portfolios = JSON.parse(rawData);

const DbWrapper = {
    getById:  ({ id }) => {
        if (portfolios[id]) {
            return portfolios[id]
        }

        throw new Error(`No data found by ID ${id}`)
    },
    
    getAll: () => {
        return portfolios;
    }
};


export default DbWrapper;