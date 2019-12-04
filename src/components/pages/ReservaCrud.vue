<template>
  <content-app
    icon="door-open"
    title="Gestão de Reservas"
    subtitle="Página para inserir, alterar e remover reservas."
  >
    <h1>Cadastro de Reservas</h1>
    <hr />
    <div class="form">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="nome">Usuário*</label>
            <select class="form-control" ref="form-usuario" v-model="usuario">
              <option
                v-for="usuario in usuarios"
                v-bind:key="usuario.id"
                v-bind:id="usuario.id"
              >{{usuario.nome}} -- {{usuario.codigo}}</option>
            </select>
            <div class="invalid-feedback">Defina um usuário.</div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="nome">Ambiente*</label>
            <select class="form-control" ref="form-ambiente" v-model="ambiente">
              <option
                v-for="ambiente in ambientes"
                v-bind:key="ambiente.id"
                v-bind:id="ambiente.id"
              >{{ambiente.nome}} -- {{ambiente.descricao.substr(0,10)}}</option>
            </select>
            <div class="invalid-feedback">Defina um ambiente.</div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="nome">Data*</label>
            <datepicker v-model="data" name="uniquename" ref="form-data" id="form-data"></datepicker>
            <div class="invalid-feedback">Defina uma data para o agendamento.</div>
          </div>
        </div>

        <div class="col-6 col-md-3">
          <div class="form-group">
            <label for="nome">Horário de inicio*</label>
            <timeselector class="form-control" v-model="timeInicio" id="form-timeInicio"></timeselector>
            <div class="invalid-feedback">Defina um horário.</div>
          </div>
        </div>

        <div class="col-6 col-md-3">
          <div class="form-group">
            <label for="nome">Horário de término*</label>
            <timeselector
              class="form-control"
              v-model="timeFinal"
              id="form-timeFinal"
            ></timeselector>
            <div class="invalid-feedback">{{timeFinalError}}</div>
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
              <td>{{ambiente.lotacao}}</td>
              <td class="d-flex justify-content-end">
                <button class="btn btn-warning mx-3" v-on:click="editar">
                  <i class="fa fa-pen"></i>
                </button>
                <button class="btn btn-danger" v-on:click="remover">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </content-app>
</template>

<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import Timeselector from "vue-timeselector";
import Content from "./../template/Content";
import axios from "axios";

