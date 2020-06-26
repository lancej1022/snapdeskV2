## Snapdesk

_A (work in progress) application that promotes mentoring between seniors and juniors in your organization._

### Built With 🔧

- TypeScript
- React
- Next.js
- CSS-in-JS (Styled Components)
- GraphQL (Apollo)
- Node.js (Apollo-Express)
- PostgresQL

### Features 📝

- Allow users to sign up and login with custom credentials or GitHub OAuth ✅
- (To Do) Allow users to be a part of specific organizations/teams ❌
- Allow authenticated users to view a ticket portal ✅
- Allow authenticated users to post a new support ticket ✅
- (To Do) Allow authenticated users to accept or resolve open tickets ❌
- (To Do) Use a leaderboard to showcase users that have resolved large #s of tickets ❌
- (To Do) Allow authenticated users to chat with each other within the app if they're working on a ticket together. ❌

### About 🗣

The idea behind SnapDesk is this: people in your organization have questions, and others with more experience can answer them. Nothing revolutionary, right? But what if you had tangible numbers / analytics showing you which members of your organization were dedicating more time to helping other members of your team? Seems like the type of thing that one would want to know when consider which employees deserve raises and promotions. That is ultimately what SnapDesk would attempt to address.

When a user is stuck or unsure, they can post a ticket. And when another user helps them with that ticket, they can assign a feedback rating based on various factors (difficulty of the question, thoroughness of the answer, etc). From there, SnapDesk keeps a running score associated with each user and displays users that receive good marks in the Leaderboard.

That app is more of an idea than anything about this point, and is far from completed (although it does have a decent amount of code that you're welcome to check out). I started building SnapDesk after leaving DrawQL to help fill my free time during my job hunt, but now that I've found a new role it may be quite a long time before SnapDesk is a fully functioning app.

### Usage 💡

```
git clone https://github.com/lancej1022/snapdeskV2.git
cd next-client && npm run dev
cd ../server
--INSERT YOUR OWN .env FILE WITH DATABASE CONNECTION LINKS--
npm run dev
```

And then visit localhost:3000!
