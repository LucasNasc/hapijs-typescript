// src/domain/user.ts
export interface User {
  id: string; // Changed to string to accommodate ULID
  name: string;
  email: string;
}