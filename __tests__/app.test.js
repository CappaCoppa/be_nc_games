const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

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
                    })
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
            expect(reviews[0]).toEqual(expect.objectContaining({"category": "euro game", "created_at": "2021-01-18T10:00:20.514Z", "designer": "Uwe Rosenberg", "owner": "mallionaire", "review_body": "Farmyard fun!", "review_id": 1, "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png", "title": "Agricola", "votes": 1}))
        })
    })
    test('/api/reviews/3 checks if returned object has all properties', () => {
        return request(app).get('/api/reviews/3').expect(200).then((res) => {
            const {reviews} = res.body
            expect(reviews.length).toEqual(1)
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
    test("/api/reviews/2 returns an reviews object with new property including total amount of comments with that id", () => {
        return request(app).get("/api/reviews/2").expect(200).then((res) => {
          
            const {reviews} = res.body;
            expect(reviews.length).toEqual(1)
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
                    comments_count : expect.any(Number),
                })
            })
        })
    })



    test("/api/reviews/3/comments return a list of comments with passed in review_id", () => {
        return request(app).get("/api/reviews/3/comments").expect(200).then((res) => {
            const {comments} = res.body;
            expect(comments.length).toEqual(3)
            comments.forEach(comment => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    body: expect.any(String),
                    review_id: expect.any(Number),
                    author: expect.any(String),
                    votes: expect.any(Number),
                    created_at: expect.any(String) 
                })
            })
        })
    })
    test("/api/reviews/99/comments return an err0r 404 with message that such object with this id does not exist", () => {
        return request(app).get("/api/reviews/99/comments").expect(404).then(res => {
            const {msg} = res.body;
            expect(msg).toBe("valid number in path but doesn't match id")
        })
    })

    test("/api/reviews/4/comments Return an empty array because review id is valid but there are no comments with this review_id", () => {
        return request(app).get("/api/reviews/4/comments").expect(200).then(res => {
            const {msg} = res.body;
            expect(msg).toBe("found review but no comments to show")
        })
    })

    test("/api/reviews/rar/comments returns an error 404 with message that such object with this id does not exist", () => {
        return request(app).get("/api/reviews/rar/comments").expect(400).then(res => {
            const {msg} = res.body;
            expect(msg).toBe("something that is not a number as the id in the path")
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
    test("/api/reviews returns all reviews with all properties including comment_count", () => {
        return request(app).get("/api/reviews").expect(200).then((res) => {
            const {reviews} = res.body;
            expect(reviews.length).toEqual(13)
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
                    comments_count : expect.any(Number)
                })
            })
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
            expect(updatedReview.length).toEqual(1)
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
            expect(users.length).toEqual(4)
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
            expect(msg).toBe("not found")
        })
    });
    
});


describe('Comments Post request testing block', () => {
    test("/api/reviews/:review_id/comment returns a posted comment", () => {
        const newComment = {username:'mallionaire', body:"greates game of all time"};
        return request(app).post("/api/reviews/2/comments").send(newComment).expect(201).then((res) => {
            const {comment} = res.body
            expect(comment).toEqual({
                comment_id : expect.any(Number),
                body : "greates game of all time",
                votes : 0,
                author: "mallionaire",
                review_id : 2,
                created_at : expect.any(String)
            })
        })
    })
    test("Status 400 error msg : missing keys", () => {
        return request(app).post("/api/reviews/2/comments").send({}).expect(400).then((res) => {
            const {msg} = res.body
            expect(msg).toBe("body does not contain both mandatory keys")
        })
    })
    test("Status 404 error msg : username does not exist", () => {
        const newComment = {username:'mallioe', body:"greates game of all time"};
        return request(app).post("/api/reviews/2/comments").send(newComment).expect(404).then((res) => {
            const {msg} = res.body
            expect(msg).toBe("user not in the database tries to post")
        })
    })
    test("Status 404 error msg : id valid but does not exists", () => {
        const newComment = {username:'mallionaire', body:"greates game of all time"};
        return request(app).post("/api/reviews/99/comments").send(newComment).expect(404).then((res) => {
            const {msg} = res.body
            expect(msg).toBe("valid number in path but doesn't match id")
        })
    })
    
});

describe('Comments delete request testing block', () => {
    test("Return an empty space after the deletion of the comment with specifi comment_id", () => {
        return request(app).delete("/api/comments/1").expect(204).then((res) => {
            expect(Object.keys(res.body).length).toEqual(0)
        })
    })
    test("Return an 404 error when passed valid number as an ID but out of the range", () => {
        return request(app).delete("/api/comments/99").expect(404).then(res => {
            const {msg} = res.body;
            expect(msg).toEqual("comment_id in path but does not exist")
        })
    })   
    test("Return an 400 error when passed unvalid id", () => {
        return request(app).delete("/api/comments/tom").expect(400).then(res => {
            const {msg} = res.body;
            expect(msg).toEqual("something that is not a number as the id in the path")
        })
    }) 
});