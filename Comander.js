//Classe contato
class Contato {
    constructor(nome, telefone, email) {
      this.nome = nome;
      this.telefone = telefone;
      this.email = email;
    }
  }
  
  // Gerenciador de contato
  class GerenciadorContatos {
    constructor() {
      this.contatos = [];
    }
  
    addContato(contato) {
      this.contatos.push(contato);
      console.log(`Contato "${contato.nome}" adicionado com sucesso!`);
    }
  
    rmvContato(nome) {
      const index = this.contatos.findIndex((contato) => contato.nome === nome);
  
      if (index !== -1) {
        const [removido] = this.contatos.splice(index, 1);
        console.log(`Contato "${removido.nome}" removido com sucesso!`);
      } else {
        console.log(`Contato com nome "${nome}" não encontrado.`);
      }
    }
  
    listarContatos() {
      return this.contatos;
    }
  }
  
  // Padrão Command para busca
  class Busca {
    constructor(gerenciador, criterio) {
      this.gerenciador = gerenciador;
      this.criterio = criterio;
      this.resultado = [];
    }
  
    executar() {
      throw new Error("Método executar() deve ser implementado.");
    }
  }
  
  class BuscaPorNome extends Busca {
    executar() {
      this.resultado = this.gerenciador.contatos.filter((contato) =>
        contato.nome.toLowerCase().includes(this.criterio.toLowerCase())
      );
      console.log("\nResultados da Busca por Nome:");
      this.resultado.forEach((contato, index) => {
        console.log(
          `${index + 1}. Nome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}`
        );
      });
    }
  }
  
  class BuscaPorEmail extends Busca {
    executar() {
      this.resultado = this.gerenciador.contatos.filter((contato) =>
        contato.email.toLowerCase().includes(this.criterio.toLowerCase())
      );
      console.log("\nResultados da Busca por Email:");
      this.resultado.forEach((contato, index) => {
        console.log(
          `${index + 1}. Nome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}`
        );
      });
    }
  }
  
  // Interação com o sistema
  const readline = require("readline");
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  const gerenciador = new GerenciadorContatos();
  
  function menu() {
    console.log("\n--- Gerenciador de Contatos ---");
    console.log("1. Adicionar Contato");
    console.log("2. Remover Contato");
    console.log("3. Listar Contatos");
    console.log("4. Buscar Contato");
    console.log("5. Sair");
  
    rl.question("Escolha uma opção: ", (opcao) => {
      switch (opcao) {
        case "1":
          rl.question("Nome: ", (nome) => {
            rl.question("Telefone: ", (telefone) => {
              rl.question("Email: ", (email) => {
                const contato = new Contato(nome, telefone, email);
                gerenciador.addContato(contato);
                menu();
              });
            });
          });
          break;
        case "2":
          rl.question("Digite o nome do contato a ser removido: ", (nome) => {
            gerenciador.rmvContato(nome);
            menu();
          });
          break;
        case "3":
          console.log("\nLista de Contatos:");
          gerenciador.listarContatos().forEach((contato, index) => {
            console.log(
              `${index + 1}. Nome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}`
            );
          });
          menu();
          break;
        case "4":
          rl.question("Buscar por (nome/email): ", (filtro) => {
            rl.question("Termo de busca: ", (termo) => {
              let busca;
              if (filtro.toLowerCase() === "nome") {
                busca = new BuscaPorNome(gerenciador, termo);
              } else if (filtro.toLowerCase() === "email") {
                busca = new BuscaPorEmail(gerenciador, termo);
              } else {
                console.log("Filtro inválido.");
                menu();
                return;
              }
              busca.executar();
              menu();
            });
          });
          break;
        case "5":
          console.log("Saindo do sistema...");
          rl.close();
          break;
        default:
          console.log("Opção inválida.");
          menu();
          break;
      }
    });
  }
  
  menu();
  