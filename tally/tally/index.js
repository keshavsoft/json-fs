import * as masters from './masters/index.js';

masters.units.all.sendXml({}).then(data=>console.log(data));