**Login**
----
  Hacer LOGIN en el Backend.

* **URL**

  api/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  `{ email : "user@mail.com", pass : "123456" }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"User Logged In!"},"status":200,"user_info":[info],"user_profile":[profile_info]}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"notice":{"text":"User Not Found"},"status":400}`


**Logout**
----
  Hacer Logout en el Backend.

* **URL**

  api/logout

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"User Logged Out!"},"status":200}`


**Users - Ver Todos**
----
  Ver Todos los usuarios.

* **URL**

  api/users

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":"1","cc_nit":"1129572380","first_name":"Sergio Andres","last_name":"Blanco Caballero","email":"sergioblanco86@gmail.com","pass":"e10adc3949ba59abbe56e057f20f883e","type":"1"},{...},{...}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Users - Usuario logueado**
----
  Ver usuario actualmente logueado en el server.

* **URL**

  api/user

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"first_name":"Sergio","last_name":"Fandino","email":"sergiofandino@gmail.com","cc_nit":"11295557777"}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Users - Nuevo Usuario**
----
  Registrar nuevo usuario.

* **URL**

  api/user/new

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   `{ 
      cc_nit : "123456", 
      first_name : "Pedro",
      last_name : "Perez",
      email : "email@user.com",
      pass : "123456",
      type : 1
    }`

    `type: 1(Admin)|2(Artista)|3(Calificador)`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"User Added!"}, "status" : 200}`
 
* **Error Response:**

  * **Code:** GENERAL <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`

  * **Code:** USUARIO EXISTENTE <br />
    **Content:** `{"notice":{"text":"User already exsists!"}, "status" : 400}`


**Users - Editar**
----
  Editar usuario existente.

* **URL**

  api/user/update/:email

* **Method:**

  `PUT`
  
*  **URL Params**

   `email = "user@mail.com"`

* **Data Params**

   `{ 
      cc_nit : "123456", 
      first_name : "Pedro",
      last_name : "Perez",
      pass : "123456"
    }`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"User Updated!"},"status" : 200}`
 
* **Error Response:**

  * **Code:** GENERAL <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Users - Eliminar**
----
  Editar usuario existente.

* **URL**

  api/user/delete/:email

* **Method:**

  `DELETE`
  
*  **URL Params**

   `email = "user@mail.com"`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"User Deleted!"},"status" : 200}`
 
* **Error Response:**

  * **Code:** GENERAL <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Artista - Ver Todos**
----
  Ver Todos los artistas.

* **URL**

  api/artists

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":"1","id_user":"4","nombre_artista":"Rancid 2","foto_perfil":"URL_TO_PATH","foto_portada":"URL_TO_PATH_port","categoria":"0","subcategoria":"0","facebook":"rancid","instagram":"rancid","youtube":"UCFSjnN55tV-mecyG0mYvhdQ","video":"9SCF1zbsBfU","perfil":"Cualquier texto","valor":"50000000","descuento":"10","descservicio":"Incluye<br \/>- 10 temas<br \/>-Equipo tecnico","estado":"1","vencimiento":null},{...},{...}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Artista - Ver Un Artista**
----
  Ver un  artistas.

* **URL**

  api/artist/:id

* **Method:**

  `GET`
  
*  **URL Params**

   `id=id artista`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":"1","id_user":"4","nombre_artista":"Rancid 2","foto_perfil":"URL_TO_PATH","foto_portada":"URL_TO_PATH_port","categoria":"0","subcategoria":"0","facebook":"rancid","instagram":"rancid","youtube":"UCFSjnN55tV-mecyG0mYvhdQ","video":"9SCF1zbsBfU","perfil":"Cualquier texto","valor":"50000000","descuento":"10","descservicio":"Incluye<br \/>- 10 temas<br \/>-Equipo tecnico","estado":"1","vencimiento":null}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`



**Artista - Ver Score**
----
  Ver score de un  artista.

* **URL**

  api/artist/score/:id

* **Method:**

  `GET`
  
