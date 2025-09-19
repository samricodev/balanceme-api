const api_key = process.env.MAILER_API_KEY;
const api_url = 'https://smtp.maileroo.com/send';

interface Movement {
  type: 'income' | 'expense' | 'saving' | 'investment';
  amount: number;
  category: string;
  date: string;
  account: string;
}

const getTextForMovementType = (type: 'income' | 'expense' | 'saving' | 'investment') => {
  switch (type) {
    case 'income':
      return 'Ingreso';
    case 'expense':
      return 'Gasto';
    case 'saving':
      return 'Ahorro';
    case 'investment':
      return 'Inversión';
  }
};

const translateDateToSpanish = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export class MovementEmailSender {
  static async sendNewMovementEmail(email: string, name: string, movement: Movement) {
    const form = new FormData();

    form.append('from', 'Balanceme <inventoryappmx@5e0f9e1ed8ce0c89.maileroo.org>');
    form.append('to', `${name} <${email}>`);
    form.append('subject', 'Nuevo movimiento registrado');
    form.append('html', `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 16px rgba(44,62,80,0.08);">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80" alt="Balanceme Logo" style="width: 80px; margin-bottom: 12px; border-radius: 8px;" />
            <h1 style="color: #e67e22; margin: 0;">Nuevo movimiento registrado</h1>
          </div>
          <p style="font-size: 18px; color: #34495e; margin-bottom: 8px;">Hola <strong>${name}</strong>,</p>
          <p style="font-size: 16px; color: #34495e; margin-bottom: 16px;">Se ha registrado un nuevo movimiento en tu cuenta:</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px; border: 1px solid #ecf0f1;"><strong>Tipo de movimiento:</strong></td>
              <td style="padding: 12px; border: 1px solid #ecf0f1;">${getTextForMovementType(movement.type)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ecf0f1;"><strong>Categoría:</strong></td>
              <td style="padding: 12px; border: 1px solid #ecf0f1;">${movement.category}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ecf0f1;"><strong>Monto:</strong></td>
              <td style="padding: 12px; border: 1px solid #ecf0f1;">$${movement.amount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ecf0f1;"><strong>Cuenta:</strong></td>
              <td style="padding: 12px; border: 1px solid #ecf0f1;">${movement.account}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ecf0f1;"><strong>Fecha:</strong></td>
              <td style="padding: 12px; border: 1px solid #ecf0f1;">${translateDateToSpanish(movement.date)}</td>
            </tr>
          </table>
          <p style="font-size: 16px; color: #34495e;">Puedes revisar los detalles y gestionar tus movimientos en la aplicación.</p>
          <div style="text-align: center;">
            <button onclick="window.location.href='http://localhost:5173/dashboard'" style="display: inline-block; padding: 12px 24px; background-color: #e67e22; color: #fff; text-decoration: none; border-radius: 8px; font-size: 16px; margin-top: 16px;">Ir a Balanceme</button>
          </div>
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
    console.log('Movement email sent:', result);
    return result;
  }
}