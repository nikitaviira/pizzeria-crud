import BaseRepository from '@/services/BaseRepository';
import IPizza from '@/domain/IPizza';
import IPizzaCreate from '@/domain/IPizzaCreate';
import IPizzaEdit from '@/domain/IPizzaEdit';

export default class PizzaRepository extends BaseRepository<IPizza, IPizzaCreate, IPizzaEdit> {
    constructor() {
        super('Pizza');
    }
}
