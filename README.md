# eCommerce-Application

The [eCommerce Application](https://starlit-rabanadas-510a4b.netlify.app/login) is an application for the [RSSchool](https://rs.school/) final task of 2023Q1 stage#2.
Done in eager to match latest Front-end technologies alongside with pursue of learning [Commerce Tools](https://commercetools.com/) while following the goal of creating awesome design.

## Design Layout

[Design](paste link here) Layout with UIKit and responsive versions for tablet and mobile.

## Tech Stack

![js](./public/assets/tech-stack-images/js.png)
![ts](./public/assets/tech-stack-images/ts.png)
![react](./public/assets/tech-stack-images/react.png)
![redux](./public/assets/tech-stack-images/redux.png)
![webpack](./public/assets/tech-stack-images/webpack.png)
![eslint](./public/assets/tech-stack-images/eslint.png)
![prettier](./public/assets/tech-stack-images/prettier.png)
![jest](./public/assets/tech-stack-images/jest.png)
![husky](./public/assets/tech-stack-images/husky.png)
![html](./public/assets/tech-stack-images/html.png)
![css](./public/assets/tech-stack-images/css.png)
![scss](./public/assets/tech-stack-images/scss.png)
![normalize](./public/assets/tech-stack-images/modern-normalize.png)
![node](./public/assets/tech-stack-images/node.png)
![git](./public/assets/tech-stack-images/git.png)
![github](./public/assets/tech-stack-images/github.png)
![ecommerce tools](./public/assets/tech-stack-images/ecommerce_tools.png)
![fsd](./public/assets/tech-stack-images/fsd_architecture.png)
![figma](./public/assets/tech-stack-images/figma.png)

## Project's Purposes

Create during `Four Sprints` fully functional `eCommerce Application` with every Sprints' tasks done to the fullest and in time.

Project should have astonishing / just incredibly beautiful and mesmerizing real art design with good UI and UX... kinda eyes popping 👀, jaw dropping 👄, heart stopping 💖.

Gonna keep healthy atmoshpere and good mood of all teams' members and our server's allies while working in close collaboration with each other, also hosting daily meetups, doesn't matter what difficulties with the task we'll meet on the way.

Deeply in the core of the project should create consistent code base, following principles of SRP, DRY, KISS.

Also appear in the Top works with this our final project after voting at the end of the course.

## Project's Structure

### Folders Structure

<details><summary>public</summary>

- assets (pics, icons, backgrounds, design references etc.)
- favicon
- fonts
</details>

<details><summary>src</summary>

- App (One ring to rule them all, One ring to find them, One ring to bring them all ©Lord of the Rings)
<details><summary>components</summary>

- Card
- Catalog
- Header
- Footer
- shared (reused code e.g. Buttons, Inputs etc.)
</details>
<details><summary>pages</summary>

- Main
- Products
- Product
- Auth
- Registration
</details>

- store
- hooks
- data (product's config, arrays of sounds etc.)
- types (types, enums, interfaces)
- constants (base url, error messages codes etc.)
- utils (just helpful functions, not particularly dedicated to one of the layers)
- style (global with imports)
- index.html
- main.tsx
</details>
<p></p>

---

**NB**:

1. naming

- `branches` names are in kebab-case and have prefix of assigner name (i.e. red-awesome-branch, yana-wow-branch, cherry-kinda-branch etc.)
- names of **components** creating **visual** part of application (so called silly) are in `PascalCase` as well as their files' and folders' names (e.g. Main, Card, Auth, App etc.)
- all other folders and files, except components' ones, are in `kebab-case` (e.g. awesome-folder, cool-new-file etc.)
- classic clever functions exposing **behaviour** are in `camelCase` and start with verb (e.g. makeMyDay)
- **const** and **let** variables are in `camelCase` (e.g. niceNewThing)

2. .scss file for each .tsx file and one global .scss file with imports

3. .scss files have names mirroring corresponding .tsx files' names

4. using [modern-normalize](https://github.com/sindresorhus/modern-normalize) with scss modules alongside with scss nesting where it's necessary in components

5. workflow's based on functions and hooks

8. separated **logic** (business logic / data control) and the app's **UI** (how the app looks like / appearance)

9. architecture idea is based on FSD (Feature Sliced Design) and Component Apporach

## Commands

### npm run start
Runs the app in the development mode opening it in browser.<br />
Open [https://localhost:3001](https://localhost:3001)

### npm run build-prod
Builds the app for production to the `dist` folder.

### npm run test
Launches the application test runner one time.

### npm run test-watch
Launches the test runner in the interactive watch mode.

### npm run clear
Deletes the `dist` folder after deploy.

### npm run lint
Launches ESLint checking the repository for errors.

### npm run lint:fix
Launches ESLint fixing all found errors.

### npm run stylelint
ESLint checks all the style files fixing alongside all the found errors.

### npm run format
Launches Prettier and fixes all the found errors in the working directory.

### npm run prepare
Checks all the files for errors before commit.

## Authors

![trinity](./public/assets/github-pics/trinity.png)

[![craftsw0man](./public/assets/github-pics/github_pic_tashenka.png)](https://github.com/CRAFTSW0MAN/)
[![yanabel1996](./public/assets/github-pics/github_pic_yanabel1996.png)](https://github.com/yanabel1996)
[![lyutails](./public/assets/github-pics/github_pic_lyutails.png)](https://github.com/lyutails)
