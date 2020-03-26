const { regionsProvider } = require('../utils/providers');

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

module.exports = {
  generateRegions
}