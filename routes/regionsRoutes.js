const router = require('express').Router();
const RegionsModel = require('../models/regions');
const { generateRegions } = require('../inputDatas/generateCity');


router.get('/findAll', (req, res) => {
  RegionsModel.find((err, results) => {
    if(err) {
       return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

router.get('/findWithDepartments/:region', (req, res) => {
  RegionsModel
    .aggregate([
      {
        $match: {region_name: req.params.region} // find condition
    },
    {
       $unwind: "$departments" // explode slide array of each document
    },
    {
        $lookup: { // resolve dependencies, take object in mycrosscollections where  mycrosscollections._id == $slides.item
            from:  "regions",
            "localField": "$departments.region_name",
            "foreignField": "region_name",
            "as": "resolveDepartments"
        }
    },
    {
        $group : { // push back resolve items in slides fields, and regroup by document id
            region_name: "$region_name",
            departments: {$push: "$resolveSlides"}
        }
     }
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
      for (i = 0, j = regionsList.length; i < j; i++) {
        const newRegion = JSON.parse(regionsList[i])
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
