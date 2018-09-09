const mysql = require('mysql');
const axios = require('axios');
const urlencode = require('urlencode');

//Database connection functions
function DBconnection(connection){
  return new Promise(resolve=>{
    connection = mysql.createConnection({
      host: '',     //input your DB host
      user: '',     //input your id
      password: '', //input your passwd
      database: ''  //input your schema
    });

    //Database connection
    connection.connect((err) => {
      if(err) {
        throw err;
        check = 'connectionErr';
      } else {
        console.log("DB Connection done");
      }
    });

    resolve(connection);

  })
}


//Queries that load data for use in the API
function findNull(connection){
  return new Promise(resolve=>{

    var check;

    //Query to find null data
    connection.query('select * from place where condition is null or longitude is null', function(err, rows, fields) {
      if (err){
        console.log('ERROR' + err);
        check = 'queryErr';
        connection.end();
        resolve(check);
      }else{
        check = rows;
        resolve(check);
      }
    });

  })
}


//A function that takes an address of data whose latitude and longitude values ​​are empty in the database for api to get latitude and longitude
function useAPI(address){
  return new Promise(resolve=>{
    var encoding = urlencode(address);
    var API = axios('https://maps.googleapis.com/maps/api/geocode/json?address=' + encoding + '&' +YOUR_API_KEY);

    resolve(API);

  })
}


//A function that extracts latitude and longitude from received JSON data
function Wlatlng(json){
  return new Promise(resolve=>{
    var data = [];
    data.push(json.data.results[0].geometry.location.lat);
    data.push(json.data.results[0].geometry.location.lng);
    resolve(data);
  })
}


//A function that updates the received latitude and longitude values ​​to the database.
function updateAddress(lnglat, connection){
  return new Promise(resolve=>{

    //Update Query
    connection.query('UPDATE place SET latitude = ?, longitude = ? where address address = ?', lnglat, function(err, rows, fields) {
      if (err){
        console.log('ERROR' + err);
        //If the update fails
        resolve(false);
        return;
      }else{
        //If the update success
        resolve(true);
      }
    });

  })
}


async function go() {
  try {

    var connection;
    connection = await DBconnection();

    const DB = await findNull(connection);

    if(DB == 'connectionErr'){
      console.log('DB connection err!');
      //Error on database connection, process termination
      process.exit();
    }else if(DB == 'queryErr'){
      console.log('Querry Request err!');
      //Error on database query, process termination
      process.exit();
    }

    if(DB == '' || null || undefined || 0 || NaN){
      console.log('Data is empty');
    }else{
      for(idx in DB){

        var json = await useAPI(DB[idx].address);

        //If you use the API, the status has 6 states for it.
        //Handling accordingly
        if(json.data.status == 'OK'){
          //If the data received through the API exists, use it
            var latlng = await Wlatlng(json);
            latlng.push(DB[idx].address);
            //The latlng stores latitude and longitude values, and the query values ​​are grouped together.

            var queryCheck = await updateAddress(latlng, connection);
            if(queryCheck == false){
              console.log('Update Fail');
            }else{
              console.log('Update done');
            }

        }else if(json.data.status == 'ZERO_RESULTS'){
          console.log('Address not found');
        }else if(json.data.status == 'OVER_QUERY_LIMIT'){
          console.log('Exceeded quota');
        }else if(json.data.status == 'REQUEST_DENIED'){
          console.log('Deny request');
        }else if(json.data.status == 'INVALID_REQUEST'){
          console.log('Missing query');
        }else if(json.data.status == 'UNKNOWN_ERROR'){
          console.log('Error by server');
        }else{
          console.log('Unknown error');
          console.log(json.data);
        }

      }

      connection.end();
    }

    process.exit();
    //When all jobs are finished, the process is terminated

  } catch (e) {
    console.error(e);
  }
}

go();
