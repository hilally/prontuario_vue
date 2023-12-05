<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="inputFisica">Nome:</label>
          <input type="text" v-model="Paciente.fisica" class="form-control" id="inputFisica"/>
          <label for="inputMental">Cpf:</label>
          <input type="text" v-model="Paciente.mental" class="form-control" id="inputMental"/>
          <label for="inputAcademica">Medicação:</label>
          <input type="text" v-model="Paciente.academica" class="form-control" id="inputPaciente"/>
          <label for="inputSocial">Profissão:</label>
          <input type="text" v-model="Paciente.social" class="form-control" id="inputSocial"/>
        </div>
        
  
        <button @click="savePaciente" class="btn btn-success">Salvar</button>
        <router-link to="/pacientes" class="btn btn-success">Voltar</router-link>
      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newPaciente">Novo</button>
        <router-link to="/pacientes" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import PacienteDataService from "../../services/PacienteDataService";
  import DiarioDataService from "../../services/DiarioDataService";
  
  export default {
    name: "addpaciente",
    data() {
      return {
        Paciente: {
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
        savePaciente() {
    // Clona o objeto this.Paciente para evitar alterações indesejadas
    var pacienteClone = { ...this.Paciente };

    if (pacienteClone.fisica.trim().length > 0) {
      // Testa se o nome do item é maior que 0
      PacienteDataService.create(pacienteClone) // cria o item
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
      newPaciente() {
        this.submitted = false;
        this.Paciente = {};
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