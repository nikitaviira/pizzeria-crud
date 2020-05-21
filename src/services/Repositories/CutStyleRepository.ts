import BaseRepository from '@/services/BaseRepository';
import ICutStyle from '@/domain/ICutStyle';
import ICutStyleCreate from '@/domain/ICutStyleCreate';

export default class CutStyleRepository extends BaseRepository<ICutStyle, ICutStyleCreate> {
    constructor() {
        super('CutStyle');
    }
}
