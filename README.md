# HoneyBee
A self-hosted recipe website, where you can share your recipes. Ease of use with tools to edit and add recipes.

**Build With**  
NextJS with TypeScript, React and Tailwind. Database is SQLite.

### ✨ Features
- Overview for new recipes
- Sort by categories
- Search for recipes
- Add and edit recipes

### ⚙️ Environment Variables

| Name                  | Notes                                                                                                                            |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------|
| GITHUB_WEBHOOK_SECRET | API token for automated deploy with Github                                                                                       |
| API_TOKEN             | Secret for the POST API to the datebase (changes coming)                                                                         |

### 🐳 Install with Docker
Remember to set the environment variables you wish in the .env file. ( minimum `API_TOKEN` ) 
To start the containers run:

~~~ 
docker-compose up -d 
~~~ 

Then go to the cashed site: [http://localhost:8080](http://localhost:8080)  

### ⚠️ Warning
Still under work and there will be breaking changes