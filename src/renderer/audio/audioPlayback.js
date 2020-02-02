//-----------------------------------------------------
// audio settings
//-----------------------------------------------------

import path from 'path'
import Pizzicato from 'pizzicato';

export const sineWave = new Pizzicato.Sound({
    source: 'wave',
    options: {
        frequency: 440
    }
});

// sineWave.play();

export const sounds = []
const assetsPath = path.resolve(__dirname, './assets/')
const fileType = '.wav'
const fileNames = [
    '/centerCityTraffic',
    '/earlyBirds',
    '/pianoC',
    '/pianoD',
    '/pianoE',
    '/pianoF',
    '/pianoG',
    '/pianoA',
]

fileNames.forEach((file, i) => {
    const name = assetsPath + fileNames[i] + ''
    // const name = assetsPath + "*"
    console.log(name);
    
    sounds.push(new Audio(name))
    // console.log(sounds[i])
    setTimeout(() => sounds[i].play(), 1000 * i)

    // sounds.push(new Pizzicato.Sound(name))
    // }), setTimeout(() => sounds[i].play(), 1000 * i))
})