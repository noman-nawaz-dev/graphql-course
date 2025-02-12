import { DatabaseManager } from "../database/DatabaseManager";

export class BaseService {
  protected static get db() {
    return DatabaseManager.getInstance().getConnection();
  }
}
