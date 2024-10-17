export interface DeleteAreaRepository {
    call(id: string): Promise<void>;
}