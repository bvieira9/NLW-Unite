let participantes = [
  {
    nome: "Bárbara Vieira",
    email: "barbaravieira@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "Diego Fernandes",
    email: "diegofernandes@gmail.com",
    dataInscricao: new Date(2024, 1, 19, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "João Silva",
    email: "joaosilva@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 18, 30),
    dataCheckIn: new Date(2024, 0, 20, 21, 15)
  },
  {
    nome: "Maria Souza",
    email: "mariasouza@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 12, 45),
    dataCheckIn: new Date(2024, 2, 10, 14, 30)
  },
  {
    nome: "Pedro Santos",
    email: "pedrosantos@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 14, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana Oliveira",
    email: "anaoliveira@gmail.com",
    dataInscricao: new Date(2024, 0, 7, 10, 10),
    dataCheckIn: new Date(2024, 0, 12, 13, 25)
  },
  {
    nome: "Lucas Martins",
    email: "lucasmartins@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 15, 55),
    dataCheckIn: new Date(2024, 2, 23, 18, 45)
  },
  {
    nome: "Juliana Costa",
    email: "julianacosta@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 20, 30),
    dataCheckIn: new Date(2024, 2, 27, 23, 10)
  },
  {
    nome: "Rafaela Lima",
    email: "rafaelalima@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 8, 15),
    dataCheckIn: null
  },
  {
    nome: "Gustavo Pereira",
    email: "gustavopereira@gmail.com",
    dataInscricao: new Date(2024, 2, 8, 17, 40),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

// condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
for(let participante of participantes) {
  output = output + criarNovoParticipante(participante)
}

// substituir informação do HTML
document
.querySelector('tbody')
.innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipannte = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

const participante = {
  nome: dadosDoFormulario.get('nome'),
  email: dadosDoFormulario.get('email'),
  dataInscricao: new Date(),
  dataCheckIn: null
}

// Verificar se o participante já existe

const participanteExiste = participantes.find((p) => p.email == participante.email)

if(participanteExiste) {
  alert('E-mail já cadastrado!')
  return
}
participantes = [participante, ...participantes] 
atualizarLista(participantes)

// limpar o formulário 
event.target.querySelector('[name="nome"]').value = ""
event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}

