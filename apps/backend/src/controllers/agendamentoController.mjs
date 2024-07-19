import z from 'zod';
import prismaClient from '../utils/prismaClient.mjs';
import {
  parseISO,
  startOfDay,
  endOfDay,
  startOfHour,
  endOfHour,
} from 'date-fns';

const agendamentoSchema = z.object({
  id: z.string().optional(),
  nome: z.string(),
  dataNasc: z.string(),
  dataAgendamento: z.string(),
  statusAtendimento: z.boolean().optional(),
});

export default class AgendamentoController {
  async save(request, response) {
    const agendamento = request.body;

    const { success, data, error } = agendamentoSchema.safeParse({
      nome: agendamento.nome,
      dataNasc: agendamento.dataNasc,
      dataAgendamento: agendamento.dataAgendamento,
      statusAtendimento: agendamento.statusAtendimento,
    });

    if (!success) {
      return response.status(400).send(error);
    }

    const dataNascConv = parseISO(agendamento.dataNasc);
    const dataAgenConv = parseISO(agendamento.dataAgendamento);

    //verificando a quantidade de agendamentos no dia
    const inicioDia = startOfDay(dataAgenConv);
    const fimDia = endOfDay(dataAgenConv);

    const totalAg = await prismaClient.agendamento.count({
      where: {
        dataAgendamento: {
          gte: inicioDia,
          lte: fimDia,
        },
      },
    });

    if (totalAg >= 20) {
      return response
        .status(400)
        .send({
          message:
            'Limite de 20 agendamentos por dia excedido! Escolha outro dia.',
        });
    }

    //verificando a quantidade de agendamentos na mesma hora
    const inicioHora = startOfHour(dataAgenConv);
    const fimHora = endOfHour(dataAgenConv);

    const agHora = await prismaClient.agendamento.count({
      where: {
        dataAgendamento: {
          gte: inicioHora,
          lte: fimHora,
        },
      },
    });

    if (agHora >= 2) {
      return response
        .status(400)
        .send({
          message:
            'Limite de 2 agendamentos por hora excedido! Escolha outro horário.',
        });
    }

    const newAg = await prismaClient.agendamento.create({
      data: {
        nome: agendamento.nome,
        dataNasc: dataNascConv,
        dataAgendamento: dataAgenConv,
        statusAtendimento: agendamento.statusAtendimento ?? false,
      },
    });

    response.send({ message: 'Agendamento salvo com sucesso!', data: newAg });
  }

  async findAll(request, response) {
    let { page = 1, pageSize = 20 } = request.query;

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const skip = (page - 1) * pageSize;

    const [agendamentoTotalCount, agendamentos] = await Promise.all([
      prismaClient.agendamento.count(),
      prismaClient.agendamento.findMany({
        skip,
        take: pageSize,
        orderBy: {
          dataAgendamento: 'asc',
        },
      }),
    ]);

    response.send({
      page,
      pageSize,
      totalCount: agendamentoTotalCount,
      items: agendamentos,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { success, data, error } = agendamentoSchema.safeParse(request.body);

    if (!success) {
      return response.status(400).send(error);
    }

    const dataNascConv = parseISO(data.dataNasc);
    const dataAgenConv = parseISO(data.dataAgendamento);

    // Verificando a quantidade de agendamentos no dia
    const inicioDia = startOfDay(dataAgenConv);
    const fimDia = endOfDay(dataAgenConv);

    const totalAg = await prismaClient.agendamento.count({
      where: {
        dataAgendamento: {
          gte: inicioDia,
          lte: fimDia,
        },
        NOT: {
          id: id,
        },
      },
    });

    if (totalAg >= 20) {
      return response.status(400).send({
        message:
          'Limite de 20 agendamentos por dia excedido! Escolha outro dia.',
      });
    }

    // Verificando a quantidade de agendamentos na mesma hora
    const inicioHora = startOfHour(dataAgenConv);
    const fimHora = endOfHour(dataAgenConv);

    const agHora = await prismaClient.agendamento.count({
      where: {
        dataAgendamento: {
          gte: inicioHora,
          lte: fimHora,
        },
        NOT: {
          id: id,
        },
      },
    });

    if (agHora >= 2) {
      return response.status(400).send({
        message:
          'Limite de 2 agendamentos por hora excedido! Escolha outro horário.',
      });
    }

    const updatedAg = await prismaClient.agendamento.update({
      data: {
        nome: data.nome,
        dataNasc: dataNascConv,
        dataAgendamento: dataAgenConv,
        statusAtendimento: data.statusAtendimento ?? false,
      },
      where: { id },
    });

    response.send({
      message: 'Agendamento atualizado com sucesso!',
      data: updatedAg,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    try {
      await prismaClient.agendamento.delete({ where: { id } });

      response.status(204).send({ message: 'Agendamento excluído.' });
    } catch (error) {
      response.status(404).send({ message: 'Agendamento não encontrado.' });
    }
  }

  async findOne(request, response) {
    const { id } = request.params;

    const agendamento = await prismaClient.agendamento.findUnique({
      where: { id },
    });

    if (!agendamento) {
      return response
        .status(404)
        .send({ message: 'Agendamento nao encontrado!' });
    }

    response.send(agendamento);
  }
}
