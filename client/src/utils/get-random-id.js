import { IDS } from '../constants/simonSaysParams';

const getRandomId = () => IDS[Math.floor(Math.random() * IDS.length)];

export default getRandomId;
