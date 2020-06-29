import { Router, request, response } from 'express';
import { parseISO } from 'date-fns'

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentsService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({ date: parsedDate, provider })

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;