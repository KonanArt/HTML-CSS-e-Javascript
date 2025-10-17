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
const saida = document.getElementById('saidaRelatorios');

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

        row.querySelector('.btn-warning').addEventListener('click', function () {
            editarAluno(index);
        });

        row.querySelector('.btn-danger').addEventListener('click', function () {
            excluirAluno(index);
        });

        tabela.appendChild(row);
    });
};

const editarAluno = (index) => {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('nota').value = aluno.notaFinal;
    editIndex = index;

    alert(`Editando cadastro de ${aluno.nome}`);
};

const excluirAluno = (index) => {
    if (confirm('Deseja realmente excluir este aluno?')) {
        const nome = alunos[index].nome;
        alunos.splice(index, 1);
        atualizarTabela();
        console.log(`Aluno ${nome} foi excluído.`);
        alert(`Aluno ${nome} excluído com sucesso!`);
    }
};

const btnAprovados = document.getElementById('btnAprovados');
const btnMediaNotas = document.getElementById('btnMediaNotas');
const btnMediaIdades = document.getElementById('btnMediaIdades');
const btnOrdemAlfabetica = document.getElementById('btnOrdemAlfabetica');
const btnPorCurso = document.getElementById('btnPorCurso');

// função auxiliar para mostrar resultados
const mostrarResultado = (lista) => {
    saida.innerHTML = '';
    if (Array.isArray(lista)) {
        lista.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            saida.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = lista;
        saida.appendChild(li);
    }
};

// Listar alunos aprovados
btnAprovados.addEventListener('click', () => {
    const aprovados = alunos
        .filter(a => a.isAprovado())
        .map(a => `${a.nome} (${a.notaFinal})`);
    mostrarResultado(aprovados.length ? aprovados : 'Nenhum aluno aprovado.');
});

// Média das notas
btnMediaNotas.addEventListener('click', () => {
    if (alunos.length === 0) return mostrarResultado('Sem alunos cadastrados.');
    const media = alunos.reduce((acc, a) => acc + a.notaFinal, 0) / alunos.length;
    mostrarResultado(`Média das notas finais: ${media.toFixed(2)}`);
});

// Média das idades
btnMediaIdades.addEventListener('click', () => {
    if (alunos.length === 0) return mostrarResultado('Sem alunos cadastrados.');
    const media = alunos.reduce((acc, a) => acc + a.idade, 0) / alunos.length;
    mostrarResultado(`Média das idades: ${media.toFixed(1)} anos`);
});

// Nomes em ordem alfabética
btnOrdemAlfabetica.addEventListener('click', () => {
    const nomes = alunos.map(a => a.nome).sort();
    mostrarResultado(nomes.length ? nomes : 'Nenhum aluno cadastrado.');
});

// Quantidade por curso
btnPorCurso.addEventListener('click', () => {
    if (alunos.length === 0) return mostrarResultado('Sem alunos cadastrados.');

    const porCurso = alunos.reduce((acc, a) => {
        acc[a.curso] = (acc[a.curso] || 0) + 1;
        return acc;
    }, {});

    const lista = Object.entries(porCurso).map(([curso, qtd]) => `${curso}: ${qtd} aluno(s)`);
    mostrarResultado(lista);
});
