# 🚀 IC Reactor Todo Template

A modern, production-ready Todo application built on the **Internet Computer** using [IC Reactor](https://ic-reactor.dev) and React.

![ICP](https://img.shields.io/badge/Internet_Computer-29ABE2?style=flat&logo=dfinity&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

## ✨ Features

- **🔐 Internet Identity Authentication** - Secure, decentralized login
- **⚡ Real-time Updates** - Instant UI updates with TanStack Query
- **🎨 Modern UI** - Glassmorphism design with smooth animations
- **📱 Responsive** - Works on desktop and mobile
- **🔒 Per-User Data** - Each user sees only their own todos
- **🎯 Type-Safe** - Full TypeScript support with auto-generated types

## 🏗️ Project Structure

```
├── backend/
│   └── todo/
│       └── main.mo          # Motoko canister (backend logic)
├── src/
│   ├── declarations/        # Auto-generated canister types
│   ├── App.tsx              # Main React component
│   ├── hooks.ts             # IC Reactor hooks
│   ├── reactor.ts           # IC Reactor configuration
│   ├── index.css            # Styles
│   └── main.tsx             # React entry point
├── dfx.json                 # DFX configuration
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [DFX](https://internetcomputer.org/docs/current/developer-docs/setup/install) (v0.24+)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ic-reactor-todo
npm install
```

### 2. Start Local Replica

```bash
dfx start --background --clean
```

### 3. Deploy Canisters

```bash
dfx deploy
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧠 Understanding the Code

### Backend (Motoko)

The `backend/todo/main.mo` file defines a simple Todo canister with:

| Function           | Type   | Description                  |
| ------------------ | ------ | ---------------------------- |
| `getAllTodos()`    | Query  | Get all todos for the caller |
| `addTodo(text)`    | Update | Add a new todo               |
| `toggleTodo(id)`   | Update | Toggle completion status     |
| `deleteTodo(id)`   | Update | Delete a todo                |
| `clearCompleted()` | Update | Remove all completed todos   |

### Frontend (React + IC Reactor)

#### `reactor.ts` - Configuration

```typescript
// ClientManager handles authentication and agent
export const clientManager = new ClientManager({
  queryClient,
  withLocalEnv: true, // For local development
})

// DisplayReactor creates a type-safe canister interface
export const todoReactor = new DisplayReactor<_SERVICE>({
  clientManager,
  idlFactory,
  canisterId,
})
```

#### `hooks.ts` - React Hooks

```typescript
// Authentication hooks
export const { useAuth, useUserPrincipal } = createAuthHooks(clientManager)

// Canister interaction hooks
export const { useActorQuery, useActorMutation } = createActorHooks(todoReactor)
```

#### `App.tsx` - Usage Example

```typescript
// Query: Fetch todos
const {
  data: todos,
  isLoading,
  refetch,
} = useActorQuery({
  functionName: "getAllTodos",
})

// Mutation: Add a todo
const { mutate: addTodo, isPending } = useActorMutation({
  functionName: "addTodo",
  onSuccess: () => refetch(),
})

// Call the mutation
addTodo(["My new todo"])
```

## 📚 Learn More

- [IC Reactor Documentation](https://ic-reactor.dev)
- [Internet Computer Docs](https://internetcomputer.org/docs)
- [Motoko Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [TanStack Query](https://tanstack.com/query)

## 🚢 Deploying to Mainnet

1. Get cycles from the [Cycles Faucet](https://faucet.dfinity.org/)
2. Deploy to mainnet:

```bash
dfx deploy --network ic
```

3. Update `reactor.ts` to remove `withLocalEnv: true`

## 📝 Available Scripts

| Script                    | Description              |
| ------------------------- | ------------------------ |
| `npm run dev`             | Start development server |
| `npm run build`           | Build for production     |
| `npm run preview`         | Preview production build |
| `npm run lint`            | Run ESLint               |
| `dfx deploy`              | Deploy canisters locally |
| `dfx deploy --network ic` | Deploy to mainnet        |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this template for your own projects!

---

Built with ❤️ using [IC Reactor](https://ic-reactor.dev)
