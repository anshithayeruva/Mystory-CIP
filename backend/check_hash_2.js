const bcrypt = require('bcryptjs');
const hash = '$2b$10$MSOAwFByoPxvxr1dQOO5..imEidKcr/qxrOEFu8HICal5oEI19cOq';
console.log("Match Ujwal@608?", bcrypt.compareSync('Ujwal@608', hash));
