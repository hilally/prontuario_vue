<template>
    <div id="tab_aut">
      <div class="col-md-6">
        <h4>Listagem de atividade</h4>
        <table class="table table-striped">
          <tr>
            <th scope="col">Fisica</th>
            <th scope="col">Mental</th>
            <th scope="col">Social</th>
            <th scope="col">Academica</th>


            <th scope="col">Alterar</th>
            <th scope="col">Remover</th>
          </tr>
          <tbody>
            <tr v-for="(a, indice) in atividade" :key="a.id" :class="{ active: indice == currentIndex }">
              <td>{{ a.fisica }}</td>
              <td>{{ a.mental }}</td>
              <td>{{ a.social }}</td>
              <td>{{ a.academica }}</td>
              <td>
                <button v-on:click="setCurrentAtividade(a, indice)" class="btn" type="button">Alterar</button>
              </td>
              <td>
                <button v-on:click="rematividade(a, indice)" class="btn" type="button">Remover</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="col-md-6">
        <div v-if="currentAtividade">
          <h4>Atividades</h4>
        
          <div>
            <label><strong>Fisica</strong></label> {{ currentAtividade.fisica }}
            <div>
            <label><strong>Mental</strong></label> {{ currentAtividade.mental }}
          </div>
          <div>
            <label><strong>Academica</strong></label> {{ currentAtividade.academica }}
          </div>
          <div>
            <label><strong>Social</strong></label> {{ currentAtividade.social }}
          </div>
          </div>
          <div>
            <label><strong>Livros</strong></label> {{ currentAtividade.livros[0].nome }}
          </div>
          <div></div>
  
          <a
            class="badge badge-warning"
            :href="'/atividades/update/' + currentAtividade.id"
          >
            Edit
          </a>
        </div>
        <div v-else>
          <br />
          <p>Please click on a book...</p>
          <router-link to="/addatividade" class="badge badge-success"
            >Novo</router-link
          >
        </div>
      </div>
    </div>
  </template>
  <script>
  import AtividadeDataService from "../../services/AtividadeDataService";
  
  export default {
    name: "listAtividades",
    data() {
      return {
        atividade: [],
        currentAtividade: null,
        currentIndex: -1
      };
    },
    methods: {
      listaratividade() {
        AtividadeDataService.list()
          .then(response => {
            console.log("Retorno do seviço authenticateatividade", response.status);
  
            this.atividade = response.data;
          })
          .catch(response => {
            // error callback
            alert("Não conectou no serviço listatividade");
            console.log(response);
          });
      },
      setCurrentAtividade(atividade, index) {
        this.currentAtividade = atividade;
        this.currentIndex = index;
        console.log(atividade);
      },
      rematividade(atividade) {
        AtividadeDataService.delete(atividade.id)
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      refreshList() {
        this.listaratividade();
        this.currentTutorial = null;
        this.currentIndex = -1;
      }
    },
    mounted() {
      this.listaratividade();
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