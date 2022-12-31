// =====================================================
// Getting user credentials if local storage has
// been set.
// =====================================================


// 1. Check if the code is being executed in client side
/*if ((typeof window != 'undefined' && window.document) && localStorage.getItem(`COREX`) !== null) {

  // 2. Check expiration date, if it has not been expired then make requests and if not, remove the storage
  // @ts-ignore
  const localStorageItem = new Date(Number(localStorage.getItem(`COREX`).split(`!@_#`)[0]));
  localStorageItem.setDate(localStorageItem.getDate() + 1);
  if (new Date().getTime() < localStorageItem.getTime()) {

    const REQUEST = new XMLHttpRequest();
    REQUEST.open(`GET`, `${window.API_URL}/store/v1/users/account`, false);
    REQUEST.setRequestHeader(`Authorization`, localStorage.getItem(`COREX`).split(`!@_#`)[1]);
    REQUEST.send();

    if (REQUEST.status ) {
      window.user = JSON.parse(REQUEST.responseText);
      if (window.user.role === 'CEO' && !window.location.pathname.includes('/admin')) {
        window.location.replace('/admin');
      }
    }

  } else {
    localStorage.removeItem(`COREX`);
  }


}*/

// The above code works like a charm but, as long as it is just a test...
if ((typeof window != 'undefined' && window.document) && localStorage.getItem(`COREX`) !== null) {
  window.user = {
    id: '1',
    email: 'example@example.com',
    phone: '+98902_you_wish',
    firstName: 'Ryan',
    lastName: 'Asgari',
    role: 'gods_perfect_creation',
    token: 'That, is a private question',
    created: 'I was BORN god damn it...',
    profile: 'wikipedia.com/sexiest-man-alive/profile'
  }
}
