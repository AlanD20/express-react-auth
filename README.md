## Express/React/MySQL Web Application

#### [Link To Demonstration Video](videos/demo.mp4)
#### [LIVE Client-Side Demo](https://t4-webapp-client.herokuapp.com/)
#### [LIVE Server-Side Demo](https://t4-webapp-server.herokuapp.com/)


Stacks: 
- JavaScript/TypeScript
- React
- Node.js
- Express
- MySQL

#### Application Instructions:
- Create a Web application with registration and authentication.
- Non-authenticated users should not have access to the user management (admin panel).
- Authenticated users should have access the user management table: id, name, e-mail, last login time, registration time, status (active/blocked).
- The left column of the table should contains checkboxes without labels for multiple selection (table header contains “Select All” checkbox without label).
- There must be a toolbar over the table with the flooring actions: Block (red button with text), Unblock (icon), Delete (icon).
- You have to use a CSS framework (Bootstrap is recommended, but you can choose any CSS framework).
- Every users should be able to block or delete yourself or any other user.
- If user account is blocked or deleted any next user’s request should redirect to the login page.
- User can use any non-empty password (even one character).
- Blocked user should not be able to login, deleted user can re-register.


## License
This repository is under [MIT LICENSE](LICENSE)
