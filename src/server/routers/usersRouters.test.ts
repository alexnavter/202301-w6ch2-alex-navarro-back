import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "..";
import connectDataBase from "../../database/connectDataBase";
import User from "../../database/models/User";
import { type UserCredentials } from "../../types";

let server: MongoMemoryServer;
const url = "/users/login";

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given a POST '/users/login'", () => {
  const mockUser: UserCredentials = {
    username: "victor",
    password: "victor1234",
    email: "alex@gmail.com",
  };

  beforeAll(async () => {
    await User.create(mockUser);
  });

  describe("When it receives a request with the username 'victor'", () => {
    test("Then it should respond with status 200 and the message 'You are logged'", async () => {
      const response = await request(app).post(url).send(mockUser);

      expect(response.body).toHaveProperty("token");
    });
  });
});
