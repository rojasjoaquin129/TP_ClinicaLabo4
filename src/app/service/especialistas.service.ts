import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Especialidad } from '../classes/especialidades';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {
  private dbpathEspecialidad = '/especialidades';
  especialidadCollection: AngularFirestoreCollection<Especialidad>;
  public especialidades: Observable<Especialidad[]>;
  constructor(public db:AngularFirestore , public fbStorage: AngularFireStorage) {

  this.especialidadCollection = db.collection(this.dbpathEspecialidad);
  this.especialidades = this.especialidadCollection.snapshotChanges().pipe(map(actions=>{
    return actions.map(a=>{
      const data = a.payload.doc.data() as Especialidad;
      data.id = a.payload.doc.id;
      return data;
    });
  }));
  }

  getEspecialidades(){
    return this.especialidades;
   }

   AddEspecialidades(especialidad: Especialidad){
    return this.especialidadCollection.add(JSON.parse( JSON.stringify(especialidad)));
   }

   subirArchivo(file: any, path: string) {
    return this.fbStorage.upload(path, file);
  }

  traerArchivo(path: string) {
    return this.fbStorage.ref(path).getDownloadURL();
  }


}
