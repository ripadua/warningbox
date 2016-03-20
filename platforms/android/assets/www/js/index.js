/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

//        var email = localStorage.email;
//        if (email == undefined) {
//            window.location.href='login.html';
//        } else {
//            var estabelecimento = localStorage.estabelecimento_id;
//            if (estabelecimento == undefined) {
//                window.location.href='paginas/estabelecimento.html';    
//            } 
//            listar();
//        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        
    }
};

function listar() {
    var estabelecimento_id = localStorage.estabelecimento_id;
    $.mobile.loading("show");
	$.get("http://warningbox-ripadua.c9users.io/vencidos.json?estabelecimento_id=" + estabelecimento_id).done(function (msg) {
        var listview = $('#listview');
        listview.empty();
        if (msg.length == 0) {
            $("#nenhumvencido").show();
        } else {
            $("#nenhumvencido").hide();
            for (var i = 0; i < msg.length; i++) {
                var novoproduto = 
                    '<li produto="' + msg[i].id + '">' +
                        '<a href="#">' +
                            '<img src="data:image/jpeg;base64,' + msg[i].imagem + '" />' +
                            '<h4>' + (msg[i].diferencaDeDias * -1) + ' dia(s) vencido</h4>' +
                        '</a>' +
                        '<a href="#" onclick="remover(event)">Remover produto</a>' +
                    '</li>';
    		  listview.append(novoproduto);
            }
        }
		listview.listview('refresh');
        $.mobile.loading("hide");
    });
};

function remover(e) {
    e.preventDefault();
    if (confirm('O produto será removido da base de dados. Confirma remoção do produto?')) {
        var idProduto = e.target.parentElement.getAttribute('produto');
        var elem = e.target.parentElement;
        elem.parentNode.removeChild(elem);
        $.ajax({
            url: 'http://warningbox-ripadua.c9users.io/vencimentos/' + idProduto,
            type: 'delete',
            success: function(result) {
                alert('Produto removido com sucesso.');
                window.location.href='index.html';
            },
            fail: function(result) {
                alert('Ocorreu um erro ao excluir o produto. Tente novamente');
            }
        });
    } else {

    }

}


