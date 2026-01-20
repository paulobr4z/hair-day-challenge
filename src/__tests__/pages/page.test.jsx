import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import Home from "../../app/page";

describe("Home Page", () => {
  it("deve renderizar a página corretamente", () => {
    render(<Home />);
    expect(screen.getByAltText("hair day logo")).toBeInTheDocument();
    expect(screen.getByText("Agende um atendimento")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Agendar" }));
  });

  it("deve iniciar com o botão Agendar desabilitado", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: /agendar/i });
    expect(button).toBeDisabled();
  });

  it("deve desabilitar horário já agendado", () => {
    render(<Home />);

    const dateInput = screen
      .getAllByRole("textbox")
      .find((input) => input.getAttribute("type") === "date");

    fireEvent.change(dateInput, {
      target: { value: "2026-01-20" },
    });

    const timeRadio = screen.getByLabelText("09:00");
    fireEvent.click(timeRadio);

    const nameInput = screen.getByPlaceholderText("Digite seu nome");
    fireEvent.change(nameInput, {
      target: { value: "Paulo" },
    });

    fireEvent.click(screen.getByRole("button", { name: /agendar/i }));

    fireEvent.change(dateInput, {
      target: { value: "2026-01-20" },
    });

    const sameTimeRadio = screen.getByLabelText("09:00");
    expect(sameTimeRadio).toBeDisabled();
  });
});
