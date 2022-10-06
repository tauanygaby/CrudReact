import Axios from "axios";
import React, { useState } from "react";
import Main from "../template/Main";
import "./CrudCursos.css";

const title = "Cadastro de Cursos";

const urlAPI = "http://localhost:5196/api/cursos";

export default function CrudCursos() {
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [codCurso, setCodCurso] = useState();
  const [periodo, setPeriodo] = useState();

  const [lista, setLista] = useState([]);

  const cursos = {id, nome, codCurso, periodo};

  const componentDidMount = () => {
    Axios(urlAPI).then(resp => {
      setLista({lista: resp.data});
    });
  };

  const limpar = () => {
    setId(0);
    setNome("");
    setCodCurso("");
    setPeriodo("");
  };

  const getListaAtualizada = (curso, add = true) => {
    const lista = lista.filter(a => a.id !== curso.id);
    if (add) lista.unshift(curso);
    return lista;
  };

  const carregar = curso => {
    setId(curso.id);
    setNome(curso.nome);
    setCodCurso(curso.codCurso);
    setPeriodo(curso.periodo);
  };

  const remover = curso => {
    const url = urlAPI + "/" + curso.id;
    if (window.confirm("Confirma remoção do curso: " + curso.id)) {
      console.log("entrou no confirm");
      Axios["delete"](url, curso).then(resp => {
        const lista = getListaAtualizada(resp.data);
        setId(curso.id);
        setCodCurso(curso.codCurso);
        setNome(curso.nome);
        setPeriodo(curso.periodo);
        setLista(lista);
      });
    }
  };

  const salvar = () => {
    const curso = cursos;
    curso.codCurso = Number(curso.codCurso);
    const metodo = curso.id ? "put" : "post";
    const url = curso.id ? `${urlAPI}/${curso.id}` : urlAPI;
    Axios[metodo](url, curso).then(resp => {
      const lista = getListaAtualizada(resp.data);
      setId(curso.id);
      setCodCurso(curso.codCurso);
      setNome(curso.nome);
      setPeriodo(curso.periodo);
      setLista(lista);
    });
    console.log(curso);
  };

  return (
    <Main title={title}>
      <div>
        <div className="inclui-container">
          <label> Código do Curso: </label>
          <input
            type="number"
            id="codCurso"
            placeholder="0"
            className="form-input"
            name="codCurso"
            value={codCurso}
            onChange={e => setCodCurso(e.target.value)}
          />
          <label> Nome: </label>
          <input
            type="text"
            id="nome"
            placeholder="Nome do curso"
            className="form-input"
            name="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <label> Período </label>
          <input
            type="text"
            id="periodo"
            placeholder="0"
            className="form-input"
            name="periodo"
            value={periodo}
            onChange={e => setPeriodo(e.target.value)}
          />
          <button className="btnSalvar" onClick={salvar}>
            Salvar
          </button>
          <button className="btnCancelar" onClick={limpar}>
            Cancelar
          </button>
        </div>
        <div className="listagem">
          <table className="listaCursos" id="tblListaAlunos">
            <thead>
              <tr className="cabecTabela">
                <th className="tabTituloCodCurso">codCurso</th>
                <th className="tabTituloNome">Nome</th>
                <th className="tabTituloCurso">Período</th>
              </tr>
            </thead>
            <tbody>
              {lista.map(curso => (
                <tr key={curso.id}>
                  <td>{curso.codCurso}</td>
                  <td>{curso.nome}</td>
                  <td>{curso.periodo}</td>
                  <td>
                    <button onClick={() => carregar(curso)}>Altera</button>
                  </td>
                  <td>
                    <button onClick={() => remover(curso)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Main>
  );
}
