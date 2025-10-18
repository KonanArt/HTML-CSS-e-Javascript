// Classe Funcionario
class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  getNome() { return this.nome; }
  setNome(n) { this.nome = n; }

  getIdade() { return this.idade; }
  setIdade(i) { this.idade = i; }

  getCargo() { return this.cargo; }
  setCargo(c) { this.cargo = c; }

  getSalario() { return this.salario; }
  setSalario(s) { this.salario = s; }

  toString() {
    return `${this.nome} - ${this.cargo} (${this.idade} anos)`;
  }
}

// Array de funcionários
let funcionarios = [];

// Referências
const form = document.getElementById("formFuncionario");
const tbody = document.getElementById("tbodyFuncionarios");
const btnCadastrar = document.getElementById("btnCadastrar");
const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");
const btnCancelarEdicao = document.getElementById("btnCancelarEdicao");
const indiceEdicaoInput = document.getElementById("indiceEdicao");

// Evento de cadastro
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const cargo = document.getElementById("cargo").value;
  const salario = document.getElementById("salario").value;

  const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
  funcionarios.push(novoFuncionario);

  atualizarTabela();
  form.reset();
});

// Atualiza a tabela
function atualizarTabela() {
  tbody.innerHTML = "";

  funcionarios.forEach((func, index) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${func.getNome()}</td>
      <td>${func.getIdade()}</td>
      <td>${func.getCargo()}</td>
      <td>${Number(func.getSalario()).toFixed(2)}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2" onclick="editarFuncionario(${index})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="excluirFuncionario(${index})">Excluir</button>
      </td>
    `;

    tbody.appendChild(linha);
  });
}

// Função para excluir funcionário
function excluirFuncionario(index) {
  if (confirm("Deseja realmente excluir este funcionário?")) {
    funcionarios.splice(index, 1);
    atualizarTabela();
  }
}

// Função para editar funcionário
function editarFuncionario(index) {
  const func = funcionarios[index];

  document.getElementById("nome").value = func.getNome();
  document.getElementById("idade").value = func.getIdade();
  document.getElementById("cargo").value = func.getCargo();
  document.getElementById("salario").value = func.getSalario();
  indiceEdicaoInput.value = index;

  btnCadastrar.classList.add("d-none");
  btnSalvarEdicao.classList.remove("d-none");
  btnCancelarEdicao.classList.remove("d-none");
}

// Salvar alteração
btnSalvarEdicao.addEventListener("click", () => {
  const index = indiceEdicaoInput.value;

  if (index !== "") {
    const func = funcionarios[index];
    func.setNome(document.getElementById("nome").value);
    func.setIdade(document.getElementById("idade").value);
    func.setCargo(document.getElementById("cargo").value);
    func.setSalario(document.getElementById("salario").value);
  }

  atualizarTabela();
  cancelarEdicao();
});

// Cancelar edição
btnCancelarEdicao.addEventListener("click", cancelarEdicao);

function cancelarEdicao() {
  form.reset();
  indiceEdicaoInput.value = "";
  btnCadastrar.classList.remove("d-none");
  btnSalvarEdicao.classList.add("d-none");
  btnCancelarEdicao.classList.add("d-none");
}
