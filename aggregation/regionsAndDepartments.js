const docMatch = (expMatch) => {
  return {
    $match: expMatch
  }
}

const docLookup = (collection) => {
  return {
    $lookup: {
      from: collection,
      "localField": "num_region",
      "foreignField": "num_region",
      "as": collection
    }
  }
}

const docSort = (expSort) => {
  return {
    $sort: expSort
  }
}

module.exports = {
  docMatch,
  docLookup,
  docSort
}