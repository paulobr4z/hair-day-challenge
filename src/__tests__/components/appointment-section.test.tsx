import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { IAppointment } from "@/types";
import { AppointmentSection } from "../../components/appointment-section";

describe("<AppointmentSection />", () => {
  const appointmentsMock: IAppointment[] = [
    {
      id: "1",
      time: "09:00",
      customer: "Viviane",
      date: "2026-01-16",
    },
    {
      id: "2",
      time: "10:00",
      customer: "Carlos",
      date: "2026-01-16",
    },
  ];

  const defaultProps = {
    title: "Manhã",
    range: "08h - 12h",
    appointments: [],
    handleDeleteAppointment: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o título e o range corretamente", () => {
    render(<AppointmentSection {...defaultProps} />);

    expect(screen.getByText("Manhã")).toBeInTheDocument();
    expect(screen.getByText("08h - 12h")).toBeInTheDocument();
  });

  it("renderiza a mensagem de vazio quando não há agendamentos", () => {
    render(<AppointmentSection {...defaultProps} />);

    expect(
      screen.getByText("Nenhum agendamento para este período"),
    ).toBeInTheDocument();
  });

  it("renderiza a lista de agendamentos quando existem dados", () => {
    render(
      <AppointmentSection {...defaultProps} appointments={appointmentsMock} />,
    );

    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Viviane")).toBeInTheDocument();

    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("Carlos")).toBeInTheDocument();
  });

  it("não renderiza a mensagem de vazio quando há agendamentos", () => {
    render(
      <AppointmentSection {...defaultProps} appointments={appointmentsMock} />,
    );

    expect(
      screen.queryByText("Nenhum agendamento para este período"),
    ).not.toBeInTheDocument();
  });

  it("chama handleDeleteAppointment com o id correto ao clicar no ícone de lixeira", async () => {
    const user = userEvent.setup();
    const handleDeleteAppointment = jest.fn();

    render(
      <AppointmentSection
        {...defaultProps}
        appointments={appointmentsMock}
        handleDeleteAppointment={handleDeleteAppointment}
      />,
    );

    const trashIcons = screen.getAllByRole("img", { hidden: true });

    // clica no primeiro ícone (appointment id = "1")
    await user.click(trashIcons[0]);

    expect(handleDeleteAppointment).toHaveBeenCalledTimes(1);
    expect(handleDeleteAppointment).toHaveBeenCalledWith("1");
  });
});
