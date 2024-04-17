import express from 'express';
import axios from 'axios';
import cors from 'cors';
import https from 'https';
import connectDb from './utils/connectDB.mjs';
import Data from './models/data.mjs';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());
connectDb;

app.get('/data', async (req,res)=>{
  try {
    const data = await Data.find();
    res.json(data);
} catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal server error' });
}
})

//Third Party API for Weather Report By City
app.get('/weather', async (req, res) => {
  try {
    const cityName = req.query.city;
    const apiKey = '4a718107f392445482898879b654c3ab'; // Replace this with your Weatherbit API key
    const agent = new https.Agent({
      rejectUnauthorized: false // Ignore SSL certificate verification
    });

    const response = await axios.get(`https://api.weatherbit.io/v2.0/current`, {
      params: {
        city_name: cityName,
        key: apiKey,
        units: 'I'
      },
      httpsAgent: agent
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  // app.get('/data/last1hour', async (req, res) => {
//   
//   const currentTime = new Date('2024-01-21T17:00:01Z');
//   const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);
//   
//   //const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
//   console.log(oneHourAgo);
//   try {
//     const data = await Data.find({ "ts": "2024-01-21T15:00:19Z" });
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   }
// });

// app.get('/data/last8hours', async (req, res) => {
//   const db = client.db();
//   const collection = db.collection('test');
//   //
//   const currentTime = new Date('2024-02-21T17:00:01Z');
//   const eightHoursAgo = new Date(Date.now() - 8 * 60 * 60 * 1000);
//   try {
//     const data = await collection.find({ ts: { $gte: eightHoursAgo } }).toArray();
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   }
// });

// app.get('/data/last12hours', async (req, res) => {
//   const db = client.db();
//   const collection = db.collection('test');
//   const twelveHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//   try {
//     const data = await collection.find({ ts: { $gte: twelveHoursAgo } }).toArray();
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   }
// });

app.get('/data/last1hour', async (req, res) => { 
  const currentTime = new Date('2024-01-21T17:00:01Z'); 
  const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000); 
  // // const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); 
  console.log(oneHourAgo);
  try { 
    const data = await Data.find({ "ts": {$gte: oneHourAgo} }); 
    res.json(data); 
  } catch (error) { 
    console.error('Error fetching data:', error); 
    res.status(500).send('Error fetching data'); 
  } 
});
    
// app.get('/data/last1hour', async (req, res) => { 
//   // const currentTime = new Date('2024-01-21T17:00:01Z'); 
//   const eightHourAgo = new Date(currentTime.getTime() - 8 * 60 * 60 * 1000); 
//   // //const eightHoursAgo = new Date(Date.now() - 8 * 60 * 60 * 1000); 
//   try { 
//     const data = await Data.find({ "ts": {$gte: eightHoursAgo} }); 
//     res.json(data); 
//   } catch (error) { 
//     console.error('Error fetching data:', error); 
//     res.status(500).send('Error fetching data'); 
//   } 
// }); 

// app.get('/data/last1hour', async (req, res) => { 
//   // const currentTime = new Date('2024-01-21T17:00:01Z'); 
//   const twentyfourHoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); 
//   // //const twentyfourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); 
//   console.log(twentyfourHoursAgo); 
//   try { 
//     const data = await Data.find({ "ts": {$gte: twentyfourHoursAgo} }); 
//     res.json(data); 
//   } catch (error) { 
//     console.error('Error fetching data:', error); 
//     res.status(500).send('Error fetching data'); 
//   } 
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
