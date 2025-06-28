class Heroi {
  constructor(nome, idade, tipo) {
    this.nome = nome;
    this.idade = idade;
    this.tipo = tipo; // guerreiro, mago, monge, ninja
  }

  atacar() {
    let ataque;

    switch (this.tipo) {
      case "mago":
        ataque = "magia";
        break;
      case "guerreiro":
        ataque = "espada";
        break;
      case "monge":
        ataque = "artes marciais";
        break;
      case "ninja":
        ataque = "shuriken";
        break;
      default:
        ataque = "um ataque desconhecido"; // Para tipos não previstos
    }

    console.log(`O ${this.tipo} atacou usando ${ataque}`);
  }
}

// --- Exemplos de uso ---

// Criando diferentes heróis
const heroiMago = new Heroi("Gandalf", 150, "mago");
const heroiGuerreiro = new Heroi("Aragorn", 35, "guerreiro");
const heroiMonge = new Heroi("Li Shen", 28, "monge");
const heroiNinja = new Heroi("Hanzo", 25, "ninja");
const heroiDesconhecido = new Heroi("João", 30, "aldeão"); // Exemplo de tipo não previsto

// Fazendo os heróis atacarem
heroiMago.atacar();
heroiGuerreiro.atacar();
heroiMonge.atacar();
heroiNinja.atacar();
heroiDesconhecido.atacar();
