export class Init {
    load() {
      if(localStorage.getItem('clients') === null || localStorage.getItem('clients') == undefined) {
        let clients = [
            {
                firstName: 'Jane',
                lastName: 'Doe',
                dateOfBirth: 20180722,
                phoneNumber: '911982',
                email: 'janedoe@gmail.com',
                banckAccountNumber: '01291937173'
            },
            {
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: 19920223,
                phoneNumber: '919122',
                email: 'johndoe@gmail.com',
                banckAccountNumber: '123456789'
            }
        ];
  
        localStorage.setItem('clients', JSON.stringify(clients));
        return 
      } else {
        console.log('Found Clients...');
      }
    }
  }