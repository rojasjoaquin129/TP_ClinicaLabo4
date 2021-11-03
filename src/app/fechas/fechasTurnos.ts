import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Turno } from '../classes/turnos';

export const parsedSelectedDatesInForm = (
  weekDays: any,
  selectedIds: Array<number>
) => {
  return weekDays.filter((weekDay: any) =>
    selectedIds.some((selectedDayInForm) => selectedDayInForm === weekDay.id)
  );
};

export const formatConfirmShift = (shift: Turno) =>
  format(new Date(shift.dia), 'EEEE dd MMMM - HH:mm aaa', { locale: es });

export const formatShift = (shift: Turno) =>
  format(new Date(shift.dia), 'HH:mm aaa');

export const formatShiftGroup = (shift: Turno) =>
  format(new Date(shift.dia), 'EEEE dd MMMM', { locale: es });

export const groupShiftsByDates = (items: Turno[]) => {
  return items.reduce((acc: any, cur: any) => {
    const date = formatShiftGroup(cur);

    if (acc[date]) {
      acc[date].push(cur);
    } else {
      acc[date] = [cur];
    }

    return acc;
  }, {});
};
