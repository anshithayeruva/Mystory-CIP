const fs = require('fs');
const path = require('path');

const frontendApiDir = path.resolve('../frontend/src/app/api/faculty');
const backendControllersDir = path.resolve('./src/controllers/faculty');
const backendRoutesDir = path.resolve('./src/routes');

if (!fs.existsSync(backendControllersDir)) {
  fs.mkdirSync(backendControllersDir, { recursive: true });
}
if (!fs.existsSync(backendRoutesDir)) {
  fs.mkdirSync(backendRoutesDir, { recursive: true });
}

const expressRoutes = [];

function processDir(dir, routePrefix = '/api/faculty') {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath, `${routePrefix}/${item.replace(/\[([^\]]+)\]/g, ':$1')}`);
    } else if (item === 'route.ts') {
      const controllerPathStr = path.relative(frontendApiDir, dir) || 'index';
      const controllerName = controllerPathStr.replace(/[\/\\[\]]/g, '_');
      const controllerFile = path.join(backendControllersDir, `${controllerName}.ts`);
      
      let content = fs.readFileSync(fullPath, 'utf8');

      // Replacements for Express compatibility
      content = content.replace(/import\s+{\s*NextRequest\s*}\s*from\s*['"]next\/server['"];?/g, 'import { Request, Response } from "express";');
      content = content.replace(/import\s+{\s*getAuthenticatedUser\s*}\s*from\s*['"]@\/lib\/request['"];?/g, '');
      
      // Fix imports for errors
      content = content.replace(/@\/lib\/errors/g, '../../../lib/errors');
      
      // Fix imports for modules
      content = content.replace(/@\/modules\/faculty/g, '../../modules/faculty');
      
      // Fix function signatures
      // export async function GET(req: NextRequest, { params }: { params: { id: string } })
      content = content.replace(/export\s+async\s+function\s+(GET|POST|PUT|DELETE|PATCH)\s*\(\s*req\s*:\s*NextRequest\s*,\s*\{\s*params\s*}\s*:\s*\{[^\}]+\}\s*\)/g, (match, method) => {
        return `export async function ${method}(req: Request, res: Response)`;
      });
      content = content.replace(/export\s+async\s+function\s+(GET|POST|PUT|DELETE|PATCH)\s*\(\s*req\s*:\s*NextRequest\s*(?:,\s*context\s*:\s*any\s*)?\)/g, 'export async function $1(req: Request, res: Response)');

      // Replace req.user
      content = content.replace(/const\s+user\s*=\s*getAuthenticatedUser\s*\(\s*req\s*\)\s*;/g, 'const user = req.user!;');
      
      // Replace req.json()
      content = content.replace(/await\s+req\.json\(\)/g, 'req.body');
      
      // Replace URL parsing
      content = content.replace(/const\s+{\s*searchParams\s*}\s*=\s*new\s*URL\s*\(\s*req\.url\s*\)\s*;/g, 'const searchParams = { get: (key: string) => req.query[key] as string | undefined };');
      
      // Replace handleSuccess and handleError
      content = content.replace(/handleSuccess\(([^,]+)(,\s*[^,]+)?(,\s*[^)]+)?\)/g, 'handleSuccess(res, $1$2$3)');
      content = content.replace(/handleError\(([^)]+)\)/g, 'handleError($1, res)');
      content = content.replace(/return\s+handleError/g, 'handleError');
      content = content.replace(/return\s+handleSuccess/g, 'handleSuccess');
      
      // Inside function body, we might need to extract params if it was in the signature
      // If params was in the signature, we removed it, so we need to add const params = req.params; at the top of the function
      content = content.replace(/export async function (GET|POST|PUT|DELETE|PATCH)\(req: Request, res: Response\) {\n(\s*)try {/g, 'export async function $1(req: Request, res: Response) {\n$2try {\n$2  const params = req.params as any;');

      // Remove fs imports if they were for /tmp logging
      // content = content.replace(/import\s+\*\s+as\s+fs\s+from\s+['"]fs['"];?/g, '');
      // content = content.replace(/fs\.writeFileSync[^;]+;/g, '');

      fs.writeFileSync(controllerFile, content);

      // Extract exported methods to map to router
      const exportedMethods = [];
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      methods.forEach(method => {
        if (content.includes(`export async function ${method}`)) {
          exportedMethods.push(method);
        }
      });

      expressRoutes.push({
        path: routePrefix,
        controllerFile: `./controllers/faculty/${controllerName}`,
        methods: exportedMethods
      });
    }
  }
}

processDir(frontendApiDir);

// Generate router
let routerContent = `import { Router } from 'express';
import { requireAuth, requireFaculty } from '../middleware/auth';\n\n`;

const uniqueControllers = [...new Set(expressRoutes.map(r => r.controllerFile))];
uniqueControllers.forEach((c, i) => {
  routerContent += `import * as Ctrl${i} from '${c}';\n`;
});

routerContent += `\nconst router = Router();\n\n`;
routerContent += `router.use(requireAuth, requireFaculty);\n\n`;

expressRoutes.forEach(route => {
  const ctrlIndex = uniqueControllers.indexOf(route.controllerFile);
  route.methods.forEach(method => {
    const expressMethod = method.toLowerCase();
    // Route path needs to be relative to /api/faculty, but we mount it there.
    const routerPath = route.path.replace('/api/faculty', '') || '/';
    routerContent += `router.${expressMethod}('${routerPath}', Ctrl${ctrlIndex}.${method});\n`;
  });
});

routerContent += `\nexport default router;\n`;
fs.writeFileSync(path.join(backendRoutesDir, 'faculty.ts'), routerContent);

console.log('Migration of routes to controllers complete.');
