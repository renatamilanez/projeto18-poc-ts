# projeto18-poc-ts

Proof of concept for TypeScript.

<h2>About</h2>

This project is a Back-End API for a movie organizer with which you can add to a wishlist the movies you want to watch and rate those you've already watched.

<h2>How to run for development</h2>

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a local database using the `dump.sql` file
4. Configure the `.env` file using the `.env.example`
5. Run the back-end application using the command `npx nodemon src/index.ts`

<h2>How to test the routes</h2>

1. Open the ThunderClient, Imsonia or your preferrable extesion to test routes.
2. First, you need to sign-up:
  • POST:`/signup`
    Body: {
      "name": "John",
      "email": "john@test.com",
      "password": "123456",
      "confirmPassword": "123456"
      }
    
3. Then, you need to sign-in:
  • POST: `/signin`
    Body: {
      "email": "john@test.com",
      "password": "123456"
      }
    
4. After your logged in, you can access all routes from the API:
    *All routes must be accessed using the following Headers, where token is the token received in the sign-in*
    Headers: {
    Authorization: Bearer token
    }
    
  1. GET: `/movies`
  2. GET: `/movies/:movieId`
  3. GET: `/movies/plataform/:plataformId`
    *Where "plataformId" is the id number from the plataform you want to know the movies available"
  4. POST: `/movies`
    Body: {
      "name": "Shrek",
      "plataform": "Netflix",
      "genre": "Animation"
    }
  • POST: `/wishlist/:movieId`
      *Where "movieId" is the id number from the movie you want to add to the wishlist"*
      
  • GET: `/wishlist`
  
  • PUT: `/wishlist/:movieId`
      *Where "movieId" is the id number from the movie you want to mark as "Watched" and want to rate and/or add a review"*
      Body: {
        "status": "Watched",
        "comments": "This is a great movie!",
        "rating": 8
      }
      *Comments and rating are not mandatory*
      
  • DELETE: `/wishlist/:movieId`
    *Where "movieId" is the id number from the movie you want to remove from your wishlist*
