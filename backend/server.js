
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const validator = require('validator');
const winston = require('winston');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;




const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'greenlock-contact-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
});






app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http:
  credentials: true,
  optionsSuccessStatus: 200
}));


const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    error: 'Demasiadas solicitudes desde esta IP. Intenta de nuevo en 15 minutos.',
    status: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});


const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: {
    error: 'Has enviado demasiados formularios. Intenta de nuevo en 15 minutos.',
    status: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));




const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,           
    secure: true,        
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });
};

let emailTransporter;

const initializeEmailTransporter = async () => {
  try {
    emailTransporter = createTransporter();
    await emailTransporter.verify();
    logger.info('Email transporter initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize email transporter:', error);
    process.exit(1);
  }
};




const validateContactForm = (data) => {
  const errors = [];
  
  
  if (!data.name || !data.name.trim()) {
    errors.push('El nombre es requerido');
  } else if (data.name.length < 2 || data.name.length > 100) {
    errors.push('El nombre debe tener entre 2 y 100 caracteres');
  }
  
  
  if (!data.email || !data.email.trim()) {
    errors.push('El email es requerido');
  } else if (!validator.isEmail(data.email)) {
    errors.push('El formato del email es inválido');
  }
  
  
  if (!data.company || !data.company.trim()) {
    errors.push('La empresa es requerida');
  } else if (data.company.length < 2 || data.company.length > 200) {
    errors.push('El nombre de la empresa debe tener entre 2 y 200 caracteres');
  }
  
  
if (data.phone && data.phone.trim()) {
  const phoneRegex = /^\+?[0-9]{9,15}$/; 
  if (!phoneRegex.test(data.phone.trim())) {
    errors.push('El formato del teléfono es inválido');
  }
}

  
  
  const validServices = [
    'red-team',
    'perimeter',
    'web-pentesting',
    'mobile-pentesting',
    'code-review',
    'consultation',
    'other'
  ];
  
  if (!data.service || !validServices.includes(data.service)) {
    errors.push('Debe seleccionar un servicio válido');
  }
  
  
  if (!data.message || !data.message.trim()) {
    errors.push('El mensaje es requerido');
  } else if (data.message.length < 10 || data.message.length > 5000) {
    errors.push('El mensaje debe tener entre 10 y 5000 caracteres');
  }
  
  return errors;
};




const sanitizeData = (data) => {
  return {
    name: validator.escape(data.name.trim()),
    email: validator.normalizeEmail(data.email.trim()),
    company: validator.escape(data.company.trim()),
    phone: data.phone ? validator.escape(data.phone.trim()) : '',
    service: data.service,
    message: validator.escape(data.message.trim())
  };
};




const getServiceName = (serviceKey) => {
  const serviceNames = {
    'red-team': 'Red Team - Simulación de ataques reales',
    'perimeter': 'Evaluación Perimetral - Análisis de defensas',
    'web-pentesting': 'Pentesting Web - Auditoría de aplicaciones',
    'mobile-pentesting': 'Pentesting Mobile - Seguridad en apps móviles',
    'code-review': 'Revisión de Código - Análisis de vulnerabilidades',
    'consultation': 'Consultoría General de Ciberseguridad',
    'other': 'Otro servicio (ver mensaje)'
  };
  return serviceNames[serviceKey] || serviceKey;
};

