'use strict';

var dictionary = require('./dictionary'); //Regular js 
var _ = require('lodash');

function generate() {
    var food = _.capitalize(_.sample(dictionary.foods));
    var ingredient = _.capitalize(_.sample(dictionary.ingredients));
    var description = _.capitalize(_.sample(dictionary.descriptions));
    var truckType = _.capitalize(_.sample(dictionary.truckTypes));

    var output = '';
    var randomNumber = _.random(1,4);

    switch (randomNumber) {
        case 1:
            output = `The ${food} ${truckType}`;
            break;
            
        case 2:
            output = `${description} ${food} ${truckType}`;
            break;

        case 3:
            output = `The ${description} ${food}`;
            break;

        default:
            output = `The ${description} ${food} ${ingredient} ${truckType}`;
            break;
    }

    return output;
    
}
// console.log(generate());
module.exports =   generate;