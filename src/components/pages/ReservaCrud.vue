<template>
  <content-app
    icon="calendar-day"
    title="Gestão de Ambientes"
    subtitle="Página para inserir, alterar e remover reservas."
  >
    <h1>Cadastro de usuários</h1>
    <hr />
    <div class="form">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="codigo">Usuário*</label>
            <select class="form-control" ref="form-user" v-model="user">
              <option v-for="user in users" v-bind:key="user.id">{{user.nome}} -- {{user.codigo}}</option>
              </select>
            <div class="invalid-feedback">Código invalido.</div>
          </div>
        </div>
        <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="ambiente">Ambiente*</label>
            <select class="form-control" ref="form-ambiente" v-model="ambiente">
              <option v-for="ambiente in ambientes" v-bind:key="ambiente.id">{{ambiente.nome}} -- {{ambiente.codigo}}</option>
              </select>
            <div class="invalid-feedback">Código invalido.</div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="datepicker">Data*</label>
            <datepicker class="datepicker" placeholder="__/__/____"></datepicker>
          </div>
        </div>
        <hr />

        <div class="row col-12 mb-3">
          <div class="col-12 d-flex justify-content-end">
            <button class="btn btn-secondary mr-2" v-on:click="limpaCampos">Cancelar</button>
            <button class="btn btn-primary" v-on:click="criarUsuario" v-if="indexEdicao == -1">Cadastrar!</button>
            <button class="btn btn-primary" v-on:click="salvarUsuario" v-if="indexEdicao != -1">Salvar!</button>
          </div>
        </div>
        <hr />

        <table class="table">
          <thead>
            <tr>
              <th scope="col" style="width:60%">Nome</th>
              <th scope="col" style="width:20%">Código</th>
              <th scope="col" style="width:10%">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in list" v-bind:index="index" v-bind:key="usuario.id">
              <td>{{usuario.nome}}</td>
              <td >{{usuario.codigo}}</td>
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
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";


export default {

  components: {
    "content-app": Content,
    Datepicker
  },
  created() {
    axios
      .get("http://localhost:3000/usuarios")
      .then(res => {
        this.users = res.data;
      })
      .catch(e => {
        alert("Não foi possivel carregar as informações dos usuarios.");
        console.log(e);
      });
    axios
      .get("http://localhost:3000/ambientes")
      .then(res => {
        // this.list = res.data;
      })
      .catch(e => {
        alert("Não foi possivel carregar as informações dos ambientes.");
        console.log(e);
      });
  },
  data() {
    return {
      nome: "",
      codigo: "",
      list: [],
      users: [],
      user:"",
      ambientes: [],
      ambiente:"",
      indexEdicao: -1 //Index do usuario que esta sendo editado. -1 para novo usuario
    };
  },
  methods: {
    salvarUsuario(){
      let user = this.list[this.indexEdicao]
      console.log(user)
      if(this.validarCampos()){
        let index = this.indexEdicao
        let user = this.list[index]
        user.nome = this.nome
        user.codigo = this.codigo
        axios.put(`http://localhost:3000/usuarios/${user.id}`, user).catch(e => {
          alert("Não foi possivel salvar as informações do usuario.");
          console.log(e);
        });

        this.limpaCampos()
      }
    },
    criarUsuario() {
      if (this.validarCampos()) {
        let user = {
          nome: this.nome,
          codigo: this.codigo
        };
        this.list.unshift(user); //adiciona no começo da lista
        axios.post("http://localhost:3000/usuarios", user).catch(e => {
          alert("Não foi possivel salvar as informações do usuario.");
          console.log(e);
        });
        this.limpaCampos();
      }
    },
    validarCampos() {
      let nomeError = 0;
      let codigoError = 0;
      if (this.nome == "") {
        nomeError++;
      }
      if (this.codigo == "") {
        codigoError++;
      }
        let bind_This = this;
        this.list.forEach(function(usuario) {
          if (usuario.codigo == bind_This.codigo)
            if(bind_This.indexEdicao == -1){ //Esta fora do modo de edição
              codigoError++;
            }else{ //Modo de edição
              if(bind_This.list[bind_This.indexEdicao].codigo != usuario.codigo)
                codigoError++;
            }
        });
      if (codigoError != 0) {
        this.$refs["form-codigo"].classList.add("is-invalid");
        return false;
      }
      if (nomeError != 0) {
        this.$refs["form-nome"].classList.add("is-invalid");
        return false;
      }
      this.$refs["form-codigo"].classList.remove("is-invalid");
      this.$refs["form-codigo"].classList.remove("is-invalid");
      return true;
    },
    limpaCampos() {
      this.nome = "";
      this.codigo = "";
      this.indexEdicao = -1;
    },
    obterDadosEvento(event){
      let src = event.srcElement
      if(src.nodeName == "I")  src = src.parentNode //Garante que o src é o botão, e não o icone
      let row = src.parentNode.parentNode
      let index = row.attributes.index.value
      let user = this.list[index]
      user.index = index
      return user
    },
    editar(event){
      let usuario = this.obterDadosEvento(event)
      this.indexEdicao = usuario.index
      this.nome = usuario.nome
      this.codigo = usuario.codigo
    },
    remover(event){
      let usuario = this.obterDadosEvento(event)
      let array = this.list
      let index = usuario.index
      array.splice(index, 1);
      
      axios.delete(`http://localhost:3000/usuarios/${usuario.id}`).catch(e => {
          alert("Não foi possivel salvar as informações do usuario.");
          console.log(e);
      });
      
    }
  }
};
</script>

<style>

#datepicker{
    display: block;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color:#fff;
    background-clip: padding-box;
    border: 1px solid#ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>
