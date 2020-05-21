import BaseRepository from '@/services/BaseRepository';
import IPizzaSize from '@/domain/IPizzaSize';
import IPizzaSizeCreate from '@/domain/IPizzaSizeCreate';

export default class PizzaSizeRepository extends BaseRepository<IPizzaSize, IPizzaSizeCreate> {
    constructor() {
        super('PizzaSize');
    }
}
