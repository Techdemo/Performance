"use strict"
const axios = require('axios');

exports.getCat = (req, res, next) => {

    let url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
    axios.get(url)
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function (response) {
        let data = response.data.categories
        sanitizeData(data)
    })

// expose alle data buiten de scope van de axios fetc

    let sanitizeData = (data) => {
        console.log(data)
    }


}