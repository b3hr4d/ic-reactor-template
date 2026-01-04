/**
 * Custom Hooks - IC Reactor Integration
 *
 * This file creates type-safe React hooks from the IC Reactor instances.
 * These hooks provide a clean interface for:
 * - Authentication (useAuth, useUserPrincipal)
 * - Canister queries (useActorQuery)
 * - Canister mutations (useActorMutation)
 *
 * @see https://ic-reactor.dev for full documentation
 */

import { createActorHooks, createAuthHooks } from "@ic-reactor/react"
import { clientManager, todoReactor } from "./reactor"

// ============================================
// Authentication Hooks
// ============================================

/**
 * useAuth - Manage authentication state
 * - login(): Opens Internet Identity popup
 * - logout(): Clears authentication
 * - isAuthenticated: Boolean auth state
 * - isAuthenticating: Login in progress
 *
 * useUserPrincipal - Get the authenticated user's Principal
 * - Returns undefined if not authenticated
 */
export const { useAuth, useUserPrincipal } = createAuthHooks(clientManager)

// ============================================
// Actor Hooks (Todo Canister)
// ============================================

/**
 * useActorQuery - Query data from the canister
 * - Automatically caches responses
 * - Supports refetch, loading states
 * - Example: useActorQuery({ functionName: "getAllTodos" })
 *
 * useActorMutation - Mutate data on the canister
 * - Returns mutate function and loading state
 * - Supports onSuccess, onError callbacks
 * - Example: useActorMutation({ functionName: "addTodo" })
 */
export const { useActorQuery, useActorMutation } = createActorHooks(todoReactor)
