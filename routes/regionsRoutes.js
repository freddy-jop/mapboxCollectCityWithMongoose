const router = require('express').Router();
const RegionsModel = require('../models/regions');
const { generateRegions } = require('../inputDatas/generateCity');
const { 
    docMatch,
    docLookup,
    docSort
  } = require('../aggregation/regionsAndDepartments');


router.get('/findAll', (req, res) => {
  RegionsModel.find((err, results) => {
    if(err) {
       return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

router.get('/regionByIdWithDepartments/:id', (req, res) => {
  RegionsModel
    .aggregate([
        docMatch({ num_region: { $eq: Number(req.params.id) }}),
        docLookup("departments"),
        docSort({ "num_department": -1 })
      ], (err, results) => {
      if(err) {
       return res.status(500).send(err);
      }
      res.status(200).json(results);
    });
});

router.get('/regionByIdWithCoordinates/:id', (req, res) => {
  RegionsModel
    .aggregate([
        docMatch({ num_region: { $eq: Number(req.params.id) }}),
        docLookup("departments"),
        docSort({ "num_department": -1 })
      ], (err, results) => {
      if(err) {
       return res.status(500).send(err);
      }
      res.status(200).json(results);
    });
});

router.get('/createRegions', (req, res) => {
  generateRegions()
    .then(async regions => {
      const regionsList = regions;
      for (let i = 0, j = regionsList.length; i < j; i++) {
        const newRegion = JSON.parse(regionsList[i]);
        const region = new RegionsModel(newRegion);
        await region.save();
      }
    })
    .then(() => {
      RegionsModel.find((err, results) => {
        if(err) {
          return res.status(500).send(err);
        }
        res.status(200).json(results);
      });
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

module.exports = router;
