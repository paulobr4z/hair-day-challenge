import { SunHorizonIcon, TrashIcon } from "@phosphor-icons/react";
import type { IAppointment } from "@/types";

interface AppointmentSectionProps {
  title: string;
  range: string;
  appointments: IAppointment[];
  handleDeleteAppointment: (id: string) => void;
}

export function AppointmentSection({
  title,
  range,
  appointments,
  handleDeleteAppointment,
}: AppointmentSectionProps) {
  return (
    <div className="border border-gray-600 rounded-xl">
      <div className="flex gap-3 px-5 py-3 border-b border-gray-600">
        <SunHorizonIcon size={20} className="fill-yellow" />
        <p className="text-sm/5 text-gray-300">{title}</p>
        <p className="text-sm/5 text-gray-300 ml-auto">{range}</p>
      </div>

      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center gap-3 p-5 pb-0 last:pb-5"
          >
            <b className="text-base/6 text-gray-200 font-bold">
              {appointment.time}
            </b>
            <p className="text-base/6 text-gray-200">{appointment.customer}</p>
            <TrashIcon
              size={20}
              className="fill-yellow ml-auto"
              onClick={() => handleDeleteAppointment(appointment.id)}
            />
          </div>
        ))
      ) : (
        <div className="p-5">
          <p className="text-base/6 text-gray-200">
            Nenhum agendamento para este período
          </p>
        </div>
      )}
    </div>
  );
}
