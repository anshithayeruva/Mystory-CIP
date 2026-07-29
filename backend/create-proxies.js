const fs = require('fs');
const path = require('path');

const proxyContent = `import { NextRequest, NextResponse } from 'next/server';

async function proxy(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const url = new URL(req.url);
  const proxyPath = url.pathname + url.search;
  
  try {
    const headers = new Headers(req.headers);
    headers.delete('host'); // Let fetch set the correct host header
    
    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
    };
    
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const body = await req.text();
      if (body) fetchOptions.body = body;
    }
    
    const response = await fetch(\`\${backendUrl}\${proxyPath}\`, fetchOptions);
    
    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete('content-encoding'); // Prevent Next.js double-compression issues
    
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Proxy error', error: String(error) }, { status: 500 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
export const PATCH = proxy;
`;

function rewriteToProxy(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      rewriteToProxy(fullPath);
    } else if (file === 'route.ts') {
      fs.writeFileSync(fullPath, proxyContent);
    }
  }
}

rewriteToProxy('../frontend/src/app/api/faculty');
console.log('Frontend proxy routes created.');