const createContactEmailTemplate = (data, clientInfo) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva Consulta - GreenLock</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
            .container { max-width: 650px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #00b267 0%, #00a862 100%); color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .header p { margin: 8px 0 0 0; font-size: 16px; opacity: 0.9; }
            .content { padding: 30px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; color: #00b267; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e9ecef; display: flex; align-items: center; gap: 8px; }
            .field-grid { display: grid; gap: 12px; }
            .field { display: flex; gap: 15px; align-items: flex-start; }
            .field-label { font-weight: 600; color: #555; min-width: 120px; flex-shrink: 0; }
            .field-value { color: #333; flex: 1; }
            .message-box { background: #f8f9fa; border-left: 4px solid #00b267; padding: 20px; margin: 16px 0; border-radius: 0 8px 8px 0; }
            .action-buttons { text-align: center; margin: 30px 0; }
            .btn { display: inline-block; background: #00b267; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 8px; font-weight: 600; transition: background 0.3s; }
            .btn:hover { background: #00a862; }
            .btn-secondary { background: transparent; color: #00b267; border: 2px solid #00b267; }
            .btn-secondary:hover { background: #00b267; color: white; }
            .footer { background: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef; }
            .footer p { margin: 8px 0; color: #666; font-size: 13px; }
            .priority-box { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .priority-box h4 { margin: 0 0 10px 0; color: #856404; font-size: 16px; }
            .priority-box ul { margin: 10px 0; color: #856404; font-size: 14px; }
            .client-info { background: #e8f5e8; border-radius: 8px; padding: 15px; margin: 15px 0; }
            .timestamp { font-size: 12px; color: #999; text-align: right; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛡️ GreenLock</h1>
                <p>Nueva Consulta de Ciberseguridad</p>
            </div>
            
            <div class="content">
                <div class="section">
                    <div class="section-title">
                        <span>👤</span> Información del Cliente
                    </div>
                    <div class="field-grid">
                        <div class="field">
                            <span class="field-label">Nombre:</span>
                            <span class="field-value">${data.name}</span>
                        </div>
                        <div class="field">
                            <span class="field-label">Email:</span>
                            <span class="field-value"><a href="mailto:${data.email}" style="color: #00b267; text-decoration: none;">${data.email}</a></span>
                        </div>
                        <div class="field">
                            <span class="field-label">Empresa:</span>
                            <span class="field-value">${data.company}</span>
                        </div>
                        <div class="field">
                            <span class="field-label">Teléfono:</span>
                            <span class="field-value">${data.phone || 'No proporcionado'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">
                        <span>🛡️</span> Servicio Solicitado
                    </div>
                    <div class="client-info">
                        <strong>${getServiceName(data.service)}</strong>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">
                        <span>💬</span> Mensaje del Cliente
                    </div>
                    <div class="message-box">
                        ${data.message.replace(/\n/g, '<br>')}
                    </div>
                </div>
                
                <div class="action-buttons">
                    <a href="mailto:${data.email}?subject=Re: Consulta de Ciberseguridad - ${data.company}&body=Estimado/a ${data.name},%0D%0A%0D%0AGracias por contactar con GreenLock..." class="btn">
                        📧 Responder por Email
                    </a>
                    ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-secondary">📱 Llamar Cliente</a>` : ''}
                </div>
                
                <div class="priority-box">
                    <h4>⚡ Recordatorio - Proceso de Atención</h4>
                    <ul>
                        <li><strong>Responder en menos de 24 horas</strong> (garantía de servicio)</li>
                        <li>Agendar consulta inicial gratuita de 30 minutos</li>
                        <li>Preparar presupuesto detallado según necesidades</li>
                        <li>Enviar información adicional sobre el servicio solicitado</li>
                        <li>Registrar cliente en CRM para seguimiento</li>
                    </ul>
                </div>
                
                <div class="client-info">
                    <h4 style="margin: 0 0 10px 0; color: #00b267;">🔍 Información Técnica</h4>
                    <div class="field-grid">
                        <div class="field">
                            <span class="field-label">IP Cliente:</span>
                            <span class="field-value">${clientInfo.ip}</span>
                        </div>
                        <div class="field">
                            <span class="field-label">User Agent:</span>
                            <span class="field-value">${clientInfo.userAgent}</span>
                        </div>
                        <div class="field">
                            <span class="field-label">Timestamp:</span>
                            <span class="field-value">${clientInfo.timestamp}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>GreenLock - Ciberseguridad Avanzada</strong></p>
                <p>Calle Seguridad Digital, 42 - 28001 Madrid, España</p>
                <p>📧 <a href="mailto:info@greenlock.tech" style="color: #00b267;">info@greenlock.tech</a> | 
                📱 <a href="tel:+34910123456" style="color: #00b267;">+34 910 123 456</a> | 
                🚨 <a href="tel:+34682790545" style="color: #dc3545;">+34 682 790 545</a> (Emergencias 24/7)</p>
                <p style="font-size: 11px; color: #999; margin-top: 15px;">
                    Este email fue generado automáticamente desde el sistema de contacto web de GreenLock.<br>
                    Para responder directamente al cliente, utiliza: <a href="mailto:${data.email}" style="color: #00b267;">${data.email}</a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const createAutoReplyTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación - GreenLock</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #00b267 0%, #00a862 100%); color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .header p { margin: 8px 0 0 0; font-size: 16px; opacity: 0.9; }
            .content { padding: 30px; }
            .highlight { background: #f0f8f0; border-left: 4px solid #00b267; padding: 20px; border-radius: 0 8px 8px 0; margin: 20px 0; }
            .highlight h3 { margin: 0 0 15px 0; color: #00b267; }
            .steps { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .steps h4 { margin: 0 0 15px 0; color: #333; }
            .steps ul { margin: 0; padding-left: 20px; }
            .steps li { margin-bottom: 8px; }
            .footer { background: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef; }
            .footer p { margin: 8px 0; color: #666; font-size: 13px; }
            .emergency-box { background: #ffeaa7; border: 2px solid #fdcb6e; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center; }
            .emergency-box strong { color: #e17055; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛡️ GreenLock</h1>
                <p>Confirmación de Consulta Recibida</p>
            </div>
            
            <div class="content">
                <h2>¡Gracias por contactarnos, ${data.name}!</h2>
                
                <p>Hemos recibido tu consulta sobre <strong>${getServiceName(data.service)}</strong> y nuestro equipo especializado se pondrá en contacto contigo en las <strong>próximas 24 horas</strong>.</p>
                
                <div class="highlight">
                    <h3>📋 Resumen de tu consulta</h3>
                    <p><strong>Empresa:</strong> ${data.company}</p>
                    <p><strong>Servicio solicitado:</strong> ${getServiceName(data.service)}</p>
                    <p><strong>Email de contacto:</strong> ${data.email}</p>
                    ${data.phone ? `<p><strong>Teléfono:</strong> ${data.phone}</p>` : ''}
                </div>
                
                <div class="steps">
                    <h4>🔄 Qué puedes esperar a continuación:</h4>
                    <ul>
                        <li><strong>Respuesta inicial</strong> - Un especialista te contactará en 24h</li>
                        <li><strong>Consulta inicial gratuita</strong> - 30 minutos para analizar tus necesidades</li>
                        <li><strong>Propuesta personalizada</strong> - Presupuesto detallado sin compromiso</li>
                        <li><strong>Plan de implementación</strong> - Roadmap claro y timeline definido</li>
                    </ul>
                </div>
                
                <div class="steps">
                    <h4>📝 Mientras tanto, puedes:</h4>
                    <ul>
                        <li>Revisar tu bandeja de entrada (y carpeta de spam)</li>
                        <li>Preparar cualquier documentación técnica relevante</li>
                        <li>Identificar los activos críticos de tu organización</li>
                        <li>Definir el alcance aproximado de la auditoría</li>
                    </ul>
                </div>
                
                <div class="emergency-box">
                    <p><strong>⚠️ ¿Emergencia de Seguridad?</strong></p>
                    <p>Si sospechas que tu empresa ha sido comprometida o estás experimentando un incidente de seguridad, no esperes nuestra respuesta. Llama inmediatamente a nuestra línea de emergencias:</p>
                    <p><strong style="font-size: 18px; color: #d63031;">📞 +34 682 790 545</strong></p>
                    <p><em>Disponible 24/7 para respuesta inmediata a incidentes</em></p>
                </div>
                
                <p style="margin-top: 30px;">Gracias por confiar en GreenLock para proteger tu organización. Nuestro equipo de expertos está emocionado de trabajar contigo.</p>
                
                <p><strong>Saludos cordiales,</strong><br>
                <strong>Equipo GreenLock</strong><br>
                <em>Especialistas en Ciberseguridad</em></p>
            </div>
            
            <div class="footer">
                <p><strong>GreenLock - Ciberseguridad Avanzada</strong></p>
                <p>Calle Seguridad Digital, 42 - 28001 Madrid, España</p>
                <p>📧 <a href="mailto:info@greenlock.tech" style="color: #00b267;">info@greenlock.tech</a> | 
                📱 <a href="tel:+34910123456" style="color: #00b267;">+34 910 123 456</a></p>
                <p style="font-size: 11px; color: #999; margin-top: 15px;">
                    Este es un mensaje automático. Por favor, no respondas a este email.<br>
                    Si necesitas asistencia inmediata, utiliza los números de contacto proporcionados.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};






app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'GreenLock Contact API',
    version: '1.0.0'
  });
});


app.post('/api/contact', contactLimiter, async (req, res) => {
  const startTime = Date.now();
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  
  try {
    logger.info('Contact form submission started', {
      ip: clientIp,
      userAgent: userAgent,
      timestamp: new Date().toISOString()
    });
    
    
    const validationErrors = validateContactForm(req.body);
    if (validationErrors.length > 0) {
      logger.warn('Validation errors in contact form', {
        errors: validationErrors,
        ip: clientIp
      });
      
      return res.status(400).json({
        success: false,
        message: 'Datos del formulario inválidos',
        errors: validationErrors
      });
    }
    
    
    const sanitizedData = sanitizeData(req.body);
    
    
    const clientInfo = {
      ip: clientIp,
      userAgent: userAgent,
      timestamp: new Date().toLocaleString('es-ES', {
        timeZone: 'Europe/Madrid',
        dateStyle: 'full',
        timeStyle: 'medium'
      })
    };
    
    
    const mainEmailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@greenlock.tech',
      subject: `🛡️ Nueva Consulta - ${sanitizedData.name} (${sanitizedData.company}) - ${getServiceName(sanitizedData.service)}`,
      html: createContactEmailTemplate(sanitizedData, clientInfo),
      replyTo: sanitizedData.email
    };
    
    await emailTransporter.sendMail(mainEmailOptions);
    logger.info('Main email sent successfully', {
      to: 'info@greenlock.tech',
      from: sanitizedData.email,
      company: sanitizedData.company
    });
    
    
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: sanitizedData.email,
      subject: '✅ Hemos recibido tu consulta - GreenLock te responderá en 24h',
      html: createAutoReplyTemplate(sanitizedData)
    };
    
    await emailTransporter.sendMail(autoReplyOptions);
    logger.info('Auto-reply email sent successfully', {
      to: sanitizedData.email
    });
    
    
    const processingTime = Date.now() - startTime;
    logger.info('Contact form processed successfully', {
      email: sanitizedData.email,
      company: sanitizedData.company,
      service: sanitizedData.service,
      processingTime: `${processingTime}ms`,
      ip: clientIp
    });
    
    res.status(200).json({
      success: true,
      message: 'Formulario enviado exitosamente. Te responderemos en 24 horas.',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    logger.error('Error processing contact form', {
      error: error.message,
      stack: error.stack,
      ip: clientIp,
      processingTime: `${processingTime}ms`
    });
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor. Por favor, inténtalo de nuevo o contacta directamente.',
      timestamp: new Date().toISOString()
    });
  }
});


app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    availableEndpoints: [
      'GET /api/health',
      'POST /api/contact'
    ]
  });
});


app.use((error, req, res, next) => {
  logger.error('Unhandled error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method
  });
  
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});




const startServer = async () => {
  try {
    
    await initializeEmailTransporter();
    
    
    const fs = require('fs');
    if (!fs.existsSync('logs')) {
      fs.mkdirSync('logs');
    }
    
    
    app.listen(PORT, () => {
      logger.info(`🛡️ GreenLock Contact API running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`Frontend URL: ${process.env.FRONTEND_URL || 'http:
      console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    🛡️  GREENLOCK API                        ║
║                                                              ║
║  Status: ✅ Running                                          ║
║  Port: ${PORT}                                               ║
║  Health Check: http:
║  Contact Endpoint: http:
║                                                              ║
║  📧 Email configured: ${process.env.EMAIL_USER ? '✅' : '❌'}                              ║
║  🔒 Rate limiting: ✅ Active                                 ║
║  📝 Logging: ✅ Active                                       ║
╚══════════════════════════════════════════════════════════════╝
      `);
    });
    
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};


process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});


startServer();