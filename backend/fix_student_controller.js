const fs = require('fs');
const path = './src/controllers/student.controller.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace the line that extracts studentId
const searchRegex = /const \{ studentId \} = getStudentDashboardParams\.parse\(req\.params\);/g;
const replacement = `const params = getStudentDashboardParams.parse(req.params);
      const studentProfile = await import('../prisma/client').then(m => m.prisma.studentProfile.findUnique({ where: { userId: params.studentId } }));
      if (!studentProfile) throw new Error('Student profile not found for user');
      const studentId = studentProfile.id;`;

content = content.replace(searchRegex, replacement);

fs.writeFileSync(path, content);
console.log('Fixed student.controller.ts');
