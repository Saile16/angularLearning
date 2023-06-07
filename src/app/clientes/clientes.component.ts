import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  //variable clientes de tipo CLIENTE
  clientes: Cliente[];
  //llamamos al iniciar a CLIENTES= json simulador

  constructor(private clienteService: ClienteService) {}
  ngOnInit(): void {
    let page = 0;
    //this.clientes = CLIENTES;
    //this.clientes = this.clienteService.getCLientes();
    //usando observable
    this.clienteService
      .getCLientes(page)
      .pipe(
        tap((response: any) => {
          console.log('clientesasjkdas');
          (response.content as Cliente[]).forEach((cliente) => {
            console.log(cliente.nombre);
          });
        })
      )
      .subscribe((response) => (this.clientes = response.content as Cliente[]));
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Estás seguro?',
        text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} -  ${cliente.apellido}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si eliminar',
        cancelButtonText: 'No cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clienteService.delete(cliente.id).subscribe((response) => {
            this.clientes = this.clientes.filter((c) => c !== cliente);
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              'Cliente eliminado con éxito',
              'success'
            );
          });
        }
      });
  }
}
