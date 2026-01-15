"use client";

import {
  CalendarBlankIcon,
  CaretDownIcon,
  SunHorizonIcon,
  TrashIcon,
  UserSquareIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/button";
import { RadioButton } from "@/components/radio-button";
import { getCurrentDateForInput } from "@/utils";

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
  const inputNameCustomerRef = useRef<HTMLInputElement>(null);
  const inputSelectDateRef = useRef<HTMLInputElement>(null);

  const [validatedDate, setValidatedDate] = useState(false);
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>("");

  function openDatePicker() {
    inputDateRef.current?.showPicker();
  }

  function handleSetDate(e: string) {
    if (e !== "") {
      setValidatedDate(true);
    } else {
      setValidatedDate(false);
      setSelectedTimeId(null);
    }
  }

  function handleSelectTime(timeId: string) {
    setSelectedTimeId(timeId);
  }

  function openSelectDatePicker() {
    inputSelectDateRef.current?.showPicker();
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
        <form action="">
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
                    disabled={!validatedDate}
                    checked={selectedTimeId === time.id}
                    onChange={() => handleSelectTime(time.id)}
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
                    disabled={!validatedDate}
                    checked={selectedTimeId === time.id}
                    onChange={() => handleSelectTime(time.id)}
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
                    disabled={!validatedDate}
                    checked={selectedTimeId === time.id}
                    onChange={() => handleSelectTime(time.id)}
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
                placeholder="Paulo Braz"
                className="text-base/6 font-normal text-gray-200 outline-none bg-transparent"
                onChange={(e) => setCustomerName(e.target.value)}
                value={customerName}
              />
            </button>
          </div>
          <Button disabled={customerName === ""}>Agendar</Button>
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
                name="date-picker"
                id=""
                defaultValue={getCurrentDateForInput()}
                className="text-base/6 font-normal text-gray-200 outline-none bg-transparent"
              />
              <CaretDownIcon size={20} className="ml-auto fill-gray-300" />
            </button>
          </header>
          <div className="flex flex-col gap-3 mt-8">
            <div>
              <div className="border border-gray-600 rounded-xl">
                <div className="flex gap-3 px-5 py-3 border-b border-gray-600">
                  <SunHorizonIcon size={20} className="fill-yellow" />
                  <p className="text-sm/5 text-gray-300">Manhã</p>
                  <p className="text-sm/5 text-gray-300 ml-auto">09h-12h</p>
                </div>
                <div className="flex items-center gap-3 p-5">
                  <b className="text-base/6 text-gray-200 font-bold">09:00</b>
                  <p className="text-base/6 text-gray-200">Viviane Nayara</p>
                  <TrashIcon size={20} className="fill-yellow ml-auto" />
                </div>
              </div>
            </div>
            <div>
              <div className="border border-gray-600 rounded-xl">
                <div className="flex gap-3 px-5 py-3 border-b border-gray-600">
                  <SunHorizonIcon size={20} className="fill-yellow" />
                  <p className="text-sm/5 text-gray-300">Manhã</p>
                  <p className="text-sm/5 text-gray-300 ml-auto">09h-12h</p>
                </div>
                <div className="flex items-center gap-3 p-5">
                  <b className="text-base/6 text-gray-200 font-bold">09:00</b>
                  <p className="text-base/6 text-gray-200">Viviane Nayara</p>
                  <TrashIcon size={20} className="fill-yellow ml-auto" />
                </div>
              </div>
            </div>
            <div>
              <div className="border border-gray-600 rounded-xl">
                <div className="flex gap-3 px-5 py-3 border-b border-gray-600">
                  <SunHorizonIcon size={20} className="fill-yellow" />
                  <p className="text-sm/5 text-gray-300">Manhã</p>
                  <p className="text-sm/5 text-gray-300 ml-auto">09h-12h</p>
                </div>
                <div className="flex items-center gap-3 p-5">
                  <p className="text-base/6 text-gray-200">
                    Nenhum agendamento para este período
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
