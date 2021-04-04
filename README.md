![alt text](https://i.imgur.com/7u1FB5i.png)

JWT Register Login

this project was made with ReactJS and NodeJS (TypeScript) these modules were considered during development:

PD: I will not include the modules related to typescript, I will only say the modules that depend completely on the development for the user visualization

NodeJS (Backend)

<ul>
    <li>Express (Initialization server and routes)</li>
    <li>MySQL (Database)</li>
    <li>Cors (this enables other servers to make requests to the backend without problems)</li>
    <li>BcryptJS (encrypt user password or anything and save that in the database)</li>
    <li>JWT (To be able to authenticate the user and start browsing the website)</li>
</ul>

ReactJS (Frontend)

<ul>
    <li>React-router-dom (Create multiple pages)</li>
    <li>Axios (To make requests to the backend)</li>
</ul>

How to use?

clone or download this project and install all dependecies/devDependencies with npm i (both folder).

open file "server/databases/mysql.ts" and put your databases datas, then open in the same folder "tableAccounts.sql" and copy/paste that in your MySQL Database. *before you need to create a database before paste that*.

Finally go to "server" and execute the project with "npm run build && npm start" or "npm run dev" after go to "client" folder and write "npm start" and with all this the servers should work
