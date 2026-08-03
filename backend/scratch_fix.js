const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/src/controllers/crm.contact.controller.js';
let content = fs.readFileSync(path, 'latin1');
const badStr = "error: \\Limite atteinte (\\ contacts max). Impossible d'importer \\ contacts.\\";
const goodStr = "error: `Limite atteinte (${org.maxContacts} contacts max). Impossible d'importer ${contacts.length} contacts.`";
content = content.replace(badStr, goodStr);
fs.writeFileSync(path, content, 'utf8');
console.log('Fixed syntax and encoding');
