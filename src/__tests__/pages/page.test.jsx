import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../app/page";

describe("Home Page", () => {
  it("deve renderizar a página corretamente", () => {
    render(<Home />);
    expect(screen.getByAltText("hair day logo")).toBeInTheDocument();
    expect(screen.getByText("Agende um atendimento")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Agendar" }));
  });
});
