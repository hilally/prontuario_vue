
import http from "../http-common";

class DiarioDataService {



    async get(cpf){

        console.log('DiarioDataService.get: ', cpf);
        return await http.get('/diario/'+cpf);
    }

    async list(){

        console.log('DiarioDataService.list: ');
        return await http.get(`/diario/list/`);
    }

    async delete(cpf){

        console.log('DiarioDataService.delete: ', cpf);
        return await http.get(`/diario/delete/`+cpf);
    }

    async update(data){

        console.log('DiarioDataService.update: ', data);
        return await http.post(`/diario/update/`, data);
    }
    
    async create(data){

        console.log('DiarioDataService.create: ', data);
        return await http.post(`/diario/insert/`, data);
    }  

}

export default new DiarioDataService();
