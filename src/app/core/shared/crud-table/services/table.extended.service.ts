import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableService} from './table.service';

@Injectable({
  providedIn: 'root'
})
export class TableExtendedService extends TableService<any> {
  
}
