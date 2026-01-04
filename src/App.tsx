import React, { useState, useMemo } from "react"
import { useActorQuery, useActorMutation, useAuth } from "./hooks"

/**
 * Todo App - A simple example demonstrating IC Reactor with React
 *
 * This template showcases:
 * - Authentication with Internet Identity
 * - Querying data from a canister
 * - Mutations (add, toggle, delete)
 * - Real-time UI updates
 */
const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState("")
  const { login, logout, principal, isAuthenticated, isAuthenticating } =
    useAuth()

  // ============================================
  // QUERIES - Fetch data from the canister
  // ============================================

  const {
    data: todos,
    isLoading,
    refetch,
  } = useActorQuery({
    functionName: "getAllTodos",
    refetchOnMount: true,
  })

  // ============================================
  // MUTATIONS - Modify data on the canister
  // ============================================

  // Add a new todo
  const { mutate: addTodo, isPending: isAdding } = useActorMutation({
    functionName: "addTodo",
    onSuccess: () => {
      setNewTodo("")
      refetch()
    },
    onCanisterError: (error) => {
      alert(`Error adding todo: ${error}`)
    },
  })

  // Toggle todo completion status
  const { mutate: toggleTodo, isPending: isToggling } = useActorMutation({
    functionName: "toggleTodo",
    onSuccess: () => refetch(),
  })

  // Delete a single todo
  const { mutate: deleteTodo, isPending: isDeleting } = useActorMutation({
    functionName: "deleteTodo",
    onSuccess: () => refetch(),
  })

  // Clear all completed todos
  const { mutate: clearCompleted, isPending: isClearing } = useActorMutation({
    functionName: "clearCompleted",
    onSuccess: (deletedCount) => {
      if (deletedCount && Number(deletedCount) > 0) {
        refetch()
      }
    },
  })

  // ============================================
  // COMPUTED VALUES
  // ============================================

  const stats = useMemo(() => {
    if (!todos) return { total: 0, completed: 0, active: 0 }
    const total = todos.length
    const completed = todos.filter((t) => t.completed).length
    return { total, completed, active: total - completed }
  }, [todos])

  // ============================================
  // EVENT HANDLERS
  // ============================================

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo([newTodo.trim()])
    }
  }

  // ============================================
  // RENDER
  // ============================================

  const isBusy = isToggling || isDeleting || isClearing

  return (
    <div className="container">
      {/* Header with Auth Status */}
      <header className="auth-header">
        {isAuthenticated ? (
          <>
            <div className="user-info">
              <span className="status-dot online" />
              <span className="principal">
                {principal?.toText().slice(0, 8)}...
              </span>
            </div>
            <button onClick={() => logout()} className="btn-secondary btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="user-info">
              <span className="status-dot offline" />
              <span>Guest Mode</span>
            </div>
            <button
              onClick={() => login()}
              className="btn-primary btn-sm"
              disabled={isAuthenticating}
            >
              {isAuthenticating ? "Connecting..." : "Login with II"}
            </button>
          </>
        )}
      </header>

      {/* Title */}
      <h1>✨ Todo Master</h1>
      <p className="subtitle">Built on the Internet Computer</p>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} className="input-container">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          disabled={isAdding}
          autoFocus
        />
        <button type="submit" disabled={isAdding || !newTodo.trim()}>
          {isAdding ? <span className="spinner" /> : "Add"}
        </button>
      </form>

      {/* Stats Bar */}
      {stats.total > 0 && (
        <div className="stats-bar">
          <span className="stat">
            <strong>{stats.active}</strong> active
          </span>
          <span className="stat">
            <strong>{stats.completed}</strong> completed
          </span>
          {stats.completed > 0 && (
            <button
              onClick={() => clearCompleted([])}
              className="btn-clear"
              disabled={isClearing}
            >
              {isClearing ? "Clearing..." : "Clear Completed"}
            </button>
          )}
        </div>
      )}

      {/* Todo List */}
      {isLoading ? (
        <div className="loading-state">
          <div className="spinner large" />
          <p>Loading your tasks...</p>
        </div>
      ) : (
        <ul className="todo-list">
          {todos?.map((todo) => (
            <li
              key={String(todo.id)}
              className={`todo-item ${todo.completed ? "completed" : ""} ${
                isBusy ? "busy" : ""
              }`}
            >
              <button
                className="btn-checkbox"
                onClick={() => toggleTodo([todo.id])}
                title={todo.completed ? "Mark as active" : "Mark as completed"}
                disabled={isBusy}
              >
                {todo.completed ? "✓" : ""}
              </button>
              <span className="text">{todo.text}</span>
              <button
                className="btn-icon btn-delete"
                onClick={() => deleteTodo([todo.id])}
                title="Delete todo"
                disabled={isBusy}
              >
                ✕
              </button>
            </li>
          ))}
          {todos?.length === 0 && (
            <li className="empty-state">
              <span className="emoji">📝</span>
              <p>No tasks yet. Add one above!</p>
            </li>
          )}
        </ul>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built with{" "}
          <a
            href="https://ic-reactor.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            IC Reactor
          </a>{" "}
          & React
        </p>
        <p className="hint">Press Enter to quickly add a todo</p>
      </footer>
    </div>
  )
}

export default App
