# Dynamic Route Solver

## Overview

This project provides a TypeScript solution to infer dynamic route parameters from given route strings. Using  TypeScript features such as conditional types, recursive type definitions, and template literal types, the `DynamicRoute` type maps route patterns to their corresponding parameter type definitions.

https://github.com/type-challenges/type-challenges/blob/main/questions/33345-extreme-dynamic-route/README.md

## Features

- **Dynamic Parameter Inference**: Extracts both single and catch-all dynamic parameters.
- **Optional Parameters**: Handles optional dynamic segments gracefully.
- **Ambiguity Detection**: Returns `never` for ambiguous or invalid route patterns.
- **Comprehensive Test Cases**: Ensures reliability across various route structures.

## Type Definitions

### `DynamicRoute<T extends string>`

The core type that infers dynamic parameters from a route string.

#### Example

```typescript
type Route = '/shop/[slug]/page.js';
type Params = DynamicRoute<Route>; // { slug: string }
