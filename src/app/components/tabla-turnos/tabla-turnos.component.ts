import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { Turno } from 'src/app/classes/turnos';
import { formatConfirmShift } from 'src/app/fechas/fechasTurnos';
import { TurnosService } from 'src/app/service/turnos.service';
import Swal from 'sweetalert2';
import { ListaEspecialistasComponent } from '../lista-especialistas/lista-especialistas.component';
@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.scss']
})
export class TablaTurnosComponent implements OnInit ,OnChanges {
  @Input() historialMedico:boolean=false;
  @Input() especialistaSelecionado:Especialistas|Pacientes|null=null;
  @Input() especialidadSelecionada:any=null;
  @Input() pacienteSeleccionado:Pacientes|Especialistas|null=null;
  @Input() tipo:string='';
  @Input() turnos:Turno[]|null=null;
  @Output() elTurno:EventEmitter<Turno |null>;
  busqueda:any;
  turnosCopiado:Turno[]|null=null;
  public turnosSelecionado:Turno[]|null=null;
  turnosCompletos:Turno[]|null=null;
  tituloModalRechazarCancelacion:string='';
  cancelacion=false;
  rechazar=false;
  modalCancelyRechazar=false;
  turnoSeleccionado:any;
  comentarioTurnoFrom:FormGroup;
  historialTurnoForm:FormGroup;
  encuestaFrom:FormGroup;
  historialModal=false;
  reseniaParaVer:string='';

  public comentario=new FormControl(null,[Validators.required,Validators.minLength(6)]);
  constructor(
    private turnosService:TurnosService,
    private fB:FormBuilder
  ) {
    this.elTurno=new EventEmitter<Turno|null>();
    this.comentarioTurnoFrom=this.fB.group({
      comentario:this.comentario
    });
    this.historialTurnoForm=this.fB.group({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      diagnostico: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      altura: new FormControl(180, [
        Validators.required,
        Validators.min(30),
        Validators.max(210),
      ]),
      peso: new FormControl(90, [
        Validators.required,
        Validators.min(20),
        Validators.max(180),
      ]),
      temperatura: new FormControl(36, [
        Validators.required,
        Validators.min(36),
        Validators.max(42),
      ]),
      pesionAlta: new FormControl(120, [
        Validators.required,
        Validators.min(120),
        Validators.max(129),
      ]),
      presionBaja: new FormControl(80, [
        Validators.required,
        Validators.min(80),
        Validators.max(84),
      ]),
    })
    this.encuestaFrom=this.fB.group({
      preguntaUno:new FormControl('', [Validators.required]),
      preguntaDos:new FormControl('', [Validators.required]),
      preguntaTres:new FormControl('', [Validators.required]),
      preguntaCuatro:new FormControl('', [Validators.required]),
    })
  }

