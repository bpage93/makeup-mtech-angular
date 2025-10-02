import { Injectable, inject } from '@angular/core';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';

export interface AdminUserSearchResult {
  uid: string;
  email: string | undefined;
  displayName: string | undefined;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private functions: Functions = inject(Functions);

  /**
   * Searches for a user by their email address via a Cloud Function.
   * @param email The email to search for.
   * @returns A promise that resolves with the user data or null if not found.
   */
  async findUser(email: string): Promise<AdminUserSearchResult | null> {
    const findUserFn = httpsCallable(this.functions, 'findUserByEmail');
    const result = await findUserFn({ email });
    return result.data as AdminUserSearchResult | null;
  }

  /**
   * Grants a specific role to a user via a Cloud Function.
   * @param email The email of the user to grant the role to.
   * @param role The role to grant (e.g., 'admin').
   * @returns A promise that resolves with the result of the operation.
   */
  async grantAdminRole(email: string): Promise<HttpsCallableResult> {
    const addAdminRoleFn = httpsCallable(this.functions, 'addAdminRole');
    return addAdminRoleFn({ email, role: 'admin' });
  }
}
