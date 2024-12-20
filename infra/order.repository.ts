import { Client, ID, Databases } from "react-native-appwrite";
import Config from "./config";
import { OperationType, Order } from "../app/dtos/Order";
import { account } from "./user.repository";

const client = new Client();

client
  .setEndpoint(Config.appWrite.endpoint)
  .setProject(Config.appWrite.projectId)
  .setPlatform(Config.appWrite.platform);

const databases = new Databases(client);

export default {
  async placeOrder(order: Order) {
    order.userId = (await account.get()).$id;

    await databases.createDocument(
      Config.appWrite.databaseId,
      Config.appWrite.ordersCollectionId,
      ID.unique(),
      {
        ...order,
        operationType: order.operationType.toString()
      }
    )
  },

  async getOrdersByUser(userId: string) {
    
  }
}
