const { regionsProvider, departmentsProvider } = require('../utils/providers');

const generateRegions = () => new Promise((resolve, reject) => {
  regionsProvider.get()
    .then((data) => {
      let regionsList = [];
      const features = data.data.features;
      for (let i = 0, j = features.length; i < j; i++) {
        regionsList.push({
          num_region: Number(features[i].properties.code),
          region_name: features[i].properties.nom
        });
      }
      return resolve(regionsList);
    })
    .catch((err) => {
      return reject(err);
    });
});

const generateDepartments = () => new Promise((resolve, reject) => {
  departmentsProvider.get()
    .then((data) => {
      let departmentsList = [];
      const departments = data.data;
      for (let i = 0, j = departments.length; i < j; i++) {
        const numberDepartment = Number(departments[i].num_dep);

        if(!isNaN(numberDepartment)) {
          departmentsList.push({
            num_department: !Number.isInteger(departments[i].num_dep) ? numberDepartment : departments[i].num_dep,
            department_name: departments[i].dep_name,
            region_name: departments[i].region_name
          });
        } else {
          departmentsList.push({
            num_department: departments[i].num_dep,
            department_name: departments[i].dep_name,
            region_name: departments[i].region_name
          });
        }
      }
      return resolve(departmentsList);
    })
    .catch((err) => {
      return reject(err);
    });
});

module.exports = {
  generateRegions,
  generateDepartments
}