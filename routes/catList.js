const express = require('express');
const router = express.Router();
const getRecipes = require('../data/getRecipes')
const app = express()

router.get('/:cat', function(req, res, next){

    let cat = req.params.cat
    let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + `${cat}`

    getRecipes(url).then(data => {
        res.render('recipeList', {
            layout: 'default',
            template: 'home-template',
            categories: data.meals,
            title: cat
            });
        })
    }
)

module.exports = router;