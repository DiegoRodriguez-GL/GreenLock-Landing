
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  header: (msg) => console.log(`${colors.cyan}${colors.bright}🛡️  ${msg}${colors.reset}`)
};

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createEnvFile() {
  log.header('CONFIGURACIÓN INICIAL DE GREENLOCK API');
  console.log('');
  
  log.info('Vamos a configurar tu backend paso a paso...');
  console.log('');
  
  
  if (fs.existsSync('.env')) {
    log.warning('Ya existe un archivo .env');
    const overwrite = await question('¿Quieres sobrescribirlo? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      log.info('Configuración cancelada. Usando archivo .env existente.');
      return;
    }
  }
  
  const config = {};
  
  
  log.header('1. CONFIGURACIÓN DEL SERVIDOR');
  config.PORT = await question('Puerto del servidor (3001): ') || '3001';
  config.NODE_ENV = await question('Entorno (development/production) [production]: ') || 'production';
  config.FRONTEND_URL = await question('URL de tu frontend (ej: https:
  
  console.log('');
  
  
  log.header('2. CONFIGURACIÓN DE EMAIL');
  log.info('Necesitas configurar un email para enviar los formularios.');
  log.warning('IMPORTANTE: Usa una "App Password" de Gmail, NO tu contraseña normal.');
  console.log('');
  log.info('Pasos para obtener App Password:');
  console.log('1. Activa verificación en 2 pasos en Gmail');
  console.log('2. Ve a: https:
  console.log('3. Genera una contraseña para "Correo"');
  console.log('');
  
  config.EMAIL_USER = await question('Tu email de Gmail: ');
  config.EMAIL_PASS = await question('App Password de Gmail (16 caracteres): ');
  
  console.log('');
  
  
  log.header('3. CONFIGURACIÓN AVANZADA (OPCIONAL)');
  const advancedConfig = await question('¿Configurar opciones avanzadas? (y/N): ');
  
  if (advancedConfig.toLowerCase() === 'y' || advancedConfig.toLowerCase() === 'yes') {
    config.RATE_LIMIT_WINDOW_MS = await question('Ventana de rate limiting en ms (900000): ') || '900000';
    config.RATE_LIMIT_MAX_ATTEMPTS = await question('Máximo intentos por ventana (5): ') || '5';
    config.JWT_SECRET = await question('Clave secreta JWT (opcional): ') || `greenlock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  } else {
    config.RATE_LIMIT_WINDOW_MS = '900000';
    config.RATE_LIMIT_MAX_ATTEMPTS = '5';
    config.JWT_SECRET = `greenlock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  console.log('');
  
  
  let envContent = `# ========================================
# CONFIGURACIÓN GENERADA AUTOMÁTICAMENTE
# Fecha: ${new Date().toISOString()}
# ========================================

# CONFIGURACIÓN DEL SERVIDOR
PORT=${config.PORT}
NODE_ENV=${config.NODE_ENV}
FRONTEND_URL=${config.FRONTEND_URL}

# CONFIGURACIÓN DE EMAIL
EMAIL_USER=${config.EMAIL_USER}
EMAIL_PASS=${config.EMAIL_PASS}

# CONFIGURACIÓN DE SEGURIDAD
RATE_LIMIT_WINDOW_MS=${config.RATE_LIMIT_WINDOW_MS}
RATE_LIMIT_MAX_ATTEMPTS=${config.RATE_LIMIT_MAX_ATTEMPTS}
JWT_SECRET=${config.JWT_SECRET}

# CONFIGURACIÓN DE LOGGING
LOG_LEVEL=info
LOG_FILE_ERROR=logs/error.log
LOG_FILE_COMBINED=logs/combined.log
`;

  fs.writeFileSync('.env', envContent);
  log.success('Archivo .env creado exitosamente!');
  
  console.log('');
  return config;
}

async function createDirectories() {
  log.header('4. CREANDO DIRECTORIOS NECESARIOS');
  
  const directories = ['logs', 'temp'];
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      log.success(`Directorio '${dir}' creado`);
    } else {
      log.info(`Directorio '${dir}' ya existe`);
    }
  });
  
  console.log('');
}

