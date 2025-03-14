# Holy Hack - repo team ChatGPTAbusers

Welcome to our amazing project 😎. We made a quiz website where you can guess the trajectories of each of your stocks. For now there are 2 types of questions, either you guess the company based on its graph or vice versa. 🥖

The project is split up in front- and back-end. 🚀

## 🖥️ Front-end

The front-end is written in NextJS (React).

### Pages

- Home: this page is useless. 🤯
- Login & register: here you can access your account. 🔐
- Quiz: this is our main page, in here you can play the quiz, see your score and learn about your stocks. 🧠
- Stocks: this is an overview of your owned stocks, you can also update them here. 📈

## 💾 Back-end

The back-end is a REST API writen in ASP.NET with Entity Framework. It can easily be expanded to fit more requirements in the future. ⚙️

Our back-end makes use of the Yahoo Finance API. We use this to access live stock-market data. 🔥

We use JWT authentication to secure our application and connect users to their stocks. 🔑

We use Swagger-UI to test and document our endpoints. 🔄️

## 🐿️ Database

For the database we use PostgreSQL. we have 2 tables: users and stocks. These are connected by a one-to-many relationship. 🐘