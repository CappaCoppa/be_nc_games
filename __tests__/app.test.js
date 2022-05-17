const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed")

beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    return db.end()
}) 

describe('Reviews patch request test block', () => {
    test("Return an object with update votes count", () => {
        return request(app).patch("/api/reviews/2").send({inc_votes : 100}).expect(200).then((res) => {
            const {updatedReview} = res.body
            expect(updatedReview[0]).toEqual({
                review_id: 2,
                title: 'Jenga',
                category: 'dexterity',
                designer: 'Leslie Scott',
                owner: 'philippaclaire9',
                review_body: 'Fiddly fun for all the family',
                review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                created_at: '2021-01-18T10:01:41.251Z',
                votes: 105
              })
         })
         
    })
    test("Check if vates property value is not less than 0 after update ", () => {
        return request(app).patch("/api/reviews/4").send({inc_votes : -1000}).expect(200).then((res) => {
            const {updatedReview} = res.body
            expect(updatedReview[0]).toMatchObject({
                votes: 0,
            })
         })
         
    })
    test("Check if object contains all they properties", () => {
        return request(app).patch("/api/reviews/2").send({inc_votes : 100}).expect(200).then((res) => {
            const {updatedReview} = res.body;
            updatedReview.forEach(review => {
                expect(review).toMatchObject({
                review_id: expect.any(Number),
                title: expect.any(String),
                category: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_body: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number)
                })
                
            })
            
         })
         
    })
    test("Returns an error when passed a number for an id that does not exist",()=>{
        return request(app).patch("/api/reviews/99").send({inc_votes : 10}).expect(404).then((res) => {
            const {msg} = res.body
            expect(msg).toBe("valid id in path but doesn't match review");
        })
    
    })
    test("Returns an error when passed an invalid data type for id",()=>{
        return request(app).patch("/api/reviews/tod").send({inc_votes : 10}).expect(400).then((res) => {
            const {msg} = res.body
            expect(msg).toBe("something that is not a number as the id in the path");
        })
    })
    test("Returns an error when passed an invalid data type for inc_votes",()=>{
        return request(app).patch("/api/reviews/3").send({inc_votes : "Tom"}).expect(400).then((res) => {
            const {msg} = res.body
            expect(msg).toBe("user passed something that is not a number im inc_votes");
        })
    })
    

})