import Repository from '@/services/EntityAPI';
import { AxiosResponse } from 'axios';
import IBaseRepository from '@/services/BaseInterfaces/IBaseRepository';

export default abstract class BaseRepository<T, U, Z = T> implements IBaseRepository<T, U, Z> {

    private readonly resources: string;

    protected constructor(resources: string) {
        this.resources = resources;
    }

    public getAll(): Promise<AxiosResponse<T[]>> {
        return Repository().get(this.resources);
    }

    public find(id: string): Promise<AxiosResponse<T>> {
        return Repository().get(`${this.resources}/${id}`);
    }

    public create(entity: U): Promise<AxiosResponse> {
        return Repository().post(this.resources, entity);
    }

    public update(entity: Z, id: string): Promise<AxiosResponse> {
        return Repository().put(`${this.resources}/${id}`, entity);
    }

    public remove(id: string): Promise<AxiosResponse> {
        return Repository().delete(`${this.resources}/${id}`);
    }
}
