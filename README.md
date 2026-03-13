## Formação Lógica de Programação · DIO

![DeveloperImagem001](https://github.com/user-attachments/assets/a79d2bad-6c37-4205-aff4-fd8467ff50d6)

---

# 🧙 Classes e Objetos em JavaScript — Modelando Personagens de Jogo com POO

## 1. Problema de Negócio

Funções isoladas não escalam quando o sistema precisa representar **entidades com estado e comportamento próprios**. Um personagem de jogo não é apenas um conjunto de variáveis — ele tem atributos que o identificam (nome, tipo, idade) e ações que dependem diretamente desses atributos (o ataque de um mago é diferente do ataque de um ninja).

O desafio técnico é modelar essa entidade de forma que o comportamento seja **encapsulado junto com os dados** — e que adicionar um novo tipo de personagem não exija reescrever a lógica existente.

---

## 2. Contexto

Este projeto foi desenvolvido como desafio prático do módulo de **Lógica de Programação** da DIO, marcando a transição entre lógica procedural e **Programação Orientada a Objetos (POO)**.

Nos projetos anteriores da série (`nivelDeHeroi`, `partidasRankeadas`), funções recebiam parâmetros e retornavam valores. Aqui, o salto conceitual é diferente: uma **classe** define o molde de um objeto — e cada instância criada a partir desse molde carrega seu próprio estado e sabe como se comportar. É o mesmo princípio que estrutura sistemas reais: entidades de negócio em APIs, modelos de domínio em aplicações enterprise, entidades em bancos de dados relacionados a código.

---

## 3. Premissas

- A classe `Heroi` é o molde genérico — serve para qualquer tipo de personagem, não apenas os quatro exemplos do enunciado.
- O método `atacar()` determina o ataque com base em `this.tipo`, que é propriedade da própria instância — não recebe o tipo como parâmetro externo.
- O bloco `default` do `switch` é tratamento defensivo real: tipos não previstos retornam `"um ataque desconhecido"` em vez de falhar silenciosamente ou retornar `undefined`.
- Cada instância é independente — alterar o estado de `heroiMago` não afeta `heroiGuerreiro`.

---

## 4. Estratégia da Solução

A implementação seguiu uma progressão consciente das decisões de design:

**Etapa 1 — Definição da classe com `constructor`:** as três propriedades (`nome`, `idade`, `tipo`) são atribuídas via `this` no construtor, tornando cada instância autocontida. O tipo é armazenado como string, o que permite extensibilidade sem alterar a estrutura da classe.

**Etapa 2 — `switch` no lugar de `if-else if`:** a escolha do `switch` sobre uma cadeia `if-else if` foi intencional. Quando a lógica avalia **uma única variável contra múltiplos valores discretos**, o `switch` comunica a intenção mais claramente — cada `case` é uma ramificação explícita, e o `default` documenta o comportamento para casos fora do domínio previsto.

**Etapa 3 — Método `atacar()` acessa `this.tipo`:** o método não recebe o tipo como argumento porque **não precisa** — ele já tem acesso ao estado do objeto via `this`. Isso é encapsulamento: o comportamento e os dados que ele precisa estão no mesmo lugar.

**Etapa 4 — Cinco instâncias de teste, incluindo tipo não previsto:** além dos quatro tipos definidos (mago, guerreiro, monge, ninja), o objeto `heroiDesconhecido` com tipo `"aldeão"` valida que o `default` funciona corretamente — o sistema não quebra diante de um tipo não mapeado.

---

## 5. Insights Técnicos

A implementação revela decisões de design que aparecem em sistemas reais:

- **Classe vs. função com objeto: qual a diferença prática?** Uma função que recebe `{ nome, tipo }` e retorna o ataque funcionaria para este exercício. A classe adiciona algo que a função não tem: **identidade persistente**. Uma instância de `Heroi` existe no tempo — pode acumular XP, ser derrotada, mudar de nível. Uma função apenas processa e descarta. Para entidades que precisam evoluir, a classe é a estrutura correta.

- **`switch` é um contrato de extensão:** cada `case` documenta um tipo suportado. Quando um novo tipo for adicionado (`"arqueiro"`, por exemplo), o desenvolvedor sabe exatamente onde inserir o novo comportamento — sem vasculhar condicionais aninhados. O `default` funciona como contrato implícito: "qualquer coisa fora desses casos recebe este tratamento".

- **`this` é o que diferencia método de função:** dentro de `atacar()`, `this.tipo` acessa a propriedade da instância específica que chamou o método. Isso significa que `heroiMago.atacar()` e `heroiNinja.atacar()` executam o mesmo código, mas com contextos (`this`) diferentes — o polimorfismo começa aqui.

- **O `heroiDesconhecido` é o teste mais importante:** sistemas que só são testados com entradas válidas criam falsos sensações de segurança. O objeto com tipo `"aldeão"` valida o comportamento defensivo do `default` — e documenta para quem lê o código que o sistema foi pensado para lidar com o inesperado.

---

## 6. Resultados

O projeto entrega:

- Classe `Heroi` reutilizável com **encapsulamento completo** de estado e comportamento
- Método `atacar()` com **dispatch por `switch`** cobrindo 4 tipos previstos e tratamento defensivo para tipos desconhecidos
- **5 instâncias de teste** validando todos os casos, incluindo o caminho `default`
- Separação clara entre molde (classe) e instâncias (objetos) — a mesma classe gera personagens completamente independentes entre si

A saída no terminal confirma que cada objeto responde de acordo com seu próprio estado, sem interferência entre instâncias:

```
O mago atacou usando magia
O guerreiro atacou usando espada
O monge atacou usando artes marciais
O ninja atacou usando shuriken
O aldeão atacou usando um ataque desconhecido
```

---

## 7. Próximos Passos

- **Herança:** criar subclasses `Mago extends Heroi` e `Guerreiro extends Heroi`, movendo o comportamento de ataque para dentro de cada subclasse e eliminando o `switch` da classe base — esse é o caminho para o polimorfismo real.
- **Atributos de combate:** adicionar `vida`, `mana` e `forca` ao construtor, e fazer o método `atacar()` consumir esses atributos, tornando o combate dinâmico e dependente do estado atual do herói.
- **Método `receberDano(dano)`:** implementar o lado oposto do combate, com lógica de redução de `vida` e verificação de derrota — abrindo caminho para simular batalhas completas.
- **Refatorar o `switch` para mapa de ataque:** substituir os `case` por um objeto de lookup `{ mago: "magia", guerreiro: "espada", ... }` e usar acesso por propriedade dinâmica (`this.ataques[this.tipo]`), tornando a adição de novos tipos uma operação de uma linha.

---

## 💻 Tecnologias Utilizadas

| Tecnologia | Uso no Projeto |
|------------|----------------|
| **JavaScript ES6+ (Classes)** | Definição de classe, constructor, método de instância, `this`, `switch` |
| **Node.js** | Execução do script via terminal |
| **Git / GitHub** | Controle de versão e hospedagem |

---

## ▶️ Como Executar

```bash
git clone https://github.com/Santosdevbjj/jogoClassesObjeto.git
cd jogoClassesObjeto
node classeHeroiCalc.js
```

---

**Contato:**

[![Portfólio Sérgio Santos](https://img.shields.io/badge/Portfólio-Sérgio_Santos-111827?style=for-the-badge&logo=githubpages&logoColor=00eaff)](https://portfoliosantossergio.vercel.app)

[![LinkedIn Sérgio Santos](https://img.shields.io/badge/LinkedIn-Sérgio_Santos-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/santossergioluiz)

---
