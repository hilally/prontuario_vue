<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="inputNome">Nome:</label>
        <input
          type="text"
          v-model="livro.nome"
          class="form-control"
          id="inputNome"
        />
      </div>
      <div class="form-group">
        <label for="selectAutor">Autores:</label>
        <select
          v-model="livro.autor"
          class="form-control"
          id="selectAutor"
          multiple
        >
          <option v-for="a in autores" :key="a.codigo" v-bind:value="a">
            {{ a.nome }}
          </option>
        </select>
      </div>

      <button @click="saveLivro" class="btn btn-success">Salvar</button>
      <router-link to="/livro" class="btn btn-success">Voltar</router-link>
    </div>

    <div v-else>
      <h4>Dados enviados com sucesso !</h4>
      <button class="btn btn-success" @click="newLivro">Novo</button>
      <router-link to="/livro" class="btn btn-success">Voltar</router-link>
    </div>
  </div>
</template>

<script>
import LivroDataService from "../../services/LivroDataService";
import AutorDataService from "../../services/AutorDataService";

export default {
  name: "addLivro",
  data() {
    return {
      livro: {
        indice: "",
        nickname: "",
        autor: []
      },
      submitted: false,
      autores: []
    };
  },
  methods: {
    saveLivro() {
    
      var liv = jQuery.extend({}, this.livro); //clona o this.novo_livro e armazena na variavel livro. dessa forma alteracoes em this.novo_livronao irao refletir em jogador.
      console.log(this.livro);
      if (liv.nome.trim().length > 0) {
        LivroDataService.create(liv) // cria o item
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
    newLivro() {
      this.submitted = false;
      this.livro = {};
    },
    listAutores() {
      AutorDataService.list()
        .then(response => {
          console.log(
            "Retorno do seviço AutorDataService.list",
            response.status
          );
          for (let j of response.data) {
            this.autores.push(j);
          }
        })
        .catch(response => {
          // error callback
          alert("Não conectou no serviço AutorDataService.list");
          console.log(response);
        });
    }
  },
  mounted() {
    this.listAutores();
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>