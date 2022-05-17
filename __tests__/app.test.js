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

    test('Return the list of categories with correct value data types', () => {
        return request(app).get('/api/categories').expect(200).then((res) => {
            const { categories }  = res.body;
            categories.forEach((category) => {
                expect(category).toMatchObject({
                    slug : expect.any(String),
                    description : expect.any(String)
                    }
                    )
            })
        })
    })
    test('Categories object must only have 2 object keys', () => {
        return request(app).get('/api/categories').expect(200).then((res) => {
            const { categories } = res.body;
            categories.forEach(category => {
                expect(Object.keys(category).length).toBe(2)
            })
        })
    })
    test.only("Returns an 404 error when data is not found at the wrong query /api/cars ", () => {
        return request(app).get("/api/categoriess").expect(404).then((res) => {
            const { msg } = res.body
            expect(msg).toBe("Not found")
        })
    })
    
})

