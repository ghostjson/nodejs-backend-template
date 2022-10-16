import { AxiosInstance } from 'axios';
import { Database } from './../../database/couchdb';
import { Demo } from './demo.model';

export class DemoService {
  private db: AxiosInstance = Database.getConection();

  async createDemo(demo: Demo): Promise<Demo> {
    return await this.db.put(`/demo/${demo.name}`, demo);
  }

  async getDemos(): Promise<any> {
    const response = await this.db.get(`/demo/_all_docs`);
    return response.data.rows;
  }
}
