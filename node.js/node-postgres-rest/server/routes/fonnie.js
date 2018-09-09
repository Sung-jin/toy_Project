const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const fonnieCreate = require('../models/fonnie/create');
const fonnieRead = require('../models/fonnie/read');
const fonnieUpdate = require('../models/fonnie/update');
const fonnieDelete = require('../models/fonnie/delete');
const env = require('../../config/env');

var fonniePool = new pg.Pool(env.fonnieConfig);

router.post('/', (req, res, next) => {
  // Grab data from http request
  const data = {text: req.body.text, complete: 'false'};

  if(!(data.complete == 'true' || data.complete == 'false')){
    return res.status(500).json({success: false, data: data});
  }

  fonniePool.connect((err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    var check = fonnieCreate.createDataFunc(data, client);

    check.then(function(result){
      done();
      return res.json(result);
    }).catch(function(err){
      res.status(err.status || 500);
      done();
      return res.render(err);
    });

  });
});

router.get('/', (req, res, next) => {
  // Get a Postgres client from the connection pool

  fonniePool.connect((err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    var check = fonnieRead.readDataFunc(client);

    check.then(function(result){
      done();
      return res.json(result);
    }).catch(function(err){
      res.status(err.status || 500);
      done();
      return res.render(err);
    });

  });
});

router.put('/:todo_id', (req, res, next) => {
  // Grab data from the URL parameters
  const id = req.params.todo_id;
  // Grab data from http request
  const data = {text: req.body.text, complete: req.body.complete};
  // Get a Postgres client from the connection pool

  fonniePool.connect((err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    var check = fonnieCreate.updateDataFunc(data, id, client);

    check.then(function(result){
      done();
      return res.json(result);
    }).catch(function(err){
      res.status(err.status || 500);
      done();
      return res.render(err);
    });

  });
});

router.delete('/:todo_id', (req, res, next) => {
  // Grab data from the URL parameters
  const id = req.params.todo_id;
  // Get a Postgres client from the connection pool

  fonniePool.connect((err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    var check = fonnieDelete.deleteDataFunc(id, client);

    check.then(function(result){
      done();
      return res.json(result);
    }).catch(function(err){
      res.status(err.status || 500);
      done();
      return res.render(err);
    });

  });
});

module.exports = router;
