export interface UseCase<Model> {
  post(...args: any[]): Promise<Model>;
  getAll(): Promise<Model[]>;
  update(...args: any[]): Promise<Model | string>;
  getOne(id: string): Promise<Model | null | string>;
}
