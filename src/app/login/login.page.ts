import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  // 1. Importe o AlertController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
onLogin() {
throw new Error('Method not implemented.');
}
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
      this.router.navigate(['/landing']);
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
