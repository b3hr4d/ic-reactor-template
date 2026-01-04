/**
 * Reactor Configuration - IC Reactor Setup
 *
 * This file configures the core IC Reactor instances:
 * 1. QueryClient - TanStack Query client for caching
 * 2. ClientManager - Manages ICP agent and authentication
 * 3. DisplayReactor - Type-safe canister interface
 *
 * @see https://ic-reactor.dev for full documentation
 */

import { ClientManager, DisplayReactor } from "@ic-reactor/react"
import { QueryClient } from "@tanstack/react-query"
import { canisterId, idlFactory } from "./declarations/todo"
import type { _SERVICE } from "./declarations/todo/todo.did"

// ============================================
// Query Client
// ============================================

/**
 * TanStack Query client for caching and state management.
 * IC Reactor uses this to cache canister responses.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetch on window focus (optional)
      refetchOnWindowFocus: false,
      // Retry failed queries
      retry: 1,
    },
  },
})

// ============================================
// Client Manager (Agent & Auth)
// ============================================

/**
 * ClientManager handles:
 * - ICP Agent creation and management
 * - Internet Identity authentication
 * - Network configuration (local vs mainnet)
 *
 * Set withLocalEnv: true for local development with dfx
 * Remove it or set to false for mainnet deployment
 */
export const clientManager = new ClientManager({
  queryClient,
  withLocalEnv: true, // Uses local replica (http://localhost:4943)
})

// ============================================
// Todo Reactor (Canister Interface)
// ============================================

/**
 * DisplayReactor creates a type-safe interface to your canister.
 * It automatically:
 * - Generates typed query/mutation functions
 * - Handles Principal/BigInt serialization for display
 * - Integrates with the ClientManager for auth
 *
 * The _SERVICE type is auto-generated from your .did file
 */
export const todoReactor = new DisplayReactor<_SERVICE>({
  clientManager,
  idlFactory,
  canisterId,
})
