const fs = require('fs');
const path = '../frontend/src/services/studentDashboard.service.ts';
let content = fs.readFileSync(path, 'utf8');

// replace `${API_URL}/student/` with `${API_URL}/api/student/`
content = content.replace(/\$\{API_URL\}\/student\//g, '${API_URL}/api/student/');

fs.writeFileSync(path, content);
console.log('Fixed dashboard service URL endpoints.');
