import { Injectable } from '@angular/core';
import {
  Functions,
  httpsCallable,
  HttpsCallable,
  HttpsCallableResult,
} from '@angular/fire/functions';

export interface AdminUserSearchResult {
  uid: string;
  email: string | undefined;
  displayName: string | undefined;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private findUserFn: HttpsCallable<{ username: string }, AdminUserSearchResult | null>;
  private addAdminRoleFn: HttpsCallable<{ uid: string; role: string }, HttpsCallableResult>;

  constructor(private functions: Functions) {
    this.findUserFn = httpsCallable(this.functions, 'findUserByUsername');
    this.addAdminRoleFn = httpsCallable(this.functions, 'addAdminRole');
  }

  /**
   * Searches for a user by their username via a Cloud Function.
   * @param username The username to search for.
   * @returns A promise that resolves with the user data or null if not found.
   */
  async findUser(username: string): Promise<AdminUserSearchResult | null> {
    const result = await this.findUserFn({ username });
    return result.data;
  }

  /**
   * Grants a specific role to a user via a Cloud Function.
   * @param uid The UID of the user to grant the role to.
   * @returns A promise that resolves with the result of the operation.
   */
  async grantAdminRole(uid: string): Promise<HttpsCallableResult> {
    return this.addAdminRoleFn({ uid, role: 'admin' });
  }
}
