export enum COLORS {
    BLACK = '#141414',
    GRAY = '#252624',
    WHITE = '#ffffff',
    GOLD = '#b17304',
    WEAK_BROWN = '#6e4702',
    RED = '#721918',
    GREEN = '#447053',
    LIGHT_GRAY = '#808381'
}

export const getCurrentDate = () => {
    const date = new Date();
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear().toString().slice(2)
}