import type { IAppointment } from "@/types";

export function getCurrentDateForInput(): string {
  const today = new Date();
  const hour = today.getHours();

  if (hour >= 20) {
    today.setDate(today.getDate() + 1);
  }

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

type Period = "morning" | "afternoon" | "night";

function getPeriodByTime(time: string): Period | null {
  const hour = Number(time.split(":")[0]);

  if (hour >= 8 && hour <= 12) return "morning";
  if (hour >= 13 && hour <= 18) return "afternoon";
  if (hour >= 19 && hour <= 21) return "night";

  return null;
}

export function compareTimeAsc(a: string, b: string) {
  const [aHour, aMin] = a.split(":").map(Number);
  const [bHour, bMin] = b.split(":").map(Number);

  return aHour * 60 + aMin - (bHour * 60 + bMin);
}

export function getAppointmentsByPeriod(
  appointments: IAppointment[],
  period: Period,
) {
  return appointments
    .filter((a) => getPeriodByTime(a.time) === period)
    .sort((a, b) => compareTimeAsc(a.time, b.time));
}