export default {
  components: {
    "content-app": Content,
    Timeselector,
    Datepicker
  },
  created() {
    axios
      .get("http://localhost:3000/ambientes")
      .then(res => {
        this.ambientes = res.data;
      })
      .catch(e => {
        alert("Não foi possivel carregar as informações dos ambientes.");
        console.log(e);
    });
    axios
      .get("http://localhost:3000/usuarios")
      .then(res => {
        this.usuarios = res.data;
      })
      .catch(e => {
        alert("Não foi possivel carregar as informações dos usuarios.");
        console.log(e);
    });
  },
  mounted(){
    const dataForm = document.getElementById('form-data')
    dataForm.classList.add("form-control")
  },
  data() {
    return {
      list: [],
      usuarios: [],
      usuario: "",
      ambientes:[],
      ambiente:"",
      data: null,
      timeInicio: null,
      timeFinal: null,
      timeFinalError: "Defina um horário.",
      indexEdicao: -1 //Index do ambiente que esta sendo editado. -1 para novo ambiente
    };
  },
  methods: {
    overlap(x1, x2, y1, y2){
      console.log(`x1: ${new Date(x1)}; y1: ${new Date(y1)}; x2: ${new Date(x2)}; y2: ${new Date(y2)}; `)
      let isOverlap = (Math.max(x1,y1) <= Math.min(x2,y2))
      console.log(isOverlap)
      return isOverlap
    },
    ajustarHorario(data, horario){
      horario.setDate(data.getDate())
      horario.setYear(data.getFullYear())
      horario.setMonth(data.getMonth())
    },
    gerarVetor(minimo, maximo, intervalo){
      let array = []
      for(i = minimo; i <= maximo; i+= intervalo){
        array.push(i)
      }
      return array
    },
    salvar(){
      let ambiente = this.list[this.indexEdicao]
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
    getUsuarioSelecionadoId(){
      return this.$refs["form-usuario"].options[this.$refs["form-usuario"].options.selectedIndex].id;
    },
    getAmbienteSelecionadoId(){
      return this.$refs["form-usuario"].options[this.$refs["form-usuario"].options.selectedIndex].id;
    },
    criar() {
      let usuarioSelecionadoId = this.getUsuarioSelecionadoId()
      let ambienteSelecionadoId = this.getAmbienteSelecionadoId()
      if (this.validarCampos()) {
        //let timeInicioValue = Object.assign({}, this.timeInicio) //Feito isso pois estava atribuindo a referencia
        //let timeFinalValue = JSON.parse(JSON.stringify(this.timeFinal))
        //let timeFinal = this.timeFinal + ""
        //let timeInicio = this.timeInicio + ""
        console.dir(this.timeInicio)
        let reserva = {
          usuario: usuarioSelecionadoId,
          ambiente: ambienteSelecionadoId,
          timeInicio: new Date(this.timeInicio),
          timeFinal: new Date(this.timeFinal)
        };
        //return;
        axios.post("http://localhost:3000/reservas", reserva).then(res=>{
          reserva.id = res.data.id
          this.list.unshift(reserva); //adiciona no começo da lista
          }).catch(e => {
            alert("Não foi possivel salvar as informações da reserva.");
          console.log(e);
        });
        this.limpaCampos();
      }
    },
    validarCampos() {
      if (this.usuario == "") {
        this.$refs["form-usuario"].classList.add("is-invalid");
        return false
      }
      this.$refs["form-usuario"].classList.remove("is-invalid");

      if (this.ambiente == "") {
        this.$refs["form-ambiente"].classList.add("is-invalid");
        return false
      }
      this.$refs["form-ambiente"].classList.remove("is-invalid");
      if (this.data == null) {
        document.getElementById("form-data").classList.add("is-invalid");
        return false
      }
      document.getElementById("form-data").classList.remove("is-invalid");
      

      if (this.timeInicio == null) {
        document.getElementById("form-timeInicio").parentNode.classList.add("is-invalid");
        return false
      }
      document.getElementById("form-timeInicio").parentNode.classList.remove("is-invalid");

      if (this.timeFinal == null) {
        document.getElementById("form-timeFinal").parentNode.classList.add("is-invalid");
        this.timeFinalError = "Defina um horário."
        return false
      }
      document.getElementById("form-timeFinal").parentNode.classList.remove("is-invalid");
      
      this.ajustarHorario(this.data, this.timeInicio)
      this.ajustarHorario(this.data, this.timeFinal)

      if(this.timeFinal.getTime() <= this.timeInicio.getTime()){
        document.getElementById("form-timeFinal").parentNode.classList.add("is-invalid");
        this.timeFinalError = "Duração de reserva inválida."
        return false
      }
      document.getElementById("form-timeFinal").parentNode.classList.remove("is-invalid");

      let timeInicio = this.timeInicio
      let timeFinal = this.timeFinal
      let usuarioSelecionadoId = this.getUsuarioSelecionadoId()
      let ambienteSelecionadoId = this.getAmbienteSelecionadoId()

      let emUso = false;
      this.list.forEach(evento => {
        if(evento.ambiente == ambienteSelecionadoId){
          console.log(evento.timeInicio)
          if(this.overlap(evento.timeInicio.getTime(), evento.timeFinal.getTime(), timeInicio.getTime(), timeFinal.getTime())){
            document.getElementById("form-timeFinal").parentNode.classList.add("is-invalid");
            this.timeFinalError = "Este ambiente já esta reservado nesse horário."
            console.log("Em uso")
            emUso = true;
            return false
          }
        }
        document.getElementById("form-timeFinal").parentNode.classList.remove("is-invalid");
      }, this)
      if(emUso == true) return false;

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
.vtimeselector__input {
  border: 0;
}
</style>
