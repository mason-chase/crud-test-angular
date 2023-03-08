export class Init {
    load() {
      if(localStorage.getItem('clients') === null || localStorage.getItem('clients') == undefined) {
        let clients: never[] = [];
        localStorage.setItem('clients', JSON.stringify(clients));
        return;
      } 
    }
  }