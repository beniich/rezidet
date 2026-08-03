const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/src/controllers/crm.contact.controller.js';
let content = fs.readFileSync(path, 'utf8');

// Use ascii codes to avoid escaping hell
const backslash = String.fromCharCode(92);
const backtick = String.fromCharCode(96);
const target = "res.json({ message: " + backslash + backtick + "${contacts.length} contacts importés avec succès" + backtick + " });";
const replacement = "res.json({ message: " + backtick + "${contacts.length} contacts importés avec succès" + backtick + " });";

content = content.replace(target, replacement);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed for real');
