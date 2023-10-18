// Importação das bibliotecas e módulos necessários.
import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AlertController } from '@ionic/angular';  // 1. Importe o AlertController
import { Router } from '@angular/router';

// Decorator que define a classe como um componente e especifica seus metadados.
@Component({
  selector: 'app-home',             // O nome do seletor CSS para o componente.
  templateUrl: 'home.page.html',    // Caminho para o arquivo HTML do componente.
  styleUrls: ['home.page.scss'],    // Caminho para o arquivo CSS do componente.
})
export class HomePage implements OnInit {
    email: string = '';
    password: string = '';
  
    constructor(private router: Router, private alertController: AlertController) {}  // 2. Injete o AlertController
  
    ngOnInit() {}
  
    // Função para logar na página principal
    async login() {
      const auth = getAuth();
      try {
        // Chamando função do firabase para comparar dados em tela com os do banco de dados
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        console.log('Usuário autenticado:', user);
        // Caso usuário seja aprovado, vai para a página landing
        this.router.navigate(['/novapagina']);
      } catch (error) {
        const errorCode = (error as any).code;
        const errorMessage = (error as any).message;
        console.error('Erro ao autenticar:', errorMessage);
        this.showErrorAlert(errorMessage);  // Chama função para exibir o alerta de erro
      }
    }
  
    // Função para exibir um alerta
    async showErrorAlert(message: string) {
      const alert = await this.alertController.create({
        header: 'Erro de Autenticação',
        message: message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  