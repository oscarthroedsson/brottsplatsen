import { MongoClient } from "mongodb";
import uri from "./mongoURI.js";

const client = new MongoClient(uri);

const dbName = "BrottsplatsenSE"; // This is static
const collName = "eventData"; // This may be dynamic in the future
const database = client.db(dbName);
const wholeColl = client.db(dbName).collection(collName);

export default wholeColl;
