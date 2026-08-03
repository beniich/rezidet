const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/src/controllers/crm.contact.controller.js';
let content = fs.readFileSync(path, 'latin1');
const badStr2 = "res.json({ message: \\ contacts importés avec succès\\ });";
const goodStr2 = "res.json({ message: `${contacts.length} contacts importés avec succès` });";
content = content.replace(badStr2, goodStr2);
fs.writeFileSync(path, content, 'utf8');
console.log('Fixed second syntax error');
