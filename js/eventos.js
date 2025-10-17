class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = parseFloat(notaFinal);
    }

    isAprovado = () => this.notaFinal >= 7;
}

let alunos = [];
let editIndex = null;

const form = document.getElementById('formAluno');
const tabela = document.getElementById('tabelaAlunos');

// Evento de envio do formulário (função anônima)
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const notaFinal = document.getElementById('nota').value;

    const novoAluno = new Aluno(nome, idade, curso, notaFinal);

    if (editIndex === null) {
        alunos.push(novoAluno);
        alert(`Aluno ${novoAluno.nome} cadastrado com sucesso!`);
    } else {
        alunos[editIndex] = novoAluno;
        alert(`Aluno ${novoAluno.nome} atualizado com sucesso!`);
        editIndex = null;
    }

    form.reset();
    atualizarTabela();
});

// Atualiza a tabela (arrow function)
const atualizarTabela = () => {
    tabela.innerHTML = '';

    alunos.forEach((aluno, index) => {
        const situacao = aluno.isAprovado()
            ? '<span class="badge bg-success">Aprovado</span>'
            : '<span class="badge bg-danger">Reprovado</span>';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>
                <button class="btn btn-warning btn-sm me-2">Editar</button>
                <button class="btn btn-danger btn-sm">Excluir</button>
            </td>
        `;

        // Eventos com funções anônimas
        row.querySelector('.btn-warning').addEventListener('click', function () {
            editarAluno(index);
        });

        row.querySelector('.btn-danger').addEventListener('click', function () {
            excluirAluno(index);
        });

        tabela.appendChild(row);
    });
};

// Editar aluno (arrow function)
const editarAluno = (index) => {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('nota').value = aluno.notaFinal;
    editIndex = index;

    alert(`Editando cadastro de ${aluno.nome}`);
};

// Excluir aluno (arrow function)
const excluirAluno = (index) => {
    if (confirm('Deseja realmente excluir este aluno?')) {
        const nome = alunos[index].nome;
        alunos.splice(index, 1);
        atualizarTabela();
        console.log(`Aluno ${nome} foi excluído.`);
        alert(`Aluno ${nome} excluído com sucesso!`);
    }
};
