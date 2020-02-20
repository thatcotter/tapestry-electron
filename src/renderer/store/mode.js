import Enum from 'vanilla-enum';

export const MODE = new Enum({
    Attract: {
        value: 0,
        description: "Attract Mode"
    },
    Menu: {
        value: 1,
        description: "Menu Mode"
    },
    Quest: {
        value: 2,
        description: "Quest Mode"
    }
})

// export default {
//     MODE
// }