async function createGitignore() {
  log.header('5. CONFIGURANDO .gitignore');
  
  const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Temporary folders
temp/
tmp/

# Operating System Files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE Files
.vscode/
.idea/
*.swp
*.swo
*~

# PM2
.pm2/

# Build outputs
dist/
build/
`;

  if (!fs.existsSync('.gitignore')) {
    fs.writeFileSync('.gitignore', gitignoreContent);
    log.success('.gitignore creado');
  } else {
    log.info('.gitignore ya existe');
  }
  
  console.log('');
}

async function testEmailConfiguration(config) {
  log.header('6. PROBANDO CONFIGURACIÓN DE EMAIL');
  
  const test = await question('¿Quieres probar la configuración de email? (Y/n): ');
  
  if (test.toLowerCase() === 'n' || test.toLowerCase() === 'no') {
    log.info('Prueba de email omitida');
    return;
  }
  
  try {
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});
    
    log.info('Verificando conexión con Gmail...');
    await transporter.verify();
    log.success('✅ Configuración de email correcta!');
    
    const sendTest = await question('¿Enviar email de prueba? (y/N): ');
    
    if (sendTest.toLowerCase() === 'y' || sendTest.toLowerCase() === 'yes') {
      const testEmail = await question('Email de destino para prueba: ');
      
      await transporter.sendMail({
        from: config.EMAIL_USER,
        to: testEmail,
        subject: '🛡️ Prueba de configuración - GreenLock API',
        html: `
          <h2>🛡️ GreenLock API - Configuración Exitosa</h2>
          <p>¡Felicidades! Tu backend está configurado correctamente.</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Servidor:</strong> ${config.EMAIL_USER}</p>
          <hr>
          <p><em>Este es un email de prueba generado automáticamente.</em></p>
        `
      });
      
      log.success(`Email de prueba enviado a ${testEmail}`);
    }
    
  } catch (error) {
    log.error(`Error en configuración de email: ${error.message}`);
    log.warning('Revisa tu EMAIL_USER y EMAIL_PASS en el archivo .env');
  }
  
  console.log('');
}

async function showFinalInstructions() {
  log.header('🎉 CONFIGURACIÓN COMPLETADA');
  
  console.log(`
${colors.green}${colors.bright}¡Tu backend de GreenLock está listo!${colors.reset}

${colors.cyan}📋 Próximos pasos:${colors.reset}

1. ${colors.yellow}Iniciar en modo desarrollo:${colors.reset}
   npm run dev

2. ${colors.yellow}Iniciar en modo producción:${colors.reset}
   npm start

3. ${colors.yellow}Ver logs en tiempo real:${colors.reset}
   npm run logs

4. ${colors.yellow}Probar la API:${colors.reset}
   curl http:

${colors.cyan}🔗 Endpoints disponibles:${colors.reset}
• GET  /api/health  - Status del servidor
• POST /api/contact - Envío de formularios

${colors.cyan}📁 Archivos importantes:${colors.reset}
• .env - Configuración (NO subir a Git)
• logs/ - Logs del servidor
• server.js - Código principal

${colors.magenta}💡 Consejos:${colors.reset}
• Usa 'npm run dev' para desarrollo (auto-restart)
• Revisa logs/error.log si hay problemas
• El rate limiting está activado (5 req/15min)
• Cambia FRONTEND_URL en .env para producción

${colors.red}⚠️  Importante:${colors.reset}
• NUNCA subas el archivo .env a Git
• Usa HTTPS en producción
• Configura un firewall para el puerto 3001
`);
}

async function main() {
  try {
    console.clear();
    
    
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 16) {
      log.error(`Node.js ${nodeVersion} detectado. Necesitas Node.js 16 o superior.`);
      process.exit(1);
    }
    
    const config = await createEnvFile();
    if (!config) return;
    
    await createDirectories();
    await createGitignore();
    await testEmailConfiguration(config);
    await showFinalInstructions();
    
  } catch (error) {
    log.error(`Error durante la configuración: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { createEnvFile, createDirectories, createGitignore };