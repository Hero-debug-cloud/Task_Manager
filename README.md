# Deployed Link

[Task Management](https://task-manager-git-main-herodebugclouds-projects.vercel.app/)

# Tech Stack Used
-> Frontend : NextJs </br>
-> Backend : NodeJs ExpressJs MongoDB

# Get Started

To run No Code locally, just run the following commands to install the dependencies and run the app locally. <br/><br/>
-> Install Dependencies <br/>

```
git init
git clone  "https://github.com/Hero-debug-cloud/Task_Manager.git"
cd client
npm install
cd server
npm install
```

-> Add MongoDB Link

1. cd server
2. Create .env file
3. Add Variabe <Br/>
   MONGO_LINK= YOUR_MONGO_LINK <Br/>

-> Run on your local system

```
cd client
npm run dev
cd server
npm run devStart
```

# Design choices

-> Kept as simple as it can be in the frontend;

- easy to read all tasks
- easy to add new task
- easy to update existing task
- easy to delete existing task

# Challenges Faced

-> Avoiding again again api calling when creating new task or updating or deleting existing task;

# Future Improvement

-> Each User session seperation (ability to login and signup ) using JWT token; <br/>
-> Collaboration between users; <br/>
-> Task Card move from one place to another (ability to move card anywhere in the screen); <br/>
-> Move from free server to aws in amplify and ec2 instance to increase api response time; <br/>
-> UI Improvement as right now its very basic;
