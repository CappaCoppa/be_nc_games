const request = require('supertest')
const db =  require('../db/connection.js')
const testData = require('../db/data/test-data')
const seed = require('../db/seeds/seed')
const app = require('../app.js')

beforeEach(() => {
    return seed(testData);
})


afterAll(() => {
    return db.end();
})

describe("Categories requests' section", () => {

    test('Return the list of categories with correct properties data types', () => {
        return request(app).get('/api/categories').expect(200).then((res) => {
            const { categories }  = res.body;
            expect(categories.length).toBe(4);
            categories.forEach((category) => {
                expect(category).toMatchObject({
                    slug : expect.any(String),
                    description : expect.any(String)
                    }
                    )
            })
        })
    })
    test("Returns an error 404", () => {
        return request(app).get("/api/tom").expect(404).then((res) => {
            const {msg} = res.body;
            expect(msg).toBe("not found") 
        })
    })
    
})

