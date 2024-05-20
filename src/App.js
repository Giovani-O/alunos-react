import { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import logoCadastro from './assets/cadastro.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export function App() {
  const baseUrl = 'https://localhost:44377/api/alunos'

  const [data, setData] = useState([])

  const getAlunos = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getAlunos()
  })

  return (
    <div className="App">
      <br />
      <h3>Cadastro de alunos</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro" />
        <button className="btn btn-success">Incluir aluno</button>
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
                  <button className="btn btn-primary">Editar</button>
                  <button className="btn btn-danger">Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
