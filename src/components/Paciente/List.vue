<template>
    <div id="tab_aut">
      <div class="col-md-6">
        <h4>Listagem de Pacientes</h4>
        <table class="table table-striped">
          <tr>
            <th scope="col">cpf</th>
            <th scope="col">nome</th>
            <th scope="col">senha</th>
            <th scope="col">data_nasc</th>
            <th scope="col">telefone</th>
            <th scope="col">medicação</th>
            <th scope="col">profissão</th>
          </tr>
          <tbody>
            <tr v-for="(p, indice) in paciente" :key="p.cpf" :class="{ active: indice == currentIndex }">
              <td>{{ p.cpf }}</td>
              <td>{{ p.senha }}</td>
              <td>{{ p.data_nasc }}</td>
              <td>{{ p.telefone }}</td>
              <td>{{ p.medicacao }}</td>
              <td>{{ p.profissao }}</td>
              <td>
                <button v-on:click="setCurrenPaciente(p, cpf)" class="btn" type="button">Alterar</button>
              </td>
              <td>
                <button v-on:click="remPaciente(a, cpf)" class="btn" type="button">Remover</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="col-md-6">
        <div v-if="currenPaciente">
          <h4> Pacientes</h4>
          <div>
            <label><strong>cpf:</strong></label> {{ currenPaciente.cpf }}
          </div>
          <div>
            <label><strong>Nome</strong></label>{{ currenPaciente.nome }}
          </div>
          <div>
            <label><strong>data_nasc</strong></label>{{ currenPaciente.data_nasc }}
          </div>
          <div>
            <label><strong>telefone</strong></label>{{ currenPaciente.medicacao }}
          </div>
          <div>
            <label><strong>medicação</strong></label>{{ currenPaciente.nome }}
          </div>
          <div>
            <label><strong>profissao</strong></label>{{ currenPaciente.profissao }}
          </div>
  
          <a
            class="badge badge-warning"
            :href="'paciente/update/' + currenPaciente.cpf">
            Edit
          </a>
        </div>
        <div v-else>
          <br />
          <p>Please click on a book...</p>
          <router-link to="/addpaciente" class="badge badge-success">Novo</router-link
          >
        </div>
      </div>
    </div>
  </template>
  <script>
  import PacienteDataService from "../../services/PacienteDataService";
  
  export default {
    name: "listPacientes",
    data() {
      return {
    Paciente: [],
        currenPaciente: null,
        currentIndex: -1
      };
    },
    methods: {
      listaPaciente() {
    PacienteDataService.list()
          .then(response => {
            console.log("Retorno do seviço authenticatPaciente", response.status);
  
            this.paciente = response.data;
          })
          .catch(response => {
            // error callback
            alert("Não conectou no serviço listaPaciente");
            console.log(response);
          });
      },
      setCurrenPaciente(paciente, index) {
        this.currenPaciente = Paciente;
        this.currentIndex = index;
      },
      remPaciente(paciente, index) {
    PacienteDataService.delete(paciente.cpf)
            .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      refreshList() {
        this.listaPaciente();
        this.currentTutorial = null;
        this.currentIndex = -1;
      }
    },
    mounted() {
      this.listaPaciente();
    }
  };
  </script>
  
  <style scoped>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>