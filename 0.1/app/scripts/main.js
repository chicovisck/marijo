/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  var navdrawerContainer = querySelector('.navdrawer-container');
  var body = document.body;
  var appbarElement = querySelector('.app-bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');
  var signin = document.getElementById('signin');
  var email = document.getElementById('email');
  var password = document.getElementById('password');


  // FIREBASE SETUP
  var myFirebaseRef = new Firebase("https://brilliant-inferno-7980.firebaseio.com/");

  


  signin.addEventListener('click', createUser);

  // FUNCtiONS ----------------------------------------------------- //

  function createUser(userData) {
    //GET

  
    var e = email.value;
    var p = password.value;

    var validated = true;

    if(!validateEmail(e)) {
      validated = false
      alert('Informe um e-mail válido');
      return false;
    }
    
    if(p.length < 6) {
      validated = false;
      alert('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    
    if(validated == true)
    {
      myFirebaseRef.createUser({
      email    : e,
      password : p,
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        alert('usuario '+ e +'criado com sucesso');
      }
    });
    }
  }

  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function closeMenu() {
    body.classList.remove('open');
    appbarElement.classList.remove('open');
    navdrawerContainer.classList.remove('open');
  }

  function toggleMenu() {
    body.classList.toggle('open');
    appbarElement.classList.toggle('open');
    navdrawerContainer.classList.toggle('open');
    navdrawerContainer.classList.add('opened');
  }

  /*main.addEventListener('click', closeMenu);
  menuBtn.addEventListener('click', toggleMenu);
  navdrawerContainer.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });*/
})();
