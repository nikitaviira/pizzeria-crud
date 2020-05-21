import BaseRepository from '@/services/BaseRepository';
import ICrust from '@/domain/ICrust';
import ICrustCreate from '@/domain/ICrustCreate';

export default class CrustRepository extends BaseRepository<ICrust, ICrustCreate> {
    constructor() {
        super('Crust');
    }
}
