"use client";

import {
  CalendarBlankIcon,
  CaretDownIcon,
  UserSquareIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { AppointmentSection } from "@/components/appointment-section";
import { Button } from "@/components/button";
import { RadioButton } from "@/components/radio-button";
import type { IAppointment } from "@/types";
import { getAppointmentsByPeriod, getCurrentDateForInput } from "@/utils";

const availableTimes = {
  morning: [
    { id: crypto.randomUUID(), time: "09:00" },
    { id: crypto.randomUUID(), time: "10:00" },
    { id: crypto.randomUUID(), time: "11:00" },
    { id: crypto.randomUUID(), time: "12:00" },
  ],
  afternoon: [
    { id: crypto.randomUUID(), time: "13:00" },
    { id: crypto.randomUUID(), time: "14:00" },
    { id: crypto.randomUUID(), time: "15:00" },
    { id: crypto.randomUUID(), time: "16:00" },
    { id: crypto.randomUUID(), time: "17:00" },
    { id: crypto.randomUUID(), time: "18:00" },
  ],
  night: [
    { id: crypto.randomUUID(), time: "19:00" },
    { id: crypto.randomUUID(), time: "20:00" },
    { id: crypto.randomUUID(), time: "21:00" },
  ],
};

export default function Home() {
  const inputDateRef = useRef<HTMLInputElement>(null);
  const inputSelectDateRef = useRef<HTMLInputElement>(null);

  const [validatedDate, setValidatedDate] = useState(false);
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentHour, setAppointmentHour] = useState("");
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [filterDate, setFilterDate] = useState(getCurrentDateForInput());

  function openDatePicker() {
    inputDateRef.current?.showPicker();
  }

  function handleSetDate(e: string) {
    if (e !== "") {
      setValidatedDate(true);
      setAppointmentDate(e);
    } else {
      setValidatedDate(false);
    }
    setSelectedTimeId(null);
  }

  function handleSelectTime(time: string, timeId: string) {
    setSelectedTimeId(timeId);
    setAppointmentHour(time);
  }

  function openSelectDatePicker() {
    inputSelectDateRef.current?.showPicker();
  }

  function handleFilterDateChange(date: string) {
    setFilterDate(date);
  }

  function handleSubmit() {
    const updated = [...appointments];

    const newAppointment = {
      id: crypto.randomUUID(),
      date: appointmentDate,
      time: appointmentHour,
      customer: customerName,
    };

    updated.push(newAppointment);

    setAppointments(updated);
    setAppointmentDate("");
    setAppointmentHour("");
    setCustomerName("");
    setValidatedDate(false);

    if (inputDateRef.current) {
      inputDateRef.current.value = "";
    }
  }

  function deleteAppointment(id: string) {
    const updatedDeleteAppointments = appointments.filter(
      (appointment) => appointment.id !== id,
    );

    setAppointments(updatedDeleteAppointments);
  }

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === filterDate,
  );

  const groupedAppointments = {
    morning: getAppointmentsByPeriod(filteredAppointments, "morning"),
    afternoon: getAppointmentsByPeriod(filteredAppointments, "afternoon"),
    night: getAppointmentsByPeriod(filteredAppointments, "night"),
  };

  function isTimeUnavailable(time: string) {
    return appointments.some(
      (appointment) =>
        appointment.date === appointmentDate && appointment.time === time,
    );
  }

  return (
    <div className="relative p-3 flex gap-3 flex-col md:flex-row max-w-360 mx-auto min-h-screen">
      <div className="bg-gray-600 rounded-br-xl absolute top-0 left-0">
        <Image src="./images/logo.svg" width={140} height={56} alt="logo" />
      </div>
      <aside className="p-20 bg-gray-700 rounded-xl max-w-124.5 w-full flex flex-col gap-6">
        <div>
          <h2 className="text-2xl/8 font-bold text-gray-100">
            Agende um atendimento
          </h2>
          <p className="text-gray-300 text-sm/5 mt-1">
            Selecione data, horário e informe o nome do cliente para criar o
            agendamento
          </p>
        </div>
        <form>
          <div className="flex flex-col gap-2">
            <span className="text-gray-200 text-base/6 font-bold">Data</span>
            <button
              onClick={openDatePicker}
              type="button"
              className="cursor-pointer focus-within:border-yellow-dark transition-colors p-3 rounded-xl border border-gray-500 flex items-center justify-center gap-2"
            >
              <CalendarBlankIcon size={20} className="fill-yellow" />
              <input
                ref={inputDateRef}
                type="date"
                name="date-picker"
                min={getCurrentDateForInput()}
                onChange={(e) => handleSetDate(e.target.value)}
                className="text-base/6 font-normal text-gray-200 outline-none bg-transparent"
              />
              <CaretDownIcon size={20} className="ml-auto fill-gray-300" />
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <span className="text-base/6 font-bold text-gray-200">
              Horários
            </span>
            <div className="space-y-3">
              <p className="text-sm/5 text-gray-300 mb-2">Manhã</p>
              <div className="grid grid-cols-4 gap-2">
                {availableTimes.morning.map((time) => (
                  <RadioButton
                    key={time.id}
                    label={time.time}
                    value={time.time}
                    name="time"
                    disabled={!validatedDate || isTimeUnavailable(time.time)}
                    checked={selectedTimeId === time.id}
                    onChange={() => handleSelectTime(time.time, time.id)}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm/5 text-gray-300 mb-2">Tarde</p>
              <div className="grid grid-cols-4 gap-2">
                {availableTimes.afternoon.map((time) => (
                  <RadioButton
                    key={time.id}
                    label={time.time}
                    value={time.time}
                    name="time"
                    disabled={!validatedDate || isTimeUnavailable(time.time)}
                    checked={selectedTimeId === time.id}
                    onChange={() => handleSelectTime(time.time, time.id)}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm/5 text-gray-300 mb-2">Noite</p>
              <div className="grid grid-cols-4 gap-2">
                {availableTimes.night.map((time) => (
                  <RadioButton
                    key={time.id}
                    label={time.time}
                    value={time.time}
                    name="time"
                    disabled={!validatedDate || isTimeUnavailable(time.time)}
                    checked={selectedTimeId === time.id}
                    onChange={() => handleSelectTime(time.time, time.id)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="my-8">
            <span className="text-base/6 font-bold text-gray-200">Cliente</span>
            <button
              type="button"
              className="cursor-pointer focus-within:border-yellow-dark transition-colors p-3 rounded-xl border border-gray-500 flex items-center gap-2 w-full mt-2"
            >
              <UserSquareIcon size={20} className="fill-yellow" />
              <input
                type="text"
                name="customerName"
                placeholder="Digite seu nome"
                className="text-base/6 font-normal text-gray-200 outline-none bg-transparent"
                onChange={(e) => setCustomerName(e.target.value)}
                value={customerName}
              />
            </button>
          </div>
          <Button
            onClick={() => handleSubmit()}
            disabled={customerName === "" || !validatedDate}
          >
            Agendar
          </Button>
        </form>
      </aside>
      <main className="w-full pt-20">
        <div className="mx-auto max-w-170.5">
          <header className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl/8 font-bold text-gray-100">Sua agenda</h2>
              <p className="text-sm/6 font-normal text-gray-300">
                Consulte os seus cortes de cabelo agendados por dia
              </p>
            </div>
            <button
              onClick={openSelectDatePicker}
              type="button"
              className="cursor-pointer focus-within:border-yellow-dark transition-colors p-3 rounded-xl border border-gray-500 flex items-center justify-center gap-2"
            >
              <CalendarBlankIcon size={20} className="fill-yellow" />
              <input
                ref={inputSelectDateRef}
                type="date"
                name="date-picker-appointments"
                min={getCurrentDateForInput()}
                defaultValue={getCurrentDateForInput()}
                onChange={(e) => handleFilterDateChange(e.target.value)}
                className="text-base/6 font-normal text-gray-200 outline-none bg-transparent"
              />
              <CaretDownIcon size={20} className="ml-auto fill-gray-300" />
            </button>
          </header>
          <div className="flex flex-col gap-3 mt-8">
            <div className="flex flex-col gap-3">
              <AppointmentSection
                title="Manhã"
                range="09h-12h"
                appointments={groupedAppointments.morning}
                handleDeleteAppointment={deleteAppointment}
              />

              <AppointmentSection
                title="Tarde"
                range="13h-18h"
                appointments={groupedAppointments.afternoon}
                handleDeleteAppointment={deleteAppointment}
              />

              <AppointmentSection
                title="Noite"
                range="19h-21h"
                appointments={groupedAppointments.night}
                handleDeleteAppointment={deleteAppointment}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
