# To-Do-List
This is a To-Do List application that allows the user to create multiple to-do lists and add, delete, or modify tasks for each list. It is built using Node.js and Express.js for the backend and MongoDB for the database.

The application has the following functionalities:
- Create a new to-do list by adding the list name in the URL
- Add new items to a to-do list
- Delete items from a to-do list
- View all items in a to-do list
- View all lists created by the user

The application uses EJS as the view engine and Bootstrap for styling. It also uses the npm packages "body-parser" for parsing the request body, "date" for getting the current date, lodash for correct URL working and "mongoose" for connecting to the MongoDB database.

The application starts a server on port 3000 and listens for incoming requests. When the user navigates to the homepage ("/"), the application retrieves all the items in the database and displays them on the page. If there are no items in the database, it inserts some default items and displays them.

When the user navigates to a custom list ("/:customListName"), the application retrieves all the items in that list and displays them on the page. If the list does not exist, it creates a new list with the given name and displays the default items.

When the user submits a new item, the application adds the item to the appropriate list in the database and redirects the user to the same page. When the user deletes an item, the application removes the item from the appropriate list in the database and redirects the user to the same page.

The application also has an "about" page that gives a brief description of the application.

It has been developed with ❤️ by Vidit.
