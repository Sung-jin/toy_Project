const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const jimp = require('jimp');
const cors = require('cors');
const pg = require('pg');
const path = require('path');
const ashtrayLoadLocation = require('../models/ashtray/loadLocation');
const ashtrayUploadImage = require('../models/ashtray/uploadEventImage');
const ashtrayLoadEventImages = require('../models/ashtray/loadEventImages');
const env = require('../../config/env');

router.use(cors());
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const upload = multer({
  storage: multer.memoryStorage()
});

var ashtrayPool = new pg.Pool(env.ashtrayConfig);

router.post('/', upload.single('image'), (req, res, next) => {

  var auth = {
    id : '',
    passwd : ''
  };

  //디비에 접근하는데 일단은 학인차로 따로 저렇게 빼놨는데
  //env에 다 넣어뒀지만 정말 쓰일때는 사용자가 아이디 비번을 입력하도록 하거나
  //그래야지 url로 쉽게 접근가능하게 만들어뒀으니 인증작업이 필요하겠지요

  auth.id = req.body.id;
  auth.passwd = req.body.passwd;

  if(!(auth.id == 'test', auth.passwd == '1q2w3e4r')){
    return res.send('No permission');
  }

  var img = req.files || req.file || null;
  if(img){
    var data = {
      'base64_Image' : null,
      'type' : null,
      'name' : null
    };
    data['base64_Image'] = img.buffer.toString('base64');
    data['type'] = img.mimetype;
    data['name'] = img.originalname;

    ashtrayPool.connect((err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }

      var check = ashtrayUploadImage.uploadEventImageFunc(client, data);

      check.then(function(result){
        done();
        return res.json(result);
      }).catch(function(err){
        res.status(err.status || 500);
        done();
        return res.send(err);
      });

    });
  }

});

router.get('/', (req, res, next) => {
  // Get a Postgres client from the connection pool
  ashtrayPool.connect((err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    var check = ashtrayLoadLocation.loadLocationDataFunc(client);

    check.then(function(result){
      done();
      return res.json(result);
    }).catch(function(err){
      res.status(err.status || 500);
      done();
      return res.send(err);
    });

  });
});

router.get('/eventImages', (req, res, next) => {
  // Get a Postgres client from the connection pool
  ashtrayPool.connect((err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    var check = ashtrayLoadEventImages.loadEventImages(client);

    check.then(function(result){
      done();
      return res.json(result);
    }).catch(function(err){
      res.status(err.status || 500);
      done();
      return res.send(err);
    });

  });
});

module.exports = router;
