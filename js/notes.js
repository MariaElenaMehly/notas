(function(){
    var list = document.getElementById('list-notes'),
        newNote = document.getElementById('new-note');
    
    newNote.addEventListener('click', function(){
        var tr = document.createElement('tr'),
            td = document.createElement('td'),
            input = document.createElement('input');
            td.setAttribute('class', 'write');
            td.setAttribute('colspan', '3');
            tr.appendChild(td)
            td.appendChild(input);
        list.children[0].appendChild(tr);
        input.focus();
        input.addEventListener('focusout', save)
        input.addEventListener('keydown', function(event){if(event.keyCode === 13){newNote.focus();}});
    });
    var event = function()
    {
        for(var i=0; i<list.rows.length; i++)
        {
            list.rows[i].addEventListener('mouseover', edit);
            list.rows[i].addEventListener('mouseout', notedit);
        }
    }
    var edit = function()
    {
        this.children[2].children[0].className='';
        this.children[2].children[0].addEventListener('click', change);
        this.children[0].children[0].addEventListener('click', remove);
    }
    var notedit = function()
    {
        this.children[2].children[0].className='hide'; 
    }
    var save = function()
    {
        if(this.value != '')
        {
            var tr = document.createElement('tr');
            var content = '<td><img class="remove" src="img/remove.png" alt="Eliminar"></td>';
                content += '<td class="note">'+this.value+'</td>';
                content += '<td><img class="hide" src="img/edit.png" alt="Editar"></td>';
            tr.innerHTML = content;
            list.children[0].appendChild(tr);
            event();
        }   
        this.parentNode.parentNode.remove();
    }
    var change = function()
    {
        var row = this.parentNode.parentNode;
        row.removeEventListener('mouseover', edit);
        row.removeEventListener('mouseout', notedit);
        var note = row.children[1],
            initialValue = note.innerHTML,
            td = document.createElement('td'),
            input = document.createElement('input');
            input.value=initialValue.trim();
            td.setAttribute('class', 'write');
            td.setAttribute('colspan', '3');            
            td.appendChild(input);
            row.innerHTML='';
            row.appendChild(td);
            input.focus();
            input.addEventListener('focusout', saveChange);
            input.addEventListener('keydown', function(event){
                if(event.keyCode === 13){
                    input.blur()
                }
            });

    }

    var saveChange = function()
    {
        if(this.value != '')
        {
            console.log(this.parentNode.parentNode)
            var tr = this.parentNode.parentNode;
            var content = '<td><img class="remove" src="img/remove.png" alt="Eliminar"></td>';
                content += '<td class="note">'+this.value+'</td>';
                content += '<td><img class="hide" src="img/edit.png" alt="Editar"></td>';
                console.log(tr)
            tr.innerHTML = content;
            event();
        }   
    }
    var remove = function()
    {
        this.parentNode.parentNode.remove();
    }


    event();
}());