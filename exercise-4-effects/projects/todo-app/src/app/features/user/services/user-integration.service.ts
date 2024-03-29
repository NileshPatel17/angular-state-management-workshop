import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '../state/user.model';

const API_URL = 'http://localhost:4300/users';

@Injectable({
  providedIn: 'root'
})
export class UserIntegrationService {
  constructor(private httpClient: HttpClient) {}

  load(isAdmin?: boolean): Observable<User[]> {
    if (isAdmin) {
      return of([{ id: 1000, username: 'admin', name: 'Admin', surname: 'Adminovsky' }]);
    }
    return this.httpClient.get<User[]>(API_URL);
  }

  create(userToCreate: Partial<User>): Observable<User> {
    return this.httpClient.post<User>(API_URL, userToCreate);
  }

  update(userToUpdate: User): Observable<User> {
    return this.httpClient.put<User>(
      `${API_URL}/${userToUpdate.id}`,
      userToUpdate
    );
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${API_URL}/${id}`);
  }
}