  mensajeErrorHistorial(formControlName:string){
    if (this.historialTurnoForm.get(formControlName)?.touched) {
      if (this.historialTurnoForm.get(formControlName)?.errors?.required)
        return 'Debes ingresar un valor';

      if (
        (formControlName === 'comment' || formControlName === 'diagnostico') &&
        this.historialTurnoForm.get(formControlName)?.hasError('minlength')
      ) {
        return 'El comentario debe contener 6 caracteres como mínimo,';
      }

      // min - max
      if (formControlName === 'altura') {
        if (this.historialTurnoForm.get(formControlName)?.errors?.min)
          return 'La altura mínima es de 30cm';
        else if (this.historialTurnoForm.get(formControlName)?.errors?.max)
          return 'La altura máxima es de 210cm';
      }

      if (formControlName === 'peso') {
        if (this.historialTurnoForm.get(formControlName)?.errors?.min)
          return 'El peso mínimo es de 20kg';
        else if (this.historialTurnoForm.get(formControlName)?.errors?.max)
          return 'El peso máximo es de 180kg';
      }

      if (formControlName === 'temperatura') {
        if (this.historialTurnoForm.get(formControlName)?.errors?.min)
          return 'La temperatura mínima es de 36ºC';
        else if (this.historialTurnoForm.get(formControlName)?.errors?.max)
          return 'La temperatura máxima es de 42ºC';
      }

      if (formControlName === 'pesionAlta') {
        if (this.historialTurnoForm.get(formControlName)?.errors?.min)
          return 'La presión sistólica mínima es de 120 mmHg';
        else if (this.historialTurnoForm.get(formControlName)?.errors?.max)
          return 'La presión sistólica máxima es de 129 mmHg';
      }

      if (formControlName === 'presionBaja') {
        if (this.historialTurnoForm.get(formControlName)?.errors?.min)
          return 'La presión diastólica mínima es de 80 mmHg';
        else if (this.historialTurnoForm.get(formControlName)?.errors?.max)
          return 'La presión diastólica máxima es de 84 mmHg';
      }
    }
    return '';
  }
  async enviarCalificacion(){
    const aceptadoTurno:Turno={...this.turnoSeleccionado,calificado:true}
    await this.turnosService.subirTurno(aceptadoTurno);
     this.mensaje(
       'Usted Califico La atencion del Turno',
       'Fue aprobado con éxito!'
     );
  }
  async enviarEncuesta()
  {
    const aceptadoTurno:Turno={...this.turnoSeleccionado,encuestado:true}
    await this.turnosService.subirTurno(aceptadoTurno);
     this.mensaje(
       'Usted envio la Encuesta del Turno',
       'Fue aprobado con éxito!'
     );
  }
  ngOnChanges(changes:SimpleChanges){
    this.filtrarLista(this.turnos);
    if(changes.especialistaSeleccionado){
      console.log('entro aqui');
    }
    if((!changes.pacienteSeleccionado && this.tipo==='especialista') || (!changes.especialistaSeleccionado && this.tipo==='paciente') ){
    if(changes.turnos && changes.especialistaSeleccionado===undefined){
      console.log('entra');
        this.turnosCompletos=changes.turnos.currentValue
        this.turnosSelecionado=changes.turnos.currentValue
        this.filtrarLista(this.turnosSelecionado);
        this.turnosSelecionado?.sort((a:Turno,b:Turno)=>{
        const dateA= new Date(a.dia).getTime();
        const dateB= new Date(b.dia).getTime();
        return dateA-dateB;
      })
    }else if(changes.especialistaSeleccionado){
      console.log('entra aca');
      this.filtrarLista(this.turnos);
    }
  }else if(changes.pacienteSeleccionado || changes.especialistaSeleccionado ){
    this.turnosSelecionado=this.turnosCompletos
    console.log('cambio de especialista');
    this.filtrarLista(this.turnosSelecionado);
  }
  }
  filtarLista(){
    if(this.tipo==='especialista'){
      this.turnosSelecionado=this.turnos;
      if(this.turnosSelecionado){
        const listaFiltrada=this.turnosSelecionado.filter(
          (turno:Turno)=>{
            return (
              turno.especialidad?.toLowerCase()
              .includes(this.busqueda.toLowerCase()) ||
              turno.paciente?.apellido.toLowerCase()
              .includes(this.busqueda.toLowerCase()) ||
              turno.paciente?.nombre.toLowerCase()
              .includes(this.busqueda.toLowerCase()) ||
              turno.paciente?.mail.toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.diagnostico?.toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.pasienteInfo?.altura.toString().toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.pasienteInfo?.peso.toString().toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.pasienteInfo?.presion.precionAlta.toString().toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.pasienteInfo?.presion.precionBaja.toString().toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.pasienteInfo?.temperatura.toString().toLowerCase()
              .includes(this.busqueda.toLowerCase())
            );
          }
        );
        this.turnosSelecionado=listaFiltrada;
      }
    }else{
      this.turnosSelecionado=this.turnos;
      if(this.turnosSelecionado){
        const listaFiltrada=this.turnosSelecionado.filter(
          (turno:Turno)=>{
            return (
              turno.especialidad?.toLowerCase()
              .includes(this.busqueda.toLowerCase()) ||
              turno.especialista?.apellido.toLowerCase()
              .includes(this.busqueda.toLowerCase()) ||
              turno.especialista?.nombre.toLowerCase()
              .includes(this.busqueda.toLowerCase()) ||
              turno.especialista?.mail.toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.diagnostico?.toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.pasienteInfo?.altura.toString().toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.pasienteInfo?.peso.toString().toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.pasienteInfo?.presion.precionAlta.toString().toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.pasienteInfo?.presion.precionBaja.toString().toLowerCase()
              .includes(this.busqueda.toLowerCase())||
              turno.pasienteInfo?.temperatura.toString().toLowerCase()
              .includes(this.busqueda.toLowerCase())
            );
          }
        );
        this.turnosSelecionado=listaFiltrada;
      }

    }
  }




