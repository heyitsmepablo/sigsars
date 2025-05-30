export interface DatabaseServiceInterface {
  create(...args): Promise<any>;
  findOne(id: any, ...args): Promise<any>;
  findAll(...args): Promise<any>;
  updateOne(id, ...args): Promise<any>;
  delete(id): Promise<any>;
}
