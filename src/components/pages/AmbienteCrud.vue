<template>
  <content-app
    icon="door-open"
    title="Gestão de Ambientes"
    subtitle="Página para inserir, alterar e remover salas e laboratórios."
  >
    <h1>Cadastro de Ambientes</h1>
    <hr />
    <div class="form">
      <div class="row">
        <div class="col-12 col-md-9">
          <div class="form-group">
            <label for="nome">Nome do ambiente*</label>
            <input type="text" name="nome" class="form-control" v-model="nome" ref="form-nome" />
            <div class="invalid-feedback">O nome do ambiente não pode ser vazio.</div>
          </div>
        </div>

        <div class="col-12 col-md-3">
          <div class="form-group">
            <label for="lotacao">Lotação máxima*</label>
            <input
              type="number"
              name="lotacao"
              class="form-control"
              v-model="lotacao"
              ref="form-lotacao"
            />
            <div class="invalid-feedback">Valor inválido.</div>
          </div>
        </div>

        <div class="col-12 col-md-12">
          <div class="form-group">
            <label for="descricao">Descricao</label>
            <input
              type="text"
              name="descricao"
              class="form-control"
              v-model="descricao"
              ref="form-descricao"
            />
          </div>
        </div>

        <hr />

        <div class="row col-12 mb-3">
          <div class="col-12 d-flex justify-content-end">
            <button class="btn btn-secondary mr-2" v-on:click="limpaCampos">Cancelar</button>
            <button class="btn btn-primary" v-on:click="criar" v-if="indexEdicao == -1">Cadastrar!</button>
            <button class="btn btn-primary" v-on:click="salvar" v-if="indexEdicao != -1">Salvar!</button>
          </div>
        </div>
        <hr />

        <table class="table">
          <thead>
            <tr>
              <th scope="col" style="width:60%">Nome</th>
              <th scope="col" style="width:20%">Lotacao máxima</th>
              <th scope="col" style="width:10%">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ambiente, index) in list" v-bind:index="index" v-bind:key="ambiente.id">
              <td>{{ambiente.nome}}</td>
              <td >{{ambiente.lotacao}}</td>
              <td class="d-flex justify-content-end">
                <button class="btn btn-warning mx-3" v-on:click="editar"><i class="fa fa-pen"></i></button>
                <button class="btn btn-danger" v-on:click="remover"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </content-app>
</template>

<script>
import Content from "./../template/Content";
import axios from "axios";

export default {
  components: {
    "content-app": Content
  },
  created() {
    axios
      .get("http://localhost:3000/ambientes")
      .then(res => {
        this.list = res.data;
      })
      .catch(e => {
        alert("Não foi possivel carregar as informações dos usuarios.");
        console.log(e);
      });
  },
  data() {
    return {
      nome: "",
      lotacao: "",
      descricao: "",
      list: [],
      indexEdicao: -1 //Index do ambiente que esta sendo editado. -1 para novo ambiente
    };
  },
  methods: {
    salvar(){
      let ambiente = this.list[this.indexEdicao]
      console.log("Index de edicao:" + this.indexEdicao)
      console.log("Index do ambiente: " + ambiente.index)
      if(this.validarCampos()){
        ambiente.nome = this.nome
        ambiente.lotacao = this.lotacao
        ambiente.descricao = this.descricao
        
        axios.put(`http://localhost:3000/ambientes/${ambiente.id}`, ambiente).catch(e => {
          alert("Não foi possivel salvar as informações do ambiente.");
          console.log(e);
        });

        this.limpaCampos()
      }
    },
    criar() {
      if (this.validarCampos()) {
        let ambiente = {
          nome: this.nome,
          lotacao: this.lotacao,
          descricao: this.descricao
        };
        axios.post("http://localhost:3000/ambientes", ambiente).then(res=>{
          ambiente.id = res.data.id
          this.list.unshift(ambiente); //adiciona no começo da lista
          }).catch(e => {
            alert("Não foi possivel salvar as informações do ambiente.");
          console.log(e);
        });
        this.limpaCampos();
      }
    },
    validarCampos() {
      let nomeError = 0;
      let lotacaoError = 0;
      if (this.nome == "") {
        nomeError++;
      }
      if (this.lotacao <= 0) {
        lotacaoError++;
      }
      if (nomeError != 0) {
        this.$refs["form-nome"].classList.add("is-invalid");
        return false;
      }
      if (lotacaoError != 0) {
        this.$refs["form-lotacao"].classList.add("is-invalid");
        return false;
      }
      this.$refs["form-lotacao"].classList.remove("is-invalid");
      this.$refs["form-lotacao"].classList.remove("is-invalid");
      return true;
    },
    limpaCampos() {
      this.nome = "";
      this.lotacao = "";
      this.descricao = "";
      this.indexEdicao = -1;
    },
    obterDadosEvento(event){
      let src = event.srcElement
      if(src.nodeName == "I")  src = src.parentNode //Garante que o src é o botão, e não o icone
      let row = src.parentNode.parentNode
      let index = row.attributes.index.value
      let ambiente = this.list[index]
      ambiente.index = index
      return ambiente
    },
    editar(event){
      let ambiente = this.obterDadosEvento(event)
      this.indexEdicao = ambiente.index
      this.nome = ambiente.nome
      this.descricao = ambiente.descricao
      this.lotacao = ambiente.lotacao
    },
    remover(event){
      let ambiente = this.obterDadosEvento(event)
      let array = this.list
      let index = ambiente.index
      array.splice(index, 1);
      
      axios.delete(`http://localhost:3000/ambientes/${ambiente.id}`).catch(e => {
          alert("Não foi possivel salvar as informações do ambiente.");
          console.log(e);
      });
      
    }
  }
};
</script>

<style>
</style>