   filtrarLista(listaTurnos:Turno[]|null){
    if(listaTurnos===null){

    }else{
      let listaFiltradaPorPaciente:Turno[]=[];
      if(this.tipo==='especialista'){
        if(this.pacienteSeleccionado){
          listaTurnos?.forEach((turno:Turno)=>{
            if(turno.paciente?.mail===this.pacienteSeleccionado?.mail){
              listaFiltradaPorPaciente.push(turno);
            }
          });
        }else{
          listaFiltradaPorPaciente=listaTurnos;
        }

      }else if( this.tipo==='paciente' || this.tipo==='admin'){
        if(this.especialistaSelecionado){
          listaTurnos?.forEach((turno:Turno)=>{
            if(turno.especialista?.mail===this.especialistaSelecionado?.mail){
              listaFiltradaPorPaciente.push(turno);
            }
          })
        }else{
          listaFiltradaPorPaciente=listaTurnos;
        }
      }
      this.turnosSelecionado=listaFiltradaPorPaciente;
    }

   }
  ngOnInit(): void {
    if(this.turnos){
      this.turnosSelecionado=this.turnos;

    }else{

    }
    console.log(this.turnosSelecionado);
  }


  botonCompletarEncuestaCondicion(turno:Turno){
    let flag=false;
    if((this.tipo==='paciente' && turno.estado==='finalizado'  && !this.historialMedico)) {
      if(!turno.encuestado){
        flag=true;
      }
    }
    return flag;
  }
  botonCalificarAtencionCondicion(turno:Turno){
    let flag=false;
    if(this.tipo==='paciente' && turno.estado==='finalizado' && !this.historialMedico){
      if(!turno.calificado){
        flag=true;
      }
    }
    return flag;
  }


  async AceptarTurno(turno:Turno){
   const aceptadoTurno:Turno={...turno,estado:'aceptado'}
   await this.turnosService.subirTurno(aceptadoTurno);
    this.mensaje(
      'Estado del turno',
      'El turno fue aprobado con éxito!'
    );
  }
  cancelarTurno(turno:Turno){
    this.turnoSeleccionado=turno;
    if(this.turnoSeleccionado){
      this.modalCancelyRechazar=true;
    }
    this.cancelacion=true;
    this.tituloModalRechazarCancelacion='¿Por qué quiere cancelar el turno?';
  }
  rechazarTurno(turno:Turno){
    this.turnoSeleccionado=turno;
    this.rechazar=true;
    this.modalCancelyRechazar=true;
    this.tituloModalRechazarCancelacion='¿Por qué quiere rechazar el turno?'
    //guardo el turno selecionado, activo el flag para saber si es rechazo , activo el modal , y modifico el titulo del modal
  }

  async onCompletarTurno(){

    const{
      comment,
      diagnostico,
      altura,
      peso,
      temperatura,
      pesionAlta,
      presionBaja
    }=this.historialTurnoForm.getRawValue();
    try{
      if(this.turnoSeleccionado){
        const completoTurno:Turno={
          ...this.turnoSeleccionado,
          estado:'finalizado',
          comentarioCompleto:comment,
          diagnostico:diagnostico,
          Terminado:Date.now(),
          pasienteInfo:{
            altura:altura,
            peso:peso,
            temperatura:temperatura,
            presion:{
              precionAlta:pesionAlta,
              precionBaja:presionBaja,
            },
          },
        };
        console.log('EstaCompleto');
        await this.turnosService.subirTurno(completoTurno).then(()=>{
          this.mensaje('Estado del turno',
          'El turno fue completado y agendado en la historia clínica con éxito!');

        }
        );
      }else{
        this.mensajeError('elija Por favor el paciente');
      }
    }catch(error:any){
      this.mensajeError(error.message);
    }

  }


