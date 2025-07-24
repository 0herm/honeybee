# HoneyBee
A self-hosted recipe website, where you can share your recipes. Ease of use with tools to edit and add recipes.

**Build With**  
NextJS with TypeScript, React and Tailwind. Database is PostgreSQL.

### ✨ Features
- Overview for new recipes
- Sort by categories
- Search for recipes
- Add and edit recipes

### ⚙️ Environment Variables

| Name              | Notes                                                                                                                            |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------|
| POSTGRES_HOST     | Default to `postgres`, the host for the postgres database                                                                        |
| POSTGRES_PORT     | Default to `5432`, the port for the postgres database                                                                            |
| POSTGRES_USER     | Default to `admin`, the username for the postgres database                                                                       |
| POSTGRES_PASSWORD | Passowrd for the postgres database user                                                                                          |
| POSTGRES_DB       | Default to `honeybee`, the name for the postgres database                                                                        |

### 🐳 Install with Docker
To start the containers run:

~~~ 
docker-compose up --build -d 
~~~ 

Then go to the cashed site: [http://localhost:8080](http://localhost:8080)  

### ℹ️ Information
Change `/public/robots.txt` based on your use case