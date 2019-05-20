const express = require('express');
const router = express.Router();
const getRecipes = require('../data/getRecipes')

router.get('/recipe/:id', function (req, res, next) {
    let recipe = req.params.id
    console.log(recipe)
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + `${recipe}`

    getRecipes(url).then(data => {
       let meals = data.meals
        console.log(meals)
        res.render('recipeDetail', {
            layout: 'default',
            template: 'home-template',
            data: meals
            });
        })
    }
)

module.exports = router;