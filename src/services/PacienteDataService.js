
import http from "../http-common";

class PacienteDataService {

    async authenticate(data){

        console.log('PacienteDataService.authenticate: ', data);
        const response = await http.post(`/loginpaciente`, data);
        return response;
    }

    async get(cpf){

        console.log('PacienteDataService.get: ', cpf);
        return await http.get('/paciente/'+cpf);
    }

    async list(){

        console.log('PacienteDataService.list: ');
        return await http.get(`/paciente/list/`);
    }

    async delete(cpf){

        console.log('PacienteDataService.delete: ', cpf);
        return await http.get(`/paciente/delete/`+cpf);
    }

    async update(data){

        console.log('PacienteDataService.update: ', data);
        return await http.post(`/paciente/update/`, data);
    }
    
    async create(data){

        console.log('PacienteDataService.create: ', data);
        return await http.post(`/paciente/store/`, data);
    }  

}

export default new PacienteDataService();
