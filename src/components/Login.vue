<template>
  <div id="tab_aut">
    <h3>Autenticacação</h3>
    <form>
      <div class="form-outline mb-4">
        <label class="form-label" for="input_cpf">CPF:</label>
        <input
          class="form-control"
          type="text"
          v-model="paciente.cpf"
          id="input_cpf"
        />
      </div>

      <div class="form-outline mb-4">
        <label class="form-label" for="input_senha">Senha:</label>
        <input
          class="form-control"
          type="senha"
          v-model="paciente.senha"
          id="input_senha"
        />
      </div>

      <button
        class="btn btn-primary"
        @click="create_paciente_form()"
        type="button"
      >
        Autenticar
      </button>
      <button class="btn btn-primary" @click="clearForm()" type="button">
        Limpar
      </button>
    </form>
  </div>
</template>
<script>
import PacienteDataService from "../services/PacienteDataService";

export default {
  name: "login",
  data() {
    return {
      paciente: { cpf: "", senha: "" }
    };
  },
  methods: {
    create_paciente_form() {
      console.log("chamou o createpacienteForm");

      const j = { cpf: this.paciente.cpf, senha: this.paciente.senha };

      PacienteDataService.authenticate(j)
        .then(response => {
          console.log(
            "Retorno do seviço authenticatepaciente",
            response.status
          );
          if (response.status == 201 || response.status == 200) {
            alert(
              "Bem vindo(a) " + response.data.nome 
            );

            this.setAuthenticated({ cpf: response.data.cpf });

            this.$router.push({ name: "home" });
          } else if (response.status == 204) {
            alert("cpf ou senha inválidos ! ");
          }

          this.clearForm();
        })
        .catch(response => {
          // error callback
          alert("Não conectou no serviço authenticatepaciente " + response);
          // console.log(response);
        });
    },
    clearForm() {
      this.paciente.cpf = "";
      this.paciente.senha = "";
    },
    setAuthenticated(paciente) {
      localStorage.setItem("authUser", JSON.stringify(paciente));
    }
  }
};
</script>

<style scoped></style>