function fifo(cantidad, llegada, duracion ){
    var procesos= [];
    var tiempototal = 0;
    for (let i = 0; i < cantidad; i++) {
      var proceso = {'llegada':llegada[i],'duracion':duracion[i]};
      procesos.push(proceso);
      tiempototal+=duracion[i];
    }
    //ordenamiento de los procesos:
    for (let i = 0; i < cantidad-1; i++) {
      for (let j = i; j < cantidad; j++) {
        if(procesos[i].llegada>procesos[j].llegada){
          var aux = procesos[i];
          procesos[i] = procesos[j];
          procesos[j] = aux;
        }
      }
    }
    var aux = procesos[0].llegada;
    for (let i = 0; i < cantidad; i++) {
      if(procesos[i].llegada < aux){
        procesos[i].tiempoinicio =  aux;
        aux += procesos[i].duracion;
      }
      else{
        procesos[i].tiempoinicio = procesos[i].llegada;
        aux = procesos[i].tiempoinicio+procesos[i].duracion;
      }
    }
    console.log(procesos);
    var cola = [];
    for (let i = 0; i < tiempototal; i++) {
      cola.push("");
    }
    for (let i = 0; i < cantidad; i++) {
      for (let j = 0; j < procesos[i].duracion; j++) {
        cola[procesos[i].tiempoinicio+j]="P"+String(i);
      }
    }
    console.log(cola);

    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.appendChild(document.createTextNode('Proceso'));
    tr.appendChild(td);
    var td = document.createElement('td');
    td.appendChild(document.createTextNode('tiempo de llegada'));
    tr.appendChild(td);
    var td = document.createElement('td');
    td.appendChild(document.createTextNode('duracion'));
    tr.appendChild(td);
    tbdy.appendChild(tr);
    for (let j = 0; j < cantidad; j++) {
      var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode('Proceso'+String(j)));
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
    body.appendChild(tbl)
}