'use strict';

window.addEventListener("load", function(){

    // Se definen las variables del script

    const container_search = document.getElementById("box-search-user"),
        container_user = document.getElementById("box-user"),

        button_search = document.querySelector("#button_search"),
        error_box = document.getElementById("error-msg"),

        arrow_button = document.querySelector("#arrow_to_menu"),

        user_name = document.querySelector("#user_name"),
        user_photo = document.getElementById("user_photo"),
        user_desc = document.querySelector("#user_desc"),
        user_location = document.querySelector("#user_location"),
        user_email = document.querySelector("#user_email"),
        user_social_media_box = document.querySelector("#user_social_media"),
        user_twitter = document.querySelector("#twitter"),
        user_blog = document.querySelector("#blog"),

        repositories = document.querySelector("#repositories"),
        followers = document.querySelector("#followers"),
        following = document.querySelector("#following");


    // Funcion que da inicio a todo el script. Cuando el input tiene un usuario
    // y se da click a boton buscar comenzara la peticion fetch.

    button_search.addEventListener("click", function(){

        const input_search = document.querySelector("#input_search").value;

        if(input_search != ''){
            let URL_GitHub = "https://api.github.com/users/";

            let UserInfo;

            // Se hace peticion a la API de GitHub para recibir la informacion del usuario

            fetch(URL_GitHub+input_search)
                .then( userdata => userdata.json())
                .then( userdata => UserInfo = userdata)
                .then( () => {

                    // Se borra consola en caso de hayan existido errores en la busqueda
                    console.clear();

                    // Una vez recibidos los datos y cumplidas las promesas
                    // se hace el cambio de datos principales en el DOM

                    user_name.innerHTML = UserInfo.name;
                    user_photo.src = UserInfo.avatar_url;
                    user_desc.innerHTML = UserInfo.bio;

                    // Se verifica si el usuario tiene publica su ubicacion para
                    // mostrar u ocultar el elemento del DOM

                    if(UserInfo.location != null){
                        user_location.style.display = 'block';
                        user_location.innerHTML = UserInfo.location;
                    }else{
                        user_location.style.display = 'none';
                    }

                    // Se verifica si el usuario tiene publico su email para
                    // mostrar u ocultar el elemento del DOM

                    if(UserInfo.email != null){
                        user_email.style.display = 'block';
                        user_email.innerHTML = UserInfo.email;
                    }else{
                        user_email.style.display = 'none';
                    }

                    // Se agregan los enlaces correspondientes a los iconos con
                    // la informacion del usuario.

                    user_twitter.href = "https://twitter.com/" + UserInfo.twitter_username;
                    user_blog.href = UserInfo.blog;

                    // Se comprueba si el usuario tiene Twitter, blog, ambos o ninguno
                    // para mostrar los campos en el DOM

                    if(UserInfo.blog == "" && UserInfo.twitter_username == null){
                        user_social_media_box.style.display = "none";

                    }else if(UserInfo.blog != "" && UserInfo.twitter_username == null){
                        user_social_media_box.style.display = "block";
                        user_blog.style.display = "inline-block";
                        user_twitter.style.display = "none";
                        
                    }else if(UserInfo.twitter_username != null && UserInfo.blog == ""){
                        user_social_media_box.style.display = "block";
                        user_twitter.style.display = "inline-block";
                        user_blog.style.display = "none";
                    }else{
                        user_social_media_box.style.display = "block";
                        user_twitter.style.display = "inline-block";
                        user_blog.style.display = "inline-block";
                    }

                    // Cambio de datos en las estadisticas

                    repositories.innerHTML = UserInfo.public_repos;
                    followers.innerHTML = UserInfo.followers;
                    following.innerHTML = UserInfo.following;

                    let URL_repos = UserInfo.repos_url;
                    let Repos = new Array();

                    // Se hace fecth a los repositorios del usuario para mostarlos
                    // en la lista final de la tarjeta

                    fetch(URL_repos)
                        .then(Repos_info => Repos_info.json())
                        .then(Repos_info => Repos = Repos_info)
                        .then( () =>{

                            // Se ordenan los elementos del array por los id de
                            // cada objeto y se guarda en un array

                            Repos.sort(function(a,b){
                                return a.id - b.id;
                            });

                            // Se organiza el array de mayor a menor

                            Repos.reverse();

                            // Se llaman los elementos del DOM y se remplazan sus valores

                            const repository1 = document.getElementById("repository-1"),
                                repository2 = document.getElementById("repository-2"),
                                repository3 = document.getElementById("repository-3");

                            repository1.innerHTML = Repos[0].name;
                            repository1.href = Repos[0].svn_url;
                            repository2.innerHTML = Repos[1].name;
                            repository2.href = Repos[1].svn_url;
                            repository3.innerHTML = Repos[2].name;
                            repository3.href = Repos[2].svn_url;

                            // Una vez haya finalizado todo este proceso de acceder a datos,
                            // organizarlos y agregarlos al DOM, se desactiva el buscador inicial,
                            // y se muestra la tarjeta de perfil con toda la informacion ya cargada.
                            // Si se hace este cambio de tarjetas al inicio y se busca un segundo perfil
                            // la informacion podria ser cargada mientras se muestra la del usuario anterior.
                            // Agregando estas instrucciones al final de la ultima promesa evitamos eso.

                            container_search.style.display = "none";
                            container_user.style.display = "block";
                            error_box.style.display = "none";

                    })
                    .catch(error => {
                        console.clear();
                        error_box.style.display = "block";
                        error_box.innerHTML = "No se encontró el usuario o no hay conexión a internet";
                    })
                }
            );
        }
    });

    // Funcion que hace que cuando se oprima el boton de "Volver atras"
    // En la tarjeta del usuario, se oculte la tarjeta y se muestre el buscador.

    arrow_button.addEventListener("click", function(){
            container_search.style.display = "block";
            container_user.style.display = "none";
    })

});