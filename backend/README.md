# Image Processing API
A studying project made for a Udacity.com Nanodegree advanced web development course.
## long story short
domain:port/api/images/imageFile.jpg?width=value1&height=value2

## To Run the project

### Clone or download the project
clone the project from github, or download it to your local device or machine.

### Install Dependencies
you have to run `npm install` to install all the dependencies  & dev-dependencies of the project

### Running scripts in the terminal
`npm run build` for compiling Typescript ES2018 into javascript es5 in build folder
`npm run start` for running the express server from the compiled project
`npm run dev` automatic compiling and restarting the server after any save in the *.ts files
`npm run lint` for running eslint according to configuration files in configuration folder
`npm run prettier` for running prettier according to configuration files in configuration folder
`npm run test` for running jasmine specs (tests) in the spec folder

### Domain
you should find the project running on your local host http://localhost:5000/

### API endpoint
/api/images/imageNameParam?width=value&height=value

### No or wrong extensions will return the default image
/api/images/fjord.jpg will respond with the default jpg image
/api/images/fjord.png will respond with the default jpg image
/api/images/fjord.aaa will respond with the default jpg image
/api/images/fjord     will respond with the default jpg image

### If only width or height supplied will considered a square image
/api/images/fjord.jpg?width=200 will respond with 200x200fjord.jpg

### if requested width & height are not already cashed it uses sharp to create and cash the new size, then respond with it



