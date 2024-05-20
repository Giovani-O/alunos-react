import { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import logoCadastro from './assets/cadastro.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export function App() {
  const [data, setData] = useState([])
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false)
  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: '',
    nome: '',
    email: '',
    idade: '',
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    getAlunos()
  })

  function openCreationModal() {
    setIsCreationModalOpen(true)
  }

  function closeCreationModal() {
    setIsCreationModalOpen(false)
  }

  function openEditModal() {
    setIsEditModalOpen(true)
  }

  function closeEditModal() {
    setIsEditModalOpen(false)
  }

  const baseUrl = 'https://localhost:44377/api/alunos'
  async function getAlunos() {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleChange(e) {
    const { name, value } = e.target
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value,
    })
    console.log(alunoSelecionado)
  }

  async function postAlunos() {
    delete alunoSelecionado.id

    alunoSelecionado.idade = parseInt(alunoSelecionado.idade)
    await axios
      .post(baseUrl, alunoSelecionado)
      .then((response) => {
        setData(data.concat(response.data))
        closeCreationModal()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function selecionarAluno(aluno, opcao) {
    setAlunoSelecionado(aluno)
    opcao === 'Editar' && openEditModal()
  }

  async function putAlunos() {
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade)
    await axios
      .put(baseUrl + '/' + alunoSelecionado.id, alunoSelecionado)
      .then((response) => {
        let resposta = response.data
        let dadosAuxiliares = data

        dadosAuxiliares.map((aluno) => {
          if (aluno.id === alunoSelecionado.id) {
            aluno.nome = resposta.nome
            aluno.email = resposta.email
            aluno.idade = resposta.idade
          }
        })
        closeEditModal()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="aluno-container">
      <br />
      <h3>Cadastro de alunos</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro" />
        <button className="btn btn-success" onClick={openCreationModal}>
          Incluir aluno
        </button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Id</td>
            <td>Nome</td>
            <td>Email</td>
            <td>Idade</td>
            <td>Operação</td>
          </tr>
        </thead>
        <tbody>
          {data.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <div className="buttons-wrapper">
                  <button
                    className="btn btn-primary"
                    onClick={() => selecionarAluno(aluno, 'Editar')}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => selecionarAluno(aluno, 'Excluir')}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isCreationModalOpen}>
        <ModalHeader>Incluir alunos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
            />
            <label>Email: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
            />
            <label>Idade: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={postAlunos}>
            Incluir
          </button>
          <button className="btn btn-neutral" onClick={closeCreationModal}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isEditModalOpen}>
        <ModalHeader>Editar alunos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id: </label>
            <br />
            <input
              readOnly
              className="form-control"
              value={alunoSelecionado && alunoSelecionado.id}
            />

            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.nome}
            />

            <label>Email: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.email}
            />

            <label>Idade: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.idade}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={putAlunos}>
            Editar
          </button>
          <button className="btn btn-neutral" onClick={closeEditModal}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
