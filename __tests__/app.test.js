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
            expect(msg).toBe("something that is not a number as the id in the path")
        })
    })
    
});


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
    test("Check if object contains all their properties", () => {
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
            expect(msg).toBe("user passed something that is not a number in inc_votes");
        })
    })
    test("Returns an error when passed an empty field for inc_votes",()=>{
        return request(app).patch("/api/reviews/3").send().expect(400).then((res) => {
            const {msg} = res.body
            expect(msg).toBe("No object was passed to the request");
        })
    })

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
    test('Returns an error when passed wrong endpoint', () => {
        return request(app).get("/api/use").expect(404).then(res => {
            const {msg} = res.body
            console.log(msg)
            expect(msg).toBe("not found")
        })
    });
    
});

