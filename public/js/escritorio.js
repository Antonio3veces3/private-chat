//HTML Ref
const lblEscritorio = document.querySelector('#escritorio');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');
const btnReset = document.querySelector('#reset');

const searchParams = new URLSearchParams( window.location.search );
if(!searchParams.has('escritorio')){
    window.location = "index.html"
    throw new Error ('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none'
const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (payload)=>{
    //lblNuevoTicket.innerText = payload;
})

socket.on('tickets-pendientes', (payload)=>{
    if(payload === 0){
        lblPendientes.style.display = 'none'
    }else{
        divAlerta.style.display = 'none';
        lblPendientes.style.display = ''
        lblPendientes.innerText = payload;
    }
})


btnAtender.addEventListener('click', ()=>{
    socket.emit('atender-ticket', {escritorio}, ({ok, turno})=>{
        if(!ok){
            lblTicket.innerText = `....`;
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = `Turno ${turno.numero}`;
    })
});

btnReset.addEventListener('click', ()=>{
    socket.emit('reset', 'now');
});