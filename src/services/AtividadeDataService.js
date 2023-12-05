
import http from "../http-common";

class AtividadeDataService {


    async get(id){

        console.log('AtividadeDataService.get: ', id);
        return await http.get('/atividade/'+id);
    }

    async list(){

        console.log('AtividadeDataService.list: ');
        return await http.get(`/atividades/list`);
    }

    async delete(nome){

        console.log('AtividadeDataService.delete: ', nome);
        return await http.delete(`/atividade/delete/`+nome);
    }

    async update(data){

        console.log('AtividadeDataService.update: ', data);
        return await http.put(`/atividade/update/:id`, data);
    }
    
    async create(data){

        console.log('AtividadeDataService.create: ', data);
        return await http.post(`/atividade/store`, data);

    }  

}
export default new AtividadeDataService();