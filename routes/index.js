const express = require('express');
const router = express.Router();
const axios = require('axios');

// const data = require('../components/getCat.js')


/* GET home page. */
router.get('/', function (req, res, next) {
        let url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
        axios.get(url)
            .then(function (response) {
                let data = response.data.categories
                renderData(data)
            })
            .catch(function (err) {
               console.log("error")
            })

        let renderData = data => {
            let arr = []
            for (let cat of data){
                let allCats = {
                    cat : cat.strCategory,
                    img : cat.strCategoryThumb,
                    descrip: cat.strCategoryDescription
                }
                arr.push(allCats)
            }
            res.render('home', {
                layout: 'default',
                template: 'recipeList-template',
                categories: arr });
        }
});

module.exports = router;
