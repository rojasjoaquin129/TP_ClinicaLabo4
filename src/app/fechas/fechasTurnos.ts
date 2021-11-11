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
export const formatConfirmTurno = (tiempo:Date) =>
  format(new Date(tiempo), 'EEEE dd MMMM - HH:mm aaa', { locale: es });

export const formatConfirmShift = (shift: Turno) =>
  format(new Date(shift.dia), 'EEEE dd MMMM - HH:mm aaa', { locale: es });

export const formatShift = (shift: Turno) =>
  format(new Date(shift.dia), 'HH:mm aaa');

export const formatShiftGroup = (shift: Turno) =>
  format(new Date(shift.dia), 'EEEE dd MMMM', { locale: es });

export const formatPutoProfesorShift = (shift: Turno) =>
  format(new Date(shift.dia), 'dd/MM/yyyy');


export const profesorDates = (items: Turno[]) => {
    return items.reduce((acc: any, cur: any) => {
      const date = formatPutoProfesorShift(cur);

      if (acc[date]) {
        acc[date].push(cur);
      } else {
        acc[date] = [cur];
      }

      return acc;
    }, {});
  };

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
