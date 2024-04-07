 import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// // Imports de los servicios //
// import { UsersService } from 'src/app/services/users.service';
// import { XuxemonsService } from 'src/app/services/xuxemons.service';
// // Imports de las rutas //
// import { Router, ActivatedRoute } from '@angular/router';

 @Component({
  selector: 'app-alimentar',
  templateUrl: './alimentar.component.html',
  styleUrls: ['./alimentar.component.css']
 })

export class AlimentarComponent {}
//   alimentarForm: FormGroup;
//   xuxeData: any;

//   ngOnInit(): void {
//     this.route.queryParams.subscribe((params) => {
//       this.xuxeData = {
//         id: params['id'],
//         nombre: params['nombre'],
//         tipo: params['tipo'],
//         tamano: params['tamano'],
//         comida: params['comida'],
//         evo1: params['evo1'],
//         evo2: params['evo2'],
//         archivo: params['archivo'],
//       };
//     });

//     // Seteamos los valores //
//     this.alimentarForm.setValue({
//       nombre: this.xuxeData.nombre || '',
//       tipo: this.xuxeData.tipo || '',
//       archivo: this.xuxeData.archivo || '',
//     });
//   }

//   constructor(
//     private fb: FormBuilder,
//     public userService: UsersService,
//     public xuxemonsService: XuxemonsService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {
//     // Restricciones que se espera que tenga el FormGroup //
//     this.alimentarForm = this.fb.group({
//       nombre: ['', [Validators.required]],
//       tipo: ['', [Validators.required]],
//       archivo: ['', [Validators.required]],
//     });
//   }

//   // Función para editar el Xuxemon //
//   alimentarXuxemon() {
//     // Se subscribe para recibir la información de la función a la que hace referencia en users.service //
//     this.xuxemonsService
//       .XuxeComer(this.alimentarForm.value, this.xuxeData.id)
//       .subscribe({
//         // Aceptada //
//         next: (data: any) => {
//           // Redirije al usuario y le da un mensaje //
//           alert('Xuxemon alimentado con exito.');
//           this.router.navigate(['home/home/caja/alimentar']);
//         },
//         // Rechazada //
//         error: (error) => {
//           console.log(error);
//           // Avisa de que algo salió mal //
//           alert('No se pudo alimantar al Xuxemon');
//           throw new Error(error);
//         },
//       });
//   }
// }







// // codigo modificado por mi a la 12:30 de la noche, solo fluyo
// // comento porque mañana no me voy a acordar

// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// // import { BrowserModule } from '@angular/platform-browser';
// // Imports de los servicios //
// import { UsersService } from 'src/app/services/users.service';
// import { XuxemonsService } from 'src/app/services/xuxemons.service';
// import { ChuchesService } from 'src/app/services/chuches.service';
// // Imports de las rutas //
// import { Router, ActivatedRoute } from '@angular/router';
// import { Chuches } from 'src/app/models/chuches/chuches.model';
// import { ChuchesUser } from 'src/app/models/chuches/chuchesUser.model';

// @Component({
//   selector: 'app-alimentar',
//   standalone: true,
//   imports: [ReactiveFormsModule, FormsModule, CommonModule],
//   templateUrl: './alimentar.component.html',
//   styleUrls: ['./alimentar.component.css'],
// })
// export class AlimentarComponent {
//   alimentarForm: FormGroup;
//   xuxeData: any;
//   idChuchue!: number;
//   // chuches: Chuches[] = [];
//   ChuchesUser: ChuchesUser[] = [];
//   // numero: number = 1;

//   // obtiene la id de la card, no de la chuche, tambien el numero de chuches que le das
//   chucheSeleccionada: { id: number; numero: number } = { id: 0, numero: 1 };

//   ngOnInit(): void {
//     // this.getChuches();
//     this.updateChuches();
//   }

