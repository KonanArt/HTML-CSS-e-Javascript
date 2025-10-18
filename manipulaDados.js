class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  getNome() {
    return this.nome;
  }
  setNome(novoNome) {
    this.nome = novoNome;
  }

  getIdade() {
    return this.idade;
  }
  setIdade(novaIdade) {
    this.idade = novaIdade;
  }

  getCargo() {
    return this.cargo;
  }
  setCargo(novoCargo) {
    this.cargo = novoCargo;
  }

  getSalario() {
    return this.salario;
  }
  setSalario(novoSalario) {
    this.salario = novoSalario;
  }

  toString() {
    return `${this.nome} - ${this.cargo} (${this.idade} anos)`;
  }
}

let funcionarios = [];

// Referências aos elementos HTML
const form = document.getElementById("formFuncionario");
const tbody = document.getElementById("tbodyFuncionarios");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const cargo = document.getElementById("cargo").value;
  const salario = document.getElementById("salario").value;

  // Cria e adiciona novo funcionário
  const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
  funcionarios.push(novoFuncionario);

  atualizarTabela();
  form.reset();
});

// Função para exibir os funcionários na tabela
function atualizarTabela() {
  tbody.innerHTML = "";
  funcionarios.forEach(func => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${func.getNome()}</td>
      <td>${func.getIdade()}</td>
      <td>${func.getCargo()}</td>
      <td>${Number(func.getSalario()).toFixed(2)}</td>
    `;

    tbody.appendChild(linha);
  });
}
