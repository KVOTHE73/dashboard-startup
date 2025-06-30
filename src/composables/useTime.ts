// src/composables/useTime.ts

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

/**
 * Retorna la hora actual en formato HH:mm (ej. "08:23")
 */
export function getNowHHMM(): string {
  return dayjs().format("HH:mm");
}

/**
 * Retorna la fecha actual en formato dd/MM/yyyy (ej. "20/03/2025")
 */
export function getTodayDDMMYYYY(): string {
  return dayjs().format("DD/MM/YYYY");
}

/**
 * Retorna la hora actual completa en formato HH:mm:ss
 */
export function getNowTimeFull(): string {
  return dayjs().format("HH:mm:ss");
}

/**
 * Retorna el timestamp actual (en milisegundos desde UNIX epoch)
 */
export function getTimestamp(): number {
  return dayjs().valueOf();
}

/**
 * Convierte un Date a formato HH:mm
 */
export function formatToHHMM(date: Date): string {
  return dayjs(date).format("HH:mm");
}

/**
 * Retorna si dos fechas están en el mismo día
 */
export function isSameDay(a: Date, b: Date): boolean {
  return dayjs(a).isSame(b, "day");
}

/**
 * Suma minutos a una hora dada en formato HH:mm y retorna nuevo string HH:mm
 */
export function addMinutesToHHMM(time: string, minutes: number): string {
  return dayjs(`1970-01-01T${time}`).add(minutes, "minute").format("HH:mm");
}

/**
 * Resta minutos a una hora dada en formato HH:mm y retorna nuevo string HH:mm
 */
export function subtractMinutesFromHHMM(time: string, minutes: number): string {
  return dayjs(`1970-01-01T${time}`)
    .subtract(minutes, "minute")
    .format("HH:mm");
}

/**
 * Calcula la duración entre dos horas (formato HH:mm) y la retorna en minutos totales
 */
export function getDurationInMinutes(from: string, to: string): number {
  const start = dayjs(`1970-01-01T${from}`);
  const end = dayjs(`1970-01-01T${to}`);
  return end.diff(start, "minute");
}

/**
 * Calcula la duración entre dos horas (formato HH:mm) y retorna un string legible como "02h 30min"
 */
export function getDurationAsText(from: string, to: string): string {
  const total = getDurationInMinutes(from, to);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}min`;
}

/**
 * Convierte una cantidad total de minutos a horas y minutos separados
 */
export function convertMinutesToHoursAndMinutes(total: number): {
  hours: number;
  minutes: number;
} {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return { hours, minutes };
}

/**
 * Retorna un string de fecha y hora en el formato dd/MM/yyyy HH:mm (ej. "20/03/2025 08:23")
 */
export function formatDateTime(date: Date): string {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}

/**
 * Elimina el .xx (cualquier decimal) que envía mal el backend
 */
export const cleanDateString = (dateString: string | null | undefined) => {
  if (!dateString) return null;
  return dateString.replace(/\.\d+$/, ""); // Elimina cualquier ".91", ".123", etc.
};