//   constructor(
//     private fb: FormBuilder,
//     public userService: UsersService,
//     public ChuchesService: ChuchesService,
//     public xuxemonsService: XuxemonsService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {
//     // Restricciones que se espera que tenga el FormGroup //
//     this.alimentarForm = this.fb.group({
//       nombre: ['', [Validators.required]],
//       tipo: ['', [Validators.required]],
//       archivo: ['', [Validators.required]],
//       comida: ['', [Validators.required]]
//     });
//   }


//   //intento para que obtenga la verdadera id de la chuche
//   ObtenerId(nombreChuche: string) {
//     this.ChuchesUser.forEach((chucheUser) => {
//       if (nombreChuche == chucheUser.nombre) {
//         this.idChuchue = chucheUser.id!;
//       }
//     });
//   }

//   // funcion que suma el numero
//   sumar(id: number) {
//     this.chucheSeleccionada.id = id - 1;
//     if (
//       this.chucheSeleccionada.numero <
//       this.ChuchesUser[this.chucheSeleccionada.id].stack
//     ) {
//       this.chucheSeleccionada.numero++;
//     }
//     console.log('Id: ' + this.chucheSeleccionada.id);
//     console.log('Numero suma: ' + this.chucheSeleccionada.numero);
//   }

//   // funcion que resta el numero
//   restar(id: number) {
//     this.chucheSeleccionada.id = id - 1;
//     if (this.chucheSeleccionada.numero > 1) {
//       this.chucheSeleccionada.numero--;
//     }
//     console.log('Id: ' + this.chucheSeleccionada.id);
//     console.log('Numero resta: ' + this.chucheSeleccionada.numero);
//   }

//   // funcion que muestra la info
//   guardar() {
//     // Aquí puedes realizar cualquier acción que desees con el número guardado
//     console.log('Número guardado:', this.chucheSeleccionada.numero);
//   }

//   // este es el original \\

//   // // Función para editar el Xuxemon //
//   // alimentarXuxemon(id: number) {
//   //   // const comida = this.chucheSeleccionada.numero;
//   //   let comida = 3;
//   //   // Se subscribe para recibir la información de la función a la que hace referencia en users.service //
//   //   this.xuxemonsService
//   //     .XuxeComer(comida, this.idChuchue)
//   //     .subscribe({
//   //       // Aceptada //
//   //       next: (data: any) => {
//   //         // Redirije al usuario y le da un mensaje //
//   //         alert('Xuxemon alimentado con exito.');
//   //         // this.router.navigate(['home/home/caja/alimentar']);
//   //       },
//   //       // Rechazada //
//   //       error: (error) => {
//   //         console.log(error);
//   //         // Avisa de que algo salió mal //
//   //         alert('No se pudo alimantar al Xuxemon');
//   //         throw new Error(error);
//   //       },
//   //     });
//   // }

//   alimentarXuxemon(id: number) {
//     //ns ya ni lo que le estoy dando a comida
//     const comida = this.chucheSeleccionada.numero;
//     // Se subscribe para recibir la información de la función a la que hace referencia en users.service //
//     this.xuxemonsService
//       .XuxeComer(comida, id) // Pasar el ID de la chuche como segundo parámetro
//       .subscribe({
//         // Aceptada //
//         next: (data: any) => {
//           // Redirige al usuario y le da un mensaje //
//           alert('Xuxemon alimentado con éxito.');
//           // this.router.navigate(['home/home/caja/alimentar']);
//         },
//         // Rechazada //
//         error: (error) => {
//           console.log(error);
//           // Avisa de que algo salió mal //
//           alert('No se pudo alimentar al Xuxemon');
//           throw new Error(error);
//         },
//       });
//   }

//   // obtiene todas la chuches del usuario
//   updateChuches() {
//     this.ChuchesService.getAllChuchesUser().subscribe({
//       next: (value: any) => {
//         this.ChuchesUser = value[0];
//       },
//       error: (error: any) => {
//         console.error('Error fetching Chuches:', error);
//         console.log(this.ChuchesUser);
//       },
//     });
//   }
// }
