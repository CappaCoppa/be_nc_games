const request = require("supertest");
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed');
const app = require("../app.js")
const testData = require('../db/data/test-data/index.js')

beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    return db.end()
})

describe('Reviews  get request test block', () => {
    test('/api/reviews/1 returns an single object by reviews_id', () => {
        return request(app).get('/api/reviews/1').expect(200).then((res) => {
            const {reviews} = res.body
            expect(reviews[0]).toEqual({"category": "euro game", "created_at": "2021-01-18T10:00:20.514Z", "designer": "Uwe Rosenberg", "owner": "mallionaire", "review_body": "Farmyard fun!", "review_id": 1, "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png", "title": "Agricola", "votes": 1})
        })
    })
    test('/api/reviews/3 checks if returned object has all properties', () => {
        return request(app).get('/api/reviews/3').expect(200).then((res) => {
            const {reviews} = res.body
            reviews.forEach(review => {
                expect(review).toMatchObject({
                    review_id : expect.any(Number),
                    title : expect.any(String),
                    review_body : expect.any(String),
                    designer : expect.any(String),
                    review_img_url : expect.any(String),
                    votes : expect.any(Number),
                    category : expect.any(String),
                    owner : expect.any(String),
                    created_at : expect.any(String),
                })
            })
        })
    })
    test("/api/reviews/999 returns an error 404 with message that such object with this id does not exist", () =>{
        return request(app).get('/api/reviews/999').expect(404).then((res) => {
            const {msg} = res.body;
            expect(msg).toBe("Valid number but no reviews with that id");
        })
    })
    test("/api/reviews/tom returns an error 400 with incorrect data type of id", () => {
        return request(app).get("/api/reviews/tom").expect(400).then((res) => {
            const {msg} = res.body
            expect(msg).toBe("something that is not a number passed as id")
        })
    })
    
});

