import { spawn } from 'child_process';
import path from 'path';

console.log('----------------------------------------------------');
console.log('🚀 Mathur Giri Maharaj Math Sansthan - Local Dev');
console.log('----------------------------------------------------');

const nodeExec = process.execPath;
const serverScript = path.resolve('server', 'index.js');
const viteScript = path.resolve('node_modules', 'vite', 'bin', 'vite.js');

console.log('📡 Starting Express Backend Server (Port 5000)...');
const serverProc = spawn(nodeExec, [serverScript], {
  stdio: 'inherit',
  env: { ...process.env, PORT: '5000' }
});

console.log('⚡ Starting Vite Frontend Dev Server (Port 3000)...');
const viteProc = spawn(nodeExec, [viteScript], {
  stdio: 'inherit'
});

serverProc.on('error', (err) => {
  console.error('❌ Express server error:', err.message);
});

viteProc.on('error', (err) => {
  console.error('❌ Vite frontend error:', err.message);
});

// Handle graceful shutdown on Ctrl+C or termination
const shutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down local servers...`);
  try { serverProc.kill(); } catch (e) {}
  try { viteProc.kill(); } catch (e) {}
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Prevent Node parent process from exiting prematurely
setInterval(() => {}, 100000);
