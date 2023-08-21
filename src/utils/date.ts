import { parseISO } from 'date-fns';

export const formatDate = (date: string): string =>
  parseISO(date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
