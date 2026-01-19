import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioButton } from "../../components/radio-button";

describe("<RadioButton />", () => {
  const defaultProps = {
    label: "09:00",
    value: "09:00",
    name: "schedule",
    checked: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o label corretamente", () => {
    render(<RadioButton {...defaultProps} />);

    expect(screen.getByText("09:00")).toBeInTheDocument();
  });

  it("renderiza o input radio com os atributos corretos", () => {
    render(<RadioButton {...defaultProps} />);

    const input = screen.getByRole("radio");

    expect(input).toHaveAttribute("type", "radio");
    expect(input).toHaveAttribute("name", "schedule");
    expect(input).toHaveAttribute("value", "09:00");
  });

  it("fica checked quando checked=true", () => {
    render(<RadioButton {...defaultProps} checked />);

    const input = screen.getByRole("radio");

    expect(input).toBeChecked();
  });

  it("fica disabled quando disabled=true", () => {
    render(<RadioButton {...defaultProps} disabled />);

    const input = screen.getByRole("radio");

    expect(input).toBeDisabled();
  });

  it("aplica classes de checked quando checked=true", () => {
    render(<RadioButton {...defaultProps} checked />);

    const label = screen.getByText("09:00").closest("label");

    expect(label).toHaveClass("border-yellow");
    expect(label).toHaveClass("text-yellow");
    expect(label).toHaveClass("pointer-events-none");
  });

  it("aplica classes de disabled quando disabled=true", () => {
    render(<RadioButton {...defaultProps} disabled />);

    const label = screen.getByText("09:00").closest("label");

    expect(label).toHaveClass("border-gray-600");
    expect(label).toHaveClass("text-gray-500");
    expect(label).toHaveClass("pointer-events-none");
  });

  it("aplica classes do compoundVariants quando não está checked nem disabled", () => {
    render(<RadioButton {...defaultProps} />);

    const label = screen.getByText("09:00").closest("label");

    expect(label).toHaveClass("border-gray-500");
    expect(label).toHaveClass("text-gray-200");
    expect(label).toHaveClass("cursor-pointer");
  });

  it("chama onChange ao clicar no label", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<RadioButton {...defaultProps} onChange={onChange} />);

    const label = screen.getByText("09:00");

    await user.click(label);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("não chama onChange quando está disabled", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<RadioButton {...defaultProps} disabled onChange={onChange} />);

    const label = screen.getByText("09:00");

    await user.click(label);

    expect(onChange).not.toHaveBeenCalled();
  });
});
