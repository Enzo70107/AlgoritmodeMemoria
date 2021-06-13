function sjf(cantidad, llegada, duracion ){
    var procesos= [];
    for (let i = 0; i < cantidad; i++) {
      var proceso = {'llegada':llegada[i],'duracion':duracion[i],'numero':i};
      procesos.push(proceso);
    }
    //ordenamiento de los procesos con respecto a su llegada:
    for (let i = 0; i < cantidad-1; i++) {
      for (let j = i; j < cantidad; j++) {
        if(procesos[i].llegada>procesos[j].llegada){
          var aux = procesos[i];
          procesos[i] = procesos[j];
          procesos[j] = aux;
        }
      }
    }
    var iterador = 0;
    var cola = [];
    var pendientes = [];
    for (let i = 0; i < procesos.length; i++) {
      var proceso = {'llegada':procesos[i].llegada,'duracion':procesos[i].duracion,'numero':procesos[i].numero};
      pendientes.push(proceso);
    }
    var tiempo = 0;
    do{
      //Analizar el proceso que sigue, cambiando el iterador:
      var menor;
      for (let i = 0; i < pendientes.length; i++) {
        if(pendientes[i].llegada <= tiempo){
          menor = pendientes[i].duracion;
        }
      }
      for (let i = 0; i < pendientes.length; i++) {
        if(pendientes[i].llegada <= tiempo){
          if(pendientes[i].duracion < menor){
            menor = pendientes[i].duracion;
            iterador = i;
          }
        }
      }
      if(pendientes[iterador].llegada <= tiempo){
          for (let j = 0; j < pendientes[iterador].duracion; j++) {
              cola.push("P"+String(pendientes[iterador].numero));
          }
          tiempo+=pendientes[iterador].duracion;
          pendientes.splice(iterador,1);
          if(iterador >= pendientes.length){
            iterador = 0;
          }
      }
      else{
          cola.push("");
          tiempo++;
      }
    }while (pendientes.length !== 0)
    console.log(cola);

    //Tabla para mostrar los procesos:
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    var tr = document.createElement('tr');
    var text = document.createElement('p');
    text.style.width = '100%';
    text.style.textAlign = 'center';
    body.appendChild(text);
    var td = document.createElement('td');
    td.appendChild(document.createTextNode('Proceso'));
    tr.appendChild(td)
    var td = document.createElement('td');
    td.appendChild(document.createTextNode('tiempo de llegada'));
    tr.appendChild(td)
    var td = document.createElement('td');
    td.appendChild(document.createTextNode('duracion'));
    tr.appendChild(td)
    tbdy.appendChild(tr);
    for (let j = 0; j < cantidad; j++) {
      var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode('Proceso'+String(procesos[j].numero)));
        tr.appendChild(td);
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(procesos[j].llegada));
        tr.appendChild(td);

        var td = document.createElement('td');
        td.appendChild(document.createTextNode(procesos[j].duracion));
        tr.appendChild(td);

      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)


    //Tabla para mostrar la cola
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');

    var tr = document.createElement('tr');
    for (let i = 0; i < cola.length; i++) {
      var td = document.createElement('td');
      if(cola[i]){
      td.appendChild(document.createTextNode(cola[i]));
      }
      else{
        td.appendChild(document.createTextNode('\u00A0'));
      }
      tr.appendChild(td);
    }
    tbdy.appendChild(tr);

    var tr = document.createElement('tr');
    for (let i = 0; i < cola.length; i++) {
      var td = document.createElement('td');
      td.appendChild(document.createTextNode("t"+String(i)));
      tr.appendChild(td);
    }
    tbdy.appendChild(tr);


    tbl.appendChild(tbdy);
    body.appendChild(tbl);
}