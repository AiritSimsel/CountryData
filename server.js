const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const { response } = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', ejs);
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res)=>{
    let userCountry = "";
    res.render('index.ejs', {CountryInfo: userCountry});
});

app.post('/', (req, res)=> {
    let userCountry = req.body.country;

    const url = `https://restcountries.com/v2/name/${userCountry}`;    
      

    axios.get(url)
    .then((response)=>{
        console.log(response.data[0]);
        let countryData = {
            countryName: response.data[0].name,
            countryDomain: response.data[0].topLevelDomain[0],
            countryCallingCode: response.data[0].callingCodes[0],
            countryCapital: response.data[0].capital,
            countryRegion: response.data[0].region,
            countrySubregion: response.data[0].subregion,
            countryPopulation: response.data[0].population,
            countryTimezone: response.data[0].timezones[0],
            countryLanguage: response.data[0].languages[0].name,
            countryCurrency: response.data[0].currencies[0].name,
            countryCurrencyCode: response.data[0].currencies[0].code,
            countryCurrencySymbol: response.data[0].currencies[0].symbol,
            countryFlag: response.data[0].flag
        };

       
        res.render('index.ejs', {CountryInfo: countryData});    
    })
    .catch((error)=>{
        console.log(error);
    });
});
app.listen(5000, ()=> {
    console.log('Server is running on port 3000');
});