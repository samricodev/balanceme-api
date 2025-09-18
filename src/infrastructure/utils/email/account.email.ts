const api_key = process.env.MAILER_API_KEY;
const api_url = 'https://smtp.maileroo.com/send';

export class AccountEmailSender {
  static async sendNewAccountEmail(email: string, name: string) {
    const form = new FormData();

    form.append('from', 'Balanceme <inventoryappmx@5e0f9e1ed8ce0c89.maileroo.org>');
    form.append('to', `${name} <${email}>`);
    form.append('subject', 'Nueva cuenta creada');
    form.append('html', `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%); padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 16px rgba(44,62,80,0.08);">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80" alt="Balanceme Logo" style="width: 80px; margin-bottom: 12px; border-radius: 8px;" />
            <h1 style="color: #27ae60; margin: 0;">Nueva cuenta creada</h1>
          </div>
          <p style="font-size: 18px; color: #34495e; margin-bottom: 8px;">Hola <strong>${name}</strong>,</p>
          <p style="font-size: 16px; color: #34495e; margin-bottom: 16px;">Te informamos que una nueva cuenta ha sido creada en tu perfil. Puedes gestionar tus cuentas y movimientos desde la aplicación.</p>
          <p style="font-size: 14px; color: #7f8c8d; margin-bottom: 0;">¿Tienes dudas o necesitas ayuda? Responde a este correo, ¡estamos para ayudarte!</p>
          <hr style="margin: 32px 0; border : none; border-top: 1px solid #ecf0f1 ;" /> 
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
    console.log('Account created email sent:', result);
    return result;
  }

  static async sendDeletedAccountEmail(email: string, name: string) {
    const form = new FormData();

    form.append('from', 'Balanceme <inventoryappmx@5e0f9e1ed8ce0c89.maileroo.org>');
    form.append('to', `${name} <${email}>`);
    form.append('subject', 'Cuenta eliminada');
    form.append('html', `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%); padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 16px rgba(44,62,80,0.08);">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80" alt="Balanceme Logo" style="width: 80px; margin-bottom: 12px; border-radius: 8px;" />
            <h1 style="color: #e74c3c; margin: 0;">Cuenta eliminada</h1>
          </div>
          <p style="font-size: 18px; color: #34495e; margin-bottom: 8px;">Hola <strong>${name}</strong>,</p>
          <p style="font-size: 16px; color: #34495e; margin-bottom: 16px;">Lamentamos informarte que tu cuenta ha sido eliminada. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
          <p style="font-size: 14px; color: #7f8c8d; margin-bottom: 0;">¿Tienes dudas o necesitas ayuda? Responde a este correo, ¡estamos para ayudarte!</p>
          <hr style="margin: 32px 0; border : none; border-top: 1px solid #ecf0f1;" />
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
    console.log('Deleted account email sent:', result);
    return result;
  }
}