const api_key = process.env.MAILER_API_KEY;
const api_url = process.env.MAILER_API_URL ||'';

export class UserEmailSender {
  static async sendWelcomeEmail(email: string, name: string) {
    const form = new FormData();

    form.append('from', 'Balanceme <inventoryappmx@5e0f9e1ed8ce0c89.maileroo.org>');
    form.append('to', `${name} <${email}>`);
    form.append('subject', 'Bienvenid@ a Balanceme');
    form.append('html', `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #e0f7fa 0%, #f7f7f7 100%); padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 16px rgba(44,62,80,0.08);">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80" alt="Balanceme Logo" style="width: 80px; margin-bottom: 12px; border-radius: 8px;" />
            <h1 style="color: #27ae60; margin: 0;">¡Bienvenid@ a Balanceme!</h1>
          </div>
          <p style="font-size: 18px; color: #34495e; margin-bottom: 8px;">Hola <strong>${name}</strong>,</p>
          <p style="font-size: 16px; color: #34495e; margin-bottom: 16px;">¡Gracias por unirte a <strong>Balanceme</strong>! Tu viaje hacia una vida financiera más organizada y tranquila comienza hoy.</p>
          <ul style="font-size: 15px; color: #2c3e50; margin-bottom: 24px; padding-left: 20px;">
            <li>Administra tus cuentas y movimientos fácilmente</li>
            <li>Visualiza tu progreso y metas</li>
            <li>Recibe consejos personalizados</li>
          </ul>
          <div style="text-align: center; margin: 32px 0;">
            <a href="http://localhost:5173/" style="background: linear-gradient(90deg, #27ae60 0%, #2ecc71 100%); color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 17px; font-weight: bold; box-shadow: 0 2px 8px rgba(39,174,96,0.12);">Comenzar ahora</a>
          </div>
          <p style="font-size: 14px; color: #7f8c8d; margin-bottom: 0;">¿Tienes dudas o sugerencias? Responde a este correo, ¡estamos para ayudarte!</p>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #ecf0f1;" />
          <div style="text-align: center;">
            <a href="https://www.instagram.com/" style="margin: 0 8px; text-decoration: none;"><img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=24&q=80" alt="Instagram" style="width: 24px; vertical-align: middle; border-radius: 4px;" /></a>
            <a href="https://www.facebook.com/" style="margin: 0 8px; text-decoration: none;"><img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=24&q=80" alt="Facebook" style="width: 24px; vertical-align: middle; border-radius: 4px;" /></a>
            <a href="https://www.twitter.com/" style="margin: 0 8px; text-decoration: none;"><img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=24&q=80" alt="Twitter" style="width: 24px; vertical-align: middle; border-radius: 4px;" /></a>
          </div>
          <p style="font-size: 12px; color: #bdc3c7; text-align: center; margin-top: 18px;">
            &copy; ${new Date().getFullYear()} Balanceme. Todos los derechos reservados.
          </p>
        </div>
      </div>
    `);

    const response = await fetch(api_url, {
      method: 'POST',
      headers: new Headers({ 'X-API-Key': api_key ?? '' }),
      body: form,
    });

    const result = await response.json();
    console.log('Email sent:', result);
    return result;
  }

  static async sendPasswordResetEmail(email: string, name: string) {
    const form = new FormData();

    form.append('from', 'Balanceme <inventoryappmx@5e0f9e1ed8ce0c89.maileroo.org>');
    form.append('to', `${name} <${email}>`);
    form.append('subject', 'Restablecimiento de contraseña');
    form.append('html', `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #fceabb 0%, #f8b500 100%); padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 16px rgba(44,62,80,0.08);">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80" alt="Balanceme Logo" style="width: 80px; margin-bottom: 12px; border-radius: 8px;" />
            <h1 style="color: #f39c12; margin: 0;">Restablece tu contraseña</h1>
          </div>
          <p style="font-size: 18px; color: #34495e; margin-bottom: 8px;">Hola <strong>${name}</strong>,</p>
          <p style="font-size: 16px; color: #34495e; margin-bottom: 16px;">Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no fuiste tú, puedes ignorar este correo.</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="http://localhost:5173/reset-password" style="background: linear-gradient(90deg, #f39c12 0%, #f1c40f 100%); color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 17px; font-weight: bold; box-shadow: 0 2px 8px rgba(243,156,18,0.12);">Restablecer contraseña</a>
          </div>
          <p style="font-size: 14px; color: #7f8c8d; margin-bottom: 0;">¿Tienes dudas o necesitas ayuda? Responde a este correo, ¡estamos para ayudarte!</p>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #ecf0f1;" />
          <div style="text-align: center;">
            <a href="https://www.instagram.com/" style="margin: 0 8px; text-decoration: none;"><img src="https://images.unsplash.com/photo-151912 5323398-675f0ddb6308?auto=format&fit=crop&w=24&q=80" alt="Instagram" style="width: 24px; vertical-align: middle; border-radius: 4px;" /></a>
            <a href="https://www.facebook.com/" style="margin: 0 8px; text-decoration: none;"><img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=24&q=80" alt="Facebook" style="width: 24px; vertical-align: middle; border-radius: 4px;" /></a>
            <a href="https://www.twitter.com/" style="margin: 0 8px; text-decoration: none;"><img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=24&q=80" alt="Twitter" style="width: 24px; vertical-align: middle; border-radius: 4px;" /></a>
          </div>
          <p style="font-size: 12px; color: #bdc3c7; text-align: center; margin-top: 18px;">
            &copy; ${new Date().getFullYear()} Balanceme. Todos los derechos reservados.
          </p>
        </div>
      </div>
    `);

    const response = await fetch(api_url, {
      method: 'POST',
      headers: new Headers({ 'X-API-Key': api_key ?? '' }),
      body: form,
    });

    const result = await response.json();
    console.log('Password reset email sent:', result);
    return result;
  }
}