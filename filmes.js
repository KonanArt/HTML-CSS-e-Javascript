const form = document.getElementById("formFilme");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const filme = {
    titulo: document.getElementById("titulo").value,
    descricao: document.getElementById("descricao").value,
    genero: document.getElementById("genero").value,
    classificacao: document.getElementById("classificacao").value,
    duracao: document.getElementById("duracao").value,
    dataEstreia: document.getElementById("dataEstreia").value
  };

  let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  filmes.push(filme);
  localStorage.setItem("filmes", JSON.stringify(filmes));

  alert("Filme cadastrado com sucesso!");
  form.reset();
});
