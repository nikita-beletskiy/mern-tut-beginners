# mern-tut-beginners

#### Project that just shows simple deployment workflow.

To deploy this project I use Heroku for backend and Netlify for frontend. Both platforms take a source code right from GitHub, no special deployment processes are used.

1. To deploy backend on Heroku I used [this repo](https://github.com/timanovsky/subdir-heroku-buildpack) as a first buildpack to be able to deploy from a subfolder, and also set **PROJECT_PATH** config var equal to **server**, as this is the actual subfolder with server code. The second buildpack is a standart **heroku/nodejs**. As a database I use MongoDB (free tier) and store its URI in a special config var as well.
2. To deploy frontend on Netlify I just configure there base and publish directories and a build command.
