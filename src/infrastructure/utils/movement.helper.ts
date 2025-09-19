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

const formatAmount = (amount: number) => {
  return amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export { type Movement, getTextForMovementType, translateDateToSpanish, formatAmount };