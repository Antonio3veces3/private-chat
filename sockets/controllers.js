const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.broadcast.emit("estado-actual", ticketControl.ultimos4);
  const ultimo = ticketControl.ultimo;
  socket.emit("ultimo-ticket", ultimo);

  socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);
  socket.emit("tickets-pendientes", ticketControl.tickets.length);

  socket.on("next-ticket", (payload, callback) => {
    const next = ticketControl.siguiente();
    callback(next);

    // TODO - Notificar nuevo ticket
    socket.broadcast.emit("estado-actual", ticketControl.ultimos4);
    socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);
    socket.emit("tickets-pendientes", ticketControl.tickets.length);
  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: "El escritorio es obligatorio",
      });
    }

    const turno = ticketControl.atenderTicket(escritorio);

    socket.broadcast.emit("estado-actual", ticketControl.ultimos4);
    socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);
    socket.emit("tickets-pendientes", ticketControl.tickets.length);

    // Notificar a la pantalla publica
    if (!turno) {
      callback({
        ok: false,
        msg: "Ya no hay tickets disponibles",
      });
    } else {
      callback({
        ok: true,
        turno
      });
    }
  });

  socket.on("reset", (payload) => {
      ticketControl.reset();
      socket.broadcast.emit("estado-actual", ticketControl.ultimos4);

      socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);
      socket.emit("tickets-pendientes", ticketControl.tickets.length);
      socket.broadcast.emit("ultimo-ticket", 0);
  });
};

module.exports = socketController;
