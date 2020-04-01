const router = require('express').Router();
const DepartmentsModel = require('../models/departments');
const RegionsModel = require('../models/regions');
const { generateDepartments } = require('../inputDatas/generateCity');
const { 
    docMatch,
    docLookup
  } = require('../aggregation/regionsAndDepartments');


router.get('/findAll', (req, res) => {
  DepartmentsModel.find((err, results) => {
    if(err) {
       return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

router.get('/departmentById/:id', (req, res) => {
  DepartmentsModel
    .aggregate([
        docMatch({ num_department: { $eq: Number(req.params.id) }}),
        docLookup("regions"),
      ], (err, results) => {
      if(err) {
       return res.status(500).send(err);
      }
      res.status(200).json(results);
    });
});

router.get('/createDepartments', (req, res) => {
  generateDepartments()
    .then(departments => {
      const departmentsList = departments;
      RegionsModel.find(async (err, results) => {
        if(err) {
          return res.status(500).send(err);
        }
        for (let i = 0, j = departmentsList.length; i < j; i++) {
          const region = await results.find((region) => {
            if(departmentsList[i].region_name === region.region_name) {
              return region;
            }
          });
          
          departmentsList[i].num_region = region.num_region;
          delete departmentsList[i].region_name;
          const newDepartment = departmentsList[i];
          const department = new DepartmentsModel(newDepartment);
          await department.save();
        }
      });
    })
    .then(async () => {
      await DepartmentsModel.find((err, results) => {
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