export class Init {
    load() {
      if(localStorage.getItem('clients') === null || localStorage.getItem('clients') == undefined) {
        let clients = [
          {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '1992-04-12',
            phoneNumber: '+351968765728',
            email: 'test@example.com',
            bankAccountNumber: '123457890',
          }
        ];
  
        localStorage.setItem('clients', JSON.stringify(clients));
        return;
      } 
    }
  }