  finalizarTurno(turno:Turno){
    this.turnoSeleccionado=turno;
    this.historialModal=true;

  }
  async cancelacionYRechazarTurno(){
    console.log(this.turnoSeleccionado);
    const {comentario}=this.comentarioTurnoFrom.getRawValue();
    if(this.rechazar){
      const turnoRechazado:Turno={
        ...this.turnoSeleccionado,
        estado:'rechazado',
        razonRechazar:comentario
      }
      await this.turnosService.subirTurno(turnoRechazado);
      this.mensaje(
        'Estado del turno',
        'El turno fue rechazado con éxito!'
      );
    }
    if(this.cancelacion){
      const turnoCancelado:Turno={
        ...this.turnoSeleccionado,
        estado:'cancelado',
        razonCancelacion:comentario
      }
      await this.turnosService.subirTurno(turnoCancelado);
      this.mensaje(
        'Estado del turno',
        'El turno fue cancelado con éxito!'
      );
    }
    this.cancelacion=false;
    this.rechazar=false;
    this.modalCancelyRechazar=false;

    //ultimo que tengo q hacer es dejar todo desactivado
  }

  botonVerReseniaTurnoCondicion(turno:Turno){
    let flag=false;
    if(this.tipo==='paciente'  && !this.historialMedico || this.tipo==='especialista'  && !this.historialMedico){
      if(turno.estado==='cancelado' || turno.estado==='rechazado' || turno.estado==='finalizado'){
        flag=true;
      }
    }
    return flag
  }

  seleccionarTurno(turno:Turno){
    if(this.historialMedico && turno.estado==='finalizado' ){
      console.log('emite');
      this.elTurno.emit(turno);
    }
  }
  verResenia(turno:Turno){
    let resenia:any;
    let titu: any;
    switch (turno.estado) {
      case 'cancelado':
        titu='Razon De Cancelacion'
        resenia=turno.razonCancelacion;
        break;
      case 'rechazado':
        titu='Razon de Rechazar'
        resenia=turno.razonRechazar;
        break;
      case 'finalizado':
        titu='reseña del Especialista'
        resenia=turno.comentarioCompleto;
        break;
      default:
        titu='no hay';
        resenia='no hay reseña';
        break;
    }
    this.mensajeResenia(titu,resenia);
  }

  mensajeResenia(titulo:string,resenia:string){
    Swal.fire(titulo,resenia);
  }



  botonCancelarCondicion(turno:Turno){
    let flag=false
    if(turno.estado==='pendiente' || turno.estado==='disponible'){
      flag=true;
    }
    return flag;
  }
  botonFinalizarTurnoCondicion(turno:Turno){
    let flag=false;
    if(this.tipo==='especialista' && turno.estado==='aceptado'){
      flag=true;
    }
    return flag;
  }
  botonAceptarYRechazarCondicion(turno:Turno){
    let flag=false;
    if(this.tipo==='especialista' && turno.estado==='pendiente'){
      flag=true;
    }
    return flag;
  }

  cargarMensajeErrorCancelacionYRechazo(formControlName:string){
    if(this.comentarioTurnoFrom.get(formControlName)?.touched){
      if (this.comentarioTurnoFrom.get(formControlName)?.errors?.required)
      return 'Debes ingresar un valor';

    if (this.comentarioTurnoFrom.get(formControlName)?.hasError('minlength'))
      return 'El comentario debe contener 6 caracteres como mínimo;';
    }
    return '';
  }


 mensaje( titulo:string, texto:string )  {
    Swal.fire({
      icon: 'success',
      title:titulo,
      text:texto });
  };

  mensajeError(text:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }

  selecionarTurno(turno:Turno){
    this.turnoSeleccionado=turno;
  }
  formatShift(turno: Turno) {
    return formatConfirmShift(turno);
  }
  formatStatus(estado: string |undefined) {
    let text='';
    switch (estado) {
      case 'disponible':
        text='Disponible';
      break;
      case 'pendiente':
        text='Pendiente';
        break;
      case 'aceptado':
        text='Aceptado'
        break;
      case 'rechazado':
        text='Rechazado'
        break;
      case 'cancelado':
        text='Cancelado'
        break;
      case 'finalizado':
        text='Completado'
        break;
      default:
        break;
    }
    return text;
  }
}