*  **URL Params**

   `id=id artista`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"score":3.57142857, "status" : 200}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`




**Artista - Buscar**
----
  Buscar artistas.

* **URL**

  /artist/search/:search

* **Method:**

  `GET`
  
*  **URL Params**

   `search = string para buscar URL encoded`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":"1","id_user":"4","nombre_artista":"Rancid 2","foto_perfil":"URL_TO_PATH","foto_portada":"URL_TO_PATH_port","categoria":"0","subcategoria":"0","facebook":"rancid","instagram":"rancid","youtube":"UCFSjnN55tV-mecyG0mYvhdQ","video":"9SCF1zbsBfU","perfil":"Cualquier texto","valor":"50000000","descuento":"10","descservicio":"Incluye<br \/>- 10 temas<br \/>-Equipo tecnico","estado":"1","vencimiento":null},{...},{...}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`



**Artista - Ver Un Artista por id de usuario**
----
  Ver un  artistas.

* **URL**

  api/artist/user/:id

* **Method:**

  `GET`
  
*  **URL Params**

   `id= id usuario`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":"1","id_user":"4","nombre_artista":"Rancid 2","foto_perfil":"URL_TO_PATH","foto_portada":"URL_TO_PATH_port","categoria":"0","subcategoria":"0","facebook":"rancid","instagram":"rancid","youtube":"UCFSjnN55tV-mecyG0mYvhdQ","video":"9SCF1zbsBfU","perfil":"Cualquier texto","valor":"50000000","descuento":"10","descservicio":"Incluye<br \/>- 10 temas<br \/>-Equipo tecnico","estado":"1","vencimiento":null}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`



**Artista - artista logueado**
----
  Ver artista/usuario actualmente logueado en el server.

* **URL**

  api/artist/user/logged

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":"1","id_user":"4","nombre_artista":"Rancid 2","foto_perfil":"URL_TO_PATH","foto_portada":"URL_TO_PATH_port","categoria":"0","subcategoria":"0","facebook":"rancid","instagram":"rancid","youtube":"UCFSjnN55tV-mecyG0mYvhdQ","video":"9SCF1zbsBfU","perfil":"Cualquier texto","valor":"50000000","descuento":"10","descservicio":"Incluye<br \/>- 10 temas<br \/>-Equipo tecnico","estado":"1","vencimiento":null}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Artista - Nuevo Artista**
----
  Registrar nuevo artista.

* **URL**

  api/artist/add

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   `{
      id_user : 4,
      nombre_artista : "Rancid",
      foto_perfil : "URL_TO_PATH",
      foto_portada : "URL_TO_PATH_port",
      categoria : "rock",
      subcategoria : "punk",
      facebook : "rancid",
      instagram : "rancid",
      youtube : "UCFSjnN55tV-mecyG0mYvhdQ",
      video : "9SCF1zbsBfU",
      perfil : "Cualquier texto",
      valor : "50000000",
      descuento : "10",
      descservicio : "Solo tocar"
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"Artist Added!"}, "status" : 200}`
 
* **Error Response:**

  * **Code:** GENERAL <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Artista - Editar**
----
  Editar artista existente.

* **URL**

  /artist/update/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   `id = id artista`

* **Data Params**

   `{
      nombre_artista : "Rancid",
      foto_perfil : "URL_TO_PATH",
      foto_portada : "URL_TO_PATH_port",
      categoria : "rock",
      subcategoria : "punk",
      facebook : "rancid",
      instagram : "rancid",
      youtube : "UCFSjnN55tV-mecyG0mYvhdQ",
      video : "9SCF1zbsBfU",
      perfil : "Cualquier texto",
      valor : "50000000",
      descuento : "10",
      descservicio : "Solo tocar"
    }`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"Artist Updated!"}, "status" : 200}`
 
* **Error Response:**

  * **Code:** GENERAL <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Artista - Eliminar**
----
  Eliminar artista.

* **URL**

  api/artist/delete/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   `id = id artista`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"Artist Deleted!"}, "status" : 200}`
 
