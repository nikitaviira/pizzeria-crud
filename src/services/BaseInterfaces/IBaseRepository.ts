import { AxiosResponse } from 'axios';

export default interface IBaseRepository<T, U, Z> {
    getAll(): Promise<AxiosResponse<T[]>>;
    find(id: string): Promise<AxiosResponse<T>>;
    create(entity: U): Promise<AxiosResponse>;
    update(entity: Z, id: string): Promise<AxiosResponse>;
    remove(id: string): Promise<AxiosResponse>;
}
