export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract get(id: string): Promise<T | null>;

  abstract create(item: T): Promise<T | null>;

  abstract update(id: string, item: Partial<T>): any;
}
