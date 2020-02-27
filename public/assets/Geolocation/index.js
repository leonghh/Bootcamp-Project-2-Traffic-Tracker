const csv = require('csv-parser');
const fs = require('fs');
var axios = require("axios");

function getCoods() {
  const addressArr = [];

  fs.createReadStream('FilteredFootTrafficCount.csv')
    .pipe(csv())
    .on('data', (row) => {
      addressArr.push(row.road_name);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      
      for (i = 0; i < addressArr.length; i++) {
        const queryURL = "https://us1.locationiq.com/v1/search.php?key=e329d0577c126d&street=" + addressArr[i] + "&postalcode=2000&format=json"
        return axios.get(queryURL)
          .then(function (response) {
          console.log(queryURL)
          console.log(response.data[i].lat)
          console.log(response.data[i].lon)
          });
      }
    });


  // const queryURL = "https://us1.locationiq.com/v1/search.php?key=e329d0577c126d&street=" + location + "&postalcode=2000&format=json"
  // return axios.get(queryURL)
  //   .then(function (response) {
  //     // console.log(response.data[0])
  //     console.log(response.data[0].lat)
  //     console.log(response.data[0].lon)
  //   });
};

getCoods();

