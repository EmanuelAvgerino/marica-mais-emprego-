// Função para buscar usuários da API
async function fetchUsuarios() {
    try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuarios = await resposta.json();

        mostrarUsuarios(usuarios);
    } catch (erro) {
        console.error('Erro ao buscar usuários:', erro);
    }
}

// Função para mostrar todos os usuários
function mostrarUsuarios(usuarios) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Limpa antes de carregar

    const favoritos = pegarFavoritos();

    usuarios.forEach(usuario => {
        const div = document.createElement('div');
        div.classList.add('user');

        const favoritado = favoritos.some(fav => fav.id === usuario.id);

        div.innerHTML = `
            <h3>${usuario.name}</h3>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Telefone:</strong> ${usuario.phone}</p>
            <p><strong>Endereço:</strong> ${usuario.address.street}, ${usuario.address.city}</p>
            <button class="favorite-btn">${favoritado ? '⭐' : '☆'}</button>
        `;

        const botaoFavorito = div.querySelector('.favorite-btn');
        botaoFavorito.addEventListener('click', () => {
            alternarFavorito(usuario);
        });

        userList.appendChild(div);
    });
}

// Função para pegar favoritos do localStorage
function pegarFavoritos() {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
}

// Função para salvar favoritos no localStorage
function salvarFavoritos(favoritos) {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

// Função para adicionar ou remover dos favoritos
function alternarFavorito(usuario) {
    let favoritos = pegarFavoritos();

    const jaFavoritado = favoritos.some(fav => fav.id === usuario.id);

    if (jaFavoritado) {
        favoritos = favoritos.filter(fav => fav.id !== usuario.id);
    } else {
        favoritos.push(usuario);
    }

    salvarFavoritos(favoritos);
    mostrarUsuariosCarregados(); // Atualiza os botões
    mostrarFavoritos();
}

// Função para mostrar os favoritos
function mostrarFavoritos() {
    const favoriteList = document.getElementById('favoriteList');
    favoriteList.innerHTML = ''; // Limpa antes de carregar

    const favoritos = pegarFavoritos();

    favoritos.forEach(usuario => {
        const div = document.createElement('div');
        div.classList.add('user');

        div.innerHTML = `
            <h3>${usuario.name}</h3>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Telefone:</strong> ${usuario.phone}</p>
            <p><strong>Endereço:</strong> ${usuario.address.street}, ${usuario.address.city}</p>
        `;

        favoriteList.appendChild(div);
    });
}

// Função para atualizar a lista usando os usuários já carregados
let usuariosCarregados = [];

function mostrarUsuariosCarregados() {
    mostrarUsuarios(usuariosCarregados);
}

// Quando a página carrega
async function iniciar() {
    try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
        usuariosCarregados = await resposta.json();
        mostrarUsuarios(usuariosCarregados);
        mostrarFavoritos();
    } catch (erro) {
        console.error('Erro ao buscar usuários:', erro);
    }
}

// Começa tudo
iniciar();
