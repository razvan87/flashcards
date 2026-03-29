React + TypeScript Homework
Mini Project: “Profile Card”
Objective
The goal of this homework is to practice the React and TypeScript basics we learned in class:

creating a project with Vite

understanding the file and folder structure

creating and importing a component

writing JSX

passing props

using useState

handling simple click events

You will build a small page that displays a profile card with a few interactive buttons.

Task
Create a React + TypeScript project using Vite.

Inside the project, build a small app that shows one profile card for an imaginary person.

The profile card should display:

name

job title

favorite technology

Example:

Name: Paul Negoescu
Job title: Junior Frontend Developer
Favorite technology: React

You have an attached image to show you what is supposed to happen, feel free to make some changes if you want.

Requirements
1. Project setup
Create the project using Vite with React + TypeScript.

Clean up the default template so your app only contains the code needed for this homework.

2. Create a component
Create a component called ProfileCard.

This component should be placed in its own file and folder and then imported into App.tsx.

3. Use props
The ProfileCard component should receive the following props:

name

jobTitle

favoriteTech

Use these props to display the information inside the card.

4. Add interactivity with useState
Inside the ProfileCard component, add a small interactive feature using useState.

Add a button called:

Show more

When the button is clicked, display an extra sentence such as:

“I am excited to learn more about React and TypeScript.”

You can also change the button text to:

Show less

and hide the sentence when the button is clicked again.

This means the button should toggle the extra text on and off.

Hint
You need to set the state variable to either true or false when a user clicks the show more or the show less button. You can do this with only one button an toggle the text on the button as well.

Now inside the component you can have a variable that depending on whether the state is true or not contains the text "I am excited ..." or not. Display this variable in the JSX.

You can also do this with css display: none if you want and make use of the variable.

5. Add one more button
Add another button called:

Like

Each time the user clicks it, increase a number shown on the screen. The button should containa thumbs up

Example:

Likes: 0

After clicking the button:

Likes: 1

Use useState for this as well.

Suggested Structure
 
src
 |─ features
 |      └─Profile
 │               └─ ProfileCard.tsx
 │               └─ ProfileCard.module.css
 |─ App.tsx
 |─ main.tsx
 
What the page should include
Your page should have:

a title in App.tsx

the ProfileCard component displayed below the title

CSS for the ProfileCard, scoped via CSS modules to it
one imaginary profile passed through props

a button that shows/hides extra text

a button that increases likes

Example idea
Your profile card might look like this:

Name: Paul Negoescu
Job title: Junior Frontend Developer
Favorite technology: React

[Show more]
[Like]

Likes: 0

When the user clicks Show more, extra text appears.

When the user clicks Like, the number increases.

Bonus (Optional)
If you want, you can also:

add a third button such as Reset likes

What to submit
Please submit your project as a Git repository.

It should run correctly with:

 
npm install
npm run dev
 
Evaluation criteria
Your homework will be checked for:

correct project setup with Vite
correct use of components
correct use of css modules
correct use of props
correct use of useState
correct use of click event handlers
clean and readable code