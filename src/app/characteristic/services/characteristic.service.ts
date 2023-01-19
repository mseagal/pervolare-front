import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Characteristic } from '@app/interfaces/characteristic/characteristic.interface';
import { CreateCharacteristic } from '@app/interfaces/characteristic/create-characteristic.interface';
import { UpdateCharacteristic } from '@app/interfaces/characteristic/update-characteristic.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacteristicService {
  constructor(private http: HttpClient) {}

  getAllCharacteristics(): Observable<Characteristic[]> {
    return this.http.get<Characteristic[]>(`${environment.serverUrl}/characteristic`);
  }

  getOneCharacteristic(id: number): Observable<Characteristic> {
    return this.http.get<Characteristic>(`${environment.serverUrl}/characteristic/${id}`);
  }

  createCharacteristic(createCharacteristic: CreateCharacteristic): Observable<Characteristic> {
    return this.http.post<Characteristic>(`${environment.serverUrl}/characteristic`, createCharacteristic);
  }

  updateCharacteristic(id: number, updateCharacteristic: UpdateCharacteristic): Observable<Characteristic> {
    return this.http.put<Characteristic>(`${environment.serverUrl}/characteristic/${id}`, updateCharacteristic);
  }

  deleteCharacteristic(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.serverUrl}/characteristic/${id}`);
  }
}
