import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { addDays, getDay, isPast, set } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turno } from '../classes/turnos';
import { parsedSelectedDatesInForm } from '../fechas/fechasTurnos';
interface Props {
  email: string;
  role?: string| null;
}
@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private turnosCollection:AngularFirestoreCollection<any>;
  private nombreCollectionDB='turnos';
  public itemDoc: AngularFirestoreDocument<any> | null = null;
  constructor( private afs :AngularFirestore) {
    this.turnosCollection=this.afs.collection<any[]>(this.nombreCollectionDB);
   }


   async getTurnosAceptados(){
    let turnos :Array<any> = new Array<any>();
    let turnosUfs= await this.turnosCollection.ref.where("estado","!=", "disponible").where("estado","!=","cancelado").get();
    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    });
    console.log("turnos::");

    console.log(turnos);
    return turnos;
   }

   async getTurnosByEstadoYPeriodo(estado:string){


    let turnos :Array<any> = new Array<any>();
    let turnosUfs =  await this.turnosCollection.ref.where("estado","==",estado).get();

    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    });
    console.log("turnos::");

    console.log(turnos);
    return turnos;
  }


  public async traerTurnosPorEmail({email,role}:Props){
    const fieldPath =
    role==='paciente' ? 'paciente.mail' : 'especialista.mail';
    return this.afs.collection(this.nombreCollectionDB,(ref)=>
    ref.where(fieldPath,'==',email)
    ).snapshotChanges().pipe(
      map((actions:any)=>
      actions.map((a:any)=>{
        const data =a.payload.doc.data() as object;
        const id=a.payload.doc.id;
        return {id,...data};
      })
    )
    )
  }


  public addTurno(turno:Turno){
    return this.turnosCollection.add(turno);
  }

  traerTodosTurnos():Observable<any>{
    return this.afs.collection(this.nombreCollectionDB).snapshotChanges().pipe(map((actions)=>{
      actions.map((a)=>{
          const data=a.payload.doc.data() as object;
          const id= a.payload.doc.id;
          return {id,...data}
        })
      })
    )
  }
  public subirTurno(turno: Turno) {
    this.itemDoc = this.afs.doc(`turnos/${turno.id}`);
    return this.itemDoc.update(turno);
  }

  CargaTurnosAuto(){
    this.traerTodosTurnos().subscribe((todosTurnos:Turno[])=>{
      todosTurnos.forEach((turno:Turno):any=>{
        const parseTurnoDia=new Date(turno.dia);
        if(isPast(parseTurnoDia)&& turno.estado==='disponible'){
          const turnoparaSubir:Turno={
            ...turno,
            estado:'ocupado'
          };
          return this.subirTurno(turnoparaSubir);
        }
      })
    })
  }




  traerTodoTurno(){
    return this.afs.collection(this.nombreCollectionDB).valueChanges() as Observable<Turno[]>
  }
  public generaHorariosParaLosTurnos(
    semana:any,
    datos:any,
    especilaista:any
  ){
    const{especialidad, dias,from ,to , duracion }=datos;
    const selecionarDias=parsedSelectedDatesInForm(semana,dias);
    const now = new Date();
    for (let i = 0; i < 29; i++) {
      const cargarfecha=addDays(now,i);
      for (const day of selecionarDias) {
        if(getDay(cargarfecha)===day.id){
          for (let j = from; j <=to; j++) {
            const resultado=set(cargarfecha,{
              hours:j,
              minutes:0,
              seconds:0,
            });
            const newTurno:Turno={
              dia:resultado.toString(),
              especialista:especilaista,
              estado:'disponible',
              especialidad:especialidad,
              Terminado:''
            };
            this.addTurno(newTurno);
            if(j<to && duracion===30){
              const cargarResutlado=set(resultado,{minutes:30});
              const nuevoTurnoCon30minutos:Turno={
                ...newTurno,
                dia:cargarResutlado.toString()
              };
              this.addTurno(nuevoTurnoCon30minutos);
            }
          }
        }

      }

    }
  }

}