* **Error Response:**

  * **Code:** GENERAL <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`



**Calificador - Ver Todos**
----
  Ver Todos los Calificadores.

* **URL**

  api/calificadores

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":"1","id_user":"3","tipo_cal":"empresa","foto_perfil":"URL_TO_PATH","foto_portada":"URL_TO_PATH_port","preferencias":"[{'cat':'rock','subcat': ['punk','grounge']},{'cat':'tropical','subcat': ['salsa','merengue']}]"},{...},{...}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Calificador - Ver Un Calificador**
----
  Ver un  Calificador.

* **URL**

  api/calificador/:id

* **Method:**

  `GET`
  
*  **URL Params**

   `id=id Calificador`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":"1","id_user":"3","tipo_cal":"empresa","foto_perfil":"URL_TO_PATH","foto_portada":"URL_TO_PATH_port","preferencias":"[{'cat':'rock','subcat': ['punk','grounge']},{'cat':'tropical','subcat': ['salsa','merengue']}]"}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`



**Calificador - Ver Un Calificador por id de usuario**
----
  Ver un  Calificadors.

* **URL**

  api/calificador/user/:id

* **Method:**

  `GET`
  
*  **URL Params**

   `id= id usuario`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":"1","id_user":"3","tipo_cal":"empresa","foto_perfil":"URL_TO_PATH","foto_portada":"URL_TO_PATH_port","preferencias":"[{'cat':'rock','subcat': ['punk','grounge']},{'cat':'tropical','subcat': ['salsa','merengue']}]"}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`



**Calificador - Calificador logueado**
----
  Ver Calificador/usuario actualmente logueado en el server.

* **URL**

  api/calificador/user/logged

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":"1","id_user":"3","tipo_cal":"empresa","foto_perfil":"URL_TO_PATH","foto_portada":"URL_TO_PATH_port","preferencias":"[{'cat':'rock','subcat': ['punk','grounge']},{'cat':'tropical','subcat': ['salsa','merengue']}]"}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Calificador - Nuevo Calificador**
----
  Registrar nuevo Calificador.

* **URL**

  api/calificador/add

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   `{
      id_user : 3,
      tipo_cal : "empresa",
      foto_perfil : "URL_TO_PATH",
      foto_portada : "URL_TO_PATH_port",
      preferencias : "[{'cat':'rock','subcat': ['punk','grounge']},{'cat':'tropical','subcat': ['salsa','merengue']}]"
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"calificador Added!"}, "status" : 200}`
 
* **Error Response:**

  * **Code:** GENERAL <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Calificador - Editar**
----
  Editar Calificador existente.

* **URL**

  /calificador/update/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   `id = id Calificador`

* **Data Params**

   `{
      foto_perfil : "URL_TO_PATH",
      foto_portada : "URL_TO_PATH_port",
      preferencias : "[{'cat':'rock','subcat': ['punk','grounge']},{'cat':'tropical','subcat': ['salsa','merengue']}]"
    }`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"calificador Updated!"}, "status" : 200}`
 
* **Error Response:**

  * **Code:** GENERAL <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Calificador - Eliminar**
----
  Eliminar Calificador.

* **URL**

  api/calificador/delete/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   `id = id Calificador`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"calificador Deleted!"}, "status" : 200}`
 
* **Error Response:**

  * **Code:** GENERAL <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`


**Calificar!**
----
  Calificar un artista.

* **URL**

  /calificar/:id_artista/:id_calificador

* **Method:**

  `DELETE`
  
*  **URL Params**

   `id_artista = id Artista`
   `id_calificador = id Calificador`

* **Data Params**

   `{
      originalidad : 5,
      contenido : 5,
      propuesta : 5,
      imagen : 5,
      calidad : 5,
      comentario : "El artista se ve muy bien pero le falta originalidad"
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"notice":{"text":"Calification Added!"}, "status" : 200,"score":3.75000000}`
 
* **Error Response:**

  * **Code:** GENERAL <br />
    **Content:** `{"error":{"text":'ERROR MESSAGE'}}`