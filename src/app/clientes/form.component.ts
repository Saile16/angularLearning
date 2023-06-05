import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';

  constructor(private clienteService: ClienteService, private router: Router) {}

  public create(): void {
    // console.log('click');
    // console.log(this.cliente);

    this.clienteService.create(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Nuevo Cliente',
        `Cliente ${cliente.nombre} creado con exito`,
        'success'
      );
    });
    //.subscribe((response) => this.router.navigate(['/clientes']));
  }
}
