// ref HTML
const lblTicket1= document.querySelector('#lblTicket1');
const lblEscritorio1= document.querySelector('#lblEscritorio1');

const lblTicket2= document.querySelector('#lblTicket2');
const lblEscritorio2= document.querySelector('#lblEscritorio2');

const lblTicket3= document.querySelector('#lblTicket3');
const lblEscritorio3= document.querySelector('#lblEscritorio3');

const lblTicket4= document.querySelector('#lblTicket4');
const lblEscritorio4= document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
});

socket.on('estado-actual', (payload)=>{

    const audio = new Audio('./audio/new-ticket.mp3').play();
    if(payload.length > 0){
        const [ ticket1, ticket2, ticket3, ticket4 ] = payload;
    
        lblTicket1.innerText = 'Turno ' +ticket1.numero;
        lblEscritorio1.innerText = ticket1.escritorio;
    
        lblTicket2.innerText = 'Turno ' +ticket2.numero;
        lblEscritorio2.innerText = ticket2.escritorio;
    
        lblTicket3.innerText = 'Turno ' +ticket3.numero;
        lblEscritorio3.innerText = ticket3.escritorio;
    
        lblTicket4.innerText = 'Turno ' +ticket4.numero;
        lblEscritorio4.innerText = ticket4.escritorio;
    }else{
        lblTicket1.innerText = 'Turno -';
        lblEscritorio1.innerText = 'Area';

        lblTicket2.innerText = 'Turno -';
        lblEscritorio2.innerText = 'Area';

        lblTicket3.innerText = 'Turno -';
        lblEscritorio3.innerText = 'Area';
        
        lblTicket4.innerText = 'Turno -';
        lblEscritorio4.innerText = 'Area';
    }
}
)