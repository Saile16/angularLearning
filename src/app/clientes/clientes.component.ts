import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';

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
    //this.clientes = CLIENTES;
    //this.clientes = this.clienteService.getCLientes();
    //usando observable
    this.clienteService
      .getCLientes()
      .subscribe((clientes) => (this.clientes = clientes));
  }
}
