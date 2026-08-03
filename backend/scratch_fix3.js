const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/src/controllers/crm.contact.controller.js';
let content = fs.readFileSync(path, 'utf8');

// Replace everything that looks like \ contacts importés avec succès\ 
content = content.replace(/\\ contacts importés avec succès\\/g, "`${contacts.length} contacts importés avec succès`");
content = content.replace(/\\Limite atteinte \\(\\ contacts max\\)\\. Impossible d'importer \\ contacts\\.\\/g, "`Limite atteinte (${org.maxContacts} contacts max). Impossible d'importer ${contacts.length} contacts.`");

// Just in case it's still breaking because of backslashes being bare, let's just do an index-based replace or a very loose regex.
content = content.replace(/res\.json\(\{ message: \\ contacts importés avec succès\\ \}\);/g, "res.json({ message: `${contacts.length} contacts importés avec succès` });");

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed completely');
