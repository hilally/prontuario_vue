<template>
  <div class="submit-form">
    <div v-if="!submitted">
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
        <label for="selectDiario">diario:</label>
        <select
          v-model="atividade.diario"
          class="form-control"
          id="selectLivro"
          multiple
        >
          <option v-for="d in diario" :key="d.codigo" v-bind:value="l">
            {{ d.diario }}
          </option>
        </select>
      </div>

      <button @click="saveAtividade" class="btn btn-success">Salvar</button>
      <router-link to="/atividades" class="btn btn-success">Voltar</router-link>
    </div>

    <div v-else>
      <h4>Dados enviados com sucesso !</h4>
      <button class="btn btn-success" @click="newAtividade">Novo</button>
      <router-link to="/atividades" class="btn btn-success">Voltar</router-link>
    </div>
  </div>
</template>

<script>
import AtividadeDataService from "../../services/AtividadeDataService";
import DiarioDataService from "../../services/DiarioDataService";

export default {
  name: "addatividade",
  data() {
    return {
      atividade: {
        indice: "",
        Fisica: "",
        Mental: "",
        Academica: "",
        Social: "",
        diario: []
      },
      submitted: false,
      diario: []
    };
  },
  methods: {
    saveAtividade() {
      var est = jQuery.extend({}, this.atividade); //clona o this.novo_estante e armazena na variavel atividade. dessa forma alteracoes em this.novo_estantenao irao refletir em jogador.
      if (est.nome.trim().length > 0) {
        //Testa se o nome do item é maior que 0
        AtividadeDataService.create(est) // cria o item
          .then(response => {
            this.submitted = true; // testa se foi cadastrado
            console.log("item cadastrado");
          })
          .catch(e => {
            alert("Erro ao tentar cadastrar. !!! " + e.message);
          });
      } else {
        alert("Formulário incompleto !!!");
      }
    },
    newAtividade() {
      this.submitted = false;
      this.atividade = {};
    },
    listdiario() {
      DiarioDataService.list()
        .then(response => {
          console.log(
            "Retorno do seviço DiarioDataService.list",
            response.status
          );
          for (let j of response.data) {
            this.diario.push(j);
          }
        })
        .catch(response => {
          // error callback
          alert("Não conectou no serviço DiarioDataService.list");
          console.log(response);
        });
    }
  },
  mounted() {
    this.listdiario();
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>