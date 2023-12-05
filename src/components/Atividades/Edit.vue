<template>
    <div id="tab_aut">
      <div v-if="currentAtividade" class="edit-form">
        <h3>Atividade</h3>
        <form>
          <div class="form-group">
            <label for="inputFisica">Fisica:</label>
        <input type="text" v-model="atividade.fisica" class="form-control" id="inputFisica"/>
        <label for="inputMental">Mental:</label>
        <input type="text" v-model="atividade.mental" class="form-control" id="inputMental"/>
        <label for="inputAcademica">Academica:</label>
        <input type="text" v-model="atividade.academica" class="form-control" id="inputAtividade"/>
        <label for="inputSocial">Social:</label>
        <input type="text" v-model="atividade.social" class="form-control" id="inputSocial"/>
          </div>
          <div class="form-group">
            <label for="selectAutor">Atividades:</label>
            <select
              v-model="currentAtividade.Atividades"
              class="form-control"
              id="selectAutor"
              multiple
            >
              <option v-for="a in Atividades" :key="a.codigo" v-bind:value="a">
                {{ a.nome }}
              </option>
            </select>
          </div>
        </form>
        <button class="badge badge-success" @click="updateAtividade">Salvar</button>
        <!-- <button class="badge badge-danger mr-2" @click="deleteAtividade">
          Delete
        </button> -->
        <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>
  
        <p>{{ message }}</p>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Atividade...</p>
      </div>
    </div>
  </template>
  <script>
  import AtividadeDataService from "../../services/AtividadeDataService";
  import AtividadeDataService from "../../services/AtividadeDataService";
  
  export default {
    name: "editAtividade",
    data() {
      return {
        currentAtividade: null,
        message: "",
        Atividades: []
      };
    },
    methods: {
      getAtividade(id) {
        AtividadeDataService.get(id)
          .then(response => {
            this.currentAtividade = response.data;
            console.log(this.currentAtividade);
          })
          .catch(e => {
            console.log(e);
          });
      },
      listAtividades() {
        AtividadeDataService.list()
          .then(response => {
            console.log(
              "Retorno do seviço AtividadeDataService.list",
              response.status
            );
           
            this.Atividades = response.data;
          })
          .catch(response => {
            // error callback
            alert("Não conectou no serviço AtividadeDataService.list");
            console.log(response);
          });
  
          console.log(this.Atividades);
          console.log("chegou");
      },
      updateAtividade() {
        AtividadeDataService.update(this.currentAtividade)
          .then(response => {
            console.log("AtividadeDataService.update");
            this.message = "Atividade alterado com sucesso !";
          })
          .catch(e => {
            console.log(e);
          });
      },
      // deleteAtividade() {
      //   AtividadeDataService.delete(this.currentTutorial.nome)
      //     .then(response => {
      //       console.log(response.data);
      //       this.$router.push({ name: "Atividades-list" });
      //     })
      //     .catch(e => {
      //       console.log(e);
      //     });
      // },
      // voltar() {
      //   this.$router.push({ name: "Atividades-list" });
      // }
      voltar() {
        const targetRoute = { name: "atividades-list" }; // Supondo que a rota seja "Atividades-list"
        if (
          this.$route.name !== targetRoute.name ||
          JSON.stringify(this.$route.params) !== JSON.stringify(targetRoute.params)
        ) {
          this.$router.push(targetRoute);
        }
      }
    },
    mounted() {
      this.message = "";
      this.getAtividade(this.$route.params.id);
      this.listatividade()
    }
  };
  </script>
  
  <style scoped>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>