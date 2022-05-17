const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js")

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return db.end()
})

describe('Users get request testing block', () => {
    test('Returns all users object in an array with all properties', () => {
        return request(app).get("/api/users").expect(200).then(res => {
            const {users} = res.body
            users.forEach(user => {
                expect(user).toMatchObject({
                    username : expect.any(String),
                    name : expect.any(String),
                    avatar_url : expect.any(String),
                })
            })
        })
    });
    
});