# 📸 Instagram Clone

[![CI](https://img.shields.io/github/workflow/status/kentayamada-dev/instagram-clone/CI?label=CI&logo=GitHub)](https://github.com/kentayamada-dev/instagram-clone/actions/workflows/ci.yml)
[![Website](https://img.shields.io/website?label=Website&logo=Vercel&url=https%3A%2F%2Fapp.instagram-clone.net)](https://app.instagram-clone.net/)
[![API](https://img.shields.io/website?label=API&logo=Heroku&url=https%3A%2F%2Fapi.instagram-clone.net)](https://api.instagram-clone.net/)

## 🔗 Links

### 🥳 [Website](https://app.instagram-clone.net/)

### 📓 [Storybook](https://app.instagram-clone.net/storybook/)

### 🚀 [API](https://api.instagram-clone.net/)

### 📈 [Build Analytics](https:&#x2F;&#x2F;github.com&#x2F;kentayamada-dev&#x2F;instagram-clone&#x2F;actions&#x2F;runs&#x2F;2968653747)

### 📧 <a href="mailto:user@support@instagram-clone.net">support@instagram-clone.net</a>

## ⚡ Playgrounds

[![Open in Gitpod](https://user-images.githubusercontent.com/83388735/186300755-062f9256-aeaa-42d1-b42c-50bdb7b728ed.svg)](https://gitpod.io/#https://github.com/kentayamada-dev/instagram-clone)
[![Open in VS Code](https://user-images.githubusercontent.com/83388735/186300430-2a29e2aa-6bcb-42f2-a8d4-2a3b61aa3c67.svg)](https://vscode.dev/github/kentayamada-dev/instagram-clone)

## 🛠️ Tech Stack

- Frontend

  - React (Next.js)
  - Storybook
  - Atomic Design
  - Fully Responsive
  - Chakra UI
  - SWR
  - TypeScript
  - Light/Dark Modes
  - Internationalized Routing
  - Cypress
  - reg-suit

- Backend

  - Node.js (NestJS)
  - Apollo
  - Prisma
  - TypeScript
  - GraphQL
  - Helmet
  - CORS
  - Rate Limiting
  - Jest

- Auth

  - Cookie
  - Passport
  - JWT
  - Password hashing (bcrypt)

- DB

  - PostgreSQL
  - Cloudinary
  - Relational Database

- Misc
  - Monorepo (Turborepo)
  - husky
  - lint-staged
  - ESLint
  - GraphQL Code Generator
  - Prettier
  - CSpell
  - CI/CD (GitHub Actions)

## 💾 ERD

| Diagram                                                                     | Notation                                                                      |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| <img src="apps/backend/prisma/erd/diagram.svg" width="500px" alt="diagram"> | <img src="apps/backend/prisma/erd/notation.png" width="500px" alt="notation"> |

<!--
```mermaid
%%{init: {'theme':'neutral', 'themeVariables': { 'textColor': '#11999E', 'nodeTextColor':'#AA96DA', 'tertiaryColor':'transparent'}}}%%
erDiagram

  User {
    String id
    String name
    String email
    String imageUrl
    String password
    DateTime createdAt
    DateTime updatedAt
    }


  Post {
    String id PK
    String caption  "nullable"
    String imageUrl
    DateTime createdAt
    DateTime updatedAt
    }


  Follow {
    String id PK
    DateTime createdAt
    DateTime updatedAt
    }


  Like {
    String id PK
    DateTime createdAt
    DateTime updatedAt
    }

    Post o{--|| User : "user"
    Follow o{--|| User : "followedUser"
    Follow o{--|| User : "followingUser"
    Like o{--|| User : "user"
    Like o{--|| Post : "post"
```
-->
