# FlyNgo
## _the travel planning_

![Build Status](https://img.shields.io/badge/build-complete-greenbranch=master)

FlyNgo is a website that helps users schedule their travel and organize activities during this time.

## Technologies used

### backend

* TypeScript
* Prisma
* Fastify
* Dayjs
* Zod 
* Nodemailer
* Node

### frontend

* TypeScript
* Vite
* TailwindCSS
* PostCSS
* Axios
* Node

### environment

Editor development: VScode

Database: SQLite

## If you want to use this application

The first step is follow commands in `Ìnstallation` and then `Development`

### Installation

You need to clone and acess bash this repository in your pc. Then in your bash put this command for install DevDependences:
```bash
C:\Users\YourDirectory\..\FlyNgo\backend> npm install
``` 
And repeat it in the frontend part

### Development

For run this project, you need to open 2 bashes, 1 for backend and other for frontend.
The fisrt thing to do is change if necessary, in the backend, the file ```.env```

```TypeScript
DATABASE_URL="file:./dev.db" /* no change */
API_BASE_URL="http://localhost:3333" /* no change */
WEB_BASE_URL="http://localhost:5173" /* change the number to your frontend address */
PORT="3333" /* no change */
```

After that, you can place the following command in both the backend and frontend: 

```bash
C:\Users\YourDirectory\..\FlyNgo\backend> npm run dev
```

## Notes
In this project, i decided to create a travel planning website, because i wanted learn more about to React with TypeScript through basic database-aligned post, put, delete, get themes.

In the middle way, i had worry about frontend part, so i learn about **_Tailwind_** and **_PostCSS_** to make a interface quickly.

Indeed, i noticed i need to build responsive websites for more accessibility

*Published: 07/20/2024*

## Author
### **Fernando Cruz Cavina**

### [MyLinkedln](www.linkedin.com/in/fernando-cruz-cavina-487563303)
