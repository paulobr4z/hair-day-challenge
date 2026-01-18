import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../../components/button";

describe("Button Component", () => {
  it("renderiza o botão corretamente", () => {
    render(<Button>salvar</Button>);

    const button = screen.getByRole("button", { name: /salvar/i });

    expect(button).toBeInTheDocument();
  });

  it("possui type='button' por padrão", () => {
    render(<Button>Enviar</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "button");
  });

  it("fica desabilitado quando disabled=true", () => {
    render(<Button disabled>Confirmar</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("aplica a classe de opacity quando disabled", () => {
    render(<Button disabled>Confirmar</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("opacity-30");
  });

  it("não aplica a classe de disabled quando disabled=false", () => {
    render(<Button>Ativo</Button>);

    const button = screen.getByRole("button");

    expect(button).not.toHaveClass("opacity-30");
  });

  it("chama onClick quando clicado", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Clique</Button>);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("não chama onClick quando está disabled", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <Button disabled onClick={onClick}>
        Clique
      </Button>,
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("mescla className externa com as classes do tailwind-variants", () => {
    render(<Button className="custom-class">Teste</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("custom-class");
  });
});
