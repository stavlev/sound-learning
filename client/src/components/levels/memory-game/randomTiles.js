import _ from "lodash";

var _tiles = [];

function generateTiles(num) {
    let images = [];

    for (let i = 1; i <= num ; i++) {
        images.push(
            {
                node: null,
                image: `assets/img/${i}.jpg`,
                multiplier: i,
                flipped: false,
                matched: false
            });
    }

    _tiles = _.shuffle(_.concat(images, images));
}

function getTiles(num) {
    generateTiles(num);
    return _tiles;
}

export default {
    getTiles: getTiles
}