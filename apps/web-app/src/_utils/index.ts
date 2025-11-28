
export const formatPrice = (value: number, compact = false) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: compact ? 1 : 2,
    notation: compact ? 'compact' : 'standard',
  }).format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);

export const formatClockLabel = (value: number | Date = Date.now()) =>
  new Date(value).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });


  export const computeChange = (price: number, previousClose: number) => {
    const delta = Number((price - previousClose).toFixed(2));
    const deltaPct = Number(((delta / previousClose) * 100).toFixed(2));
    return { delta, deltaPct };
  };
  