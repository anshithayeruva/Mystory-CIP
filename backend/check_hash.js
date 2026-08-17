const bcrypt = require('bcryptjs');
const hash = '$2b$10$MSOAwFByoPxvxr1dQOO5..imEidKcr/qxrOEFu8HICal5oEI19cOq';
const pwd = 'Student@123';
console.log("Match?", bcrypt.compareSync(pwd, hash));
