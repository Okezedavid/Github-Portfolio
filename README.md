*SETUP

I set up the project using Vite, deleted unwanted files, and created new folders and files that I needed for the app which included a component folder that contained the navbar of the site and then a Pages folder that contained all the various pages
   I created the Navbar component first and rendered it in the App component because it was easy to code and was the one component that will cut across all pages.



To apply CSS and implement the design I had in mind, I put placeholder data for each repository in the Home component.


*THE API FETCH

I made an API call to my Github Repo(https://api.github.com/users/Okezedavid/repos).I wrote a function called fetchRepos to get data from my GitHub repos API and then saved it in a state called user which I initialized as an empty array.The dependency array was initially empty till I implemented pagination.
   I then mapped over the data that has been fetched and saved in user to be able to render individual repositories.


*THE PAGINATION

To implement pagination, the fetchRepos function and useEffect needs to be updated. In the fetchRepos function, the URL that gets the data from GitHub needs to include parameters that will fetch a number of pages per render. A new state needs to be created to track the number of pages to be rendered. I named this new state currentPage. I also created another state called showViewMore which renders subsequent pages when clicked. I initialized it as a string that will contain the words "View More" and "End of Repos" depending on whether the data from the API has been exhausted. I created a function called viewMore that updated the currentPage state by 1 and called it on a <p> element that contained the value of showViewMore. Now useEffect will also be updated to have currentPage in the dependency array so that the application re-renders after every change in the currentPage state.


*ROUTING AND ERROR PAGES

To be able to create another page that shows single a repo with more details, the react-router-dom needs to be used. I used the createBrowserRouter because the documentation recommends it for all React router web projects. In the main.jsx file which contains the code that renders the app, I created the router variable which will contain the route and paths to the various pages including an error page.

I implemented the error page using useRouteError from the react-router-dom. in a component I named errorPage. In order to implement nested routes like it was required in the project question, I rendered the Outlet component also from the reac-router-dom in a file I named AppOutlet which made it possible to render details in the single repo pages according to their ids(which I will explain later).

To link to other pages from one component to the other, I used the <Link to=""/> element, from the react-router-dom which acts just like an anchor tag <a href=""> in regular HTML.


*VIEWING A SINGLE REPO

Like I did with the list of repos, I created placeholder data to help me style what a single repo will look like on render. And then I made API calls for single repositories by destructuring id from useParams from the react-router-dom and then using it in the API call URL. The useParams hook returns an object that contains the id of each child from the parent URL.

Remember from the main.jsx file, :id was passed as a path for the Repodetails component. Meaning each id holds a unique value (in this case the repo name) which will be added to the URL that calls a single repository's API. I saved the data from single repositories in state and named it details.

In my design, I wanted to display the live site of each repo if it was available and also the number of branches the repo had so I made other API calls that returned deployment and branch information which I saved in state as objects and named deployment and branch respectively. I made all of these API calls in individual useEffect hooks.


*Styling
I used vanilla css to do most part of the styling


And finally, I used react-social-icons and embeded my social media profile links to them.






