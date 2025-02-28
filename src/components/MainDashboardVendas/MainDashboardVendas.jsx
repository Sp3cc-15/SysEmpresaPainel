import React, { useState, useEffect } from 'react';
import MainSection from './styled.js';
import { MdAttachMoney } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { TbChartInfographic } from "react-icons/tb";
import { LuShoppingCart } from "react-icons/lu";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FirstSection = ({ dataInicial, dataFinal, setDataInicial, setDataFinal }) => {
  const [totalPeriodo, setTotalPeriodo] = useState(0);
  const [quantidadeVendasPeriodo, setQuantidadeVendasPeriodo] = useState(0);
  const [ticketMedioPeriodo, setTicketMedioPeriodo] = useState(0);

  const [totalMesAnterior, setTotalMesAnterior] = useState(0);
  const [quantidadeVendasMesAnterior, setQuantidadeVendasMesAnterior] = useState(0);
  const [ticketMedioMesAnterior, setTicketMedioMesAnterior] = useState(0);

  // Estados para "No Mês" e "No Dia"
  const [totalNoMes, setTotalNoMes] = useState(0);
  const [quantidadeNoMes, setQuantidadeNoMes] = useState(0);
  const [ticketMedioNoMes, setTicketMedioNoMes] = useState(0);

  const [totalNoDia, setTotalNoDia] = useState(0);
  const [quantidadeNoDia, setQuantidadeNoDia] = useState(0);
  const [ticketMedioNoDia, setTicketMedioNoDia] = useState(0);

  useEffect(() => {
    if (dataInicial && dataFinal) {
      fetchData();
    }
  }, [dataInicial, dataFinal]);

  const fetchData = async () => {
    try {
      const dataToSend = {
        "IdEmpresa": 3,
        "IdCateg": 0,
        "CodCidade": 0,
        "IdUf": "AL",
        "IdFilial": 0,
        "IdVendedor": 0,
        "IdGrupo": 0,
        "IdFornecedor": 0,
        "DtIni": dataInicial,
        "DtFim": dataFinal
      };

      // console.log('Dados sendo enviados:', dataToSend);

      const response = await axios.post('http://localhost:3000/api/porevolucao', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log('Dados recebidos:', response.data);

      let parsedData = response.data;
      if (typeof parsedData === 'string') {
        parsedData = JSON.parse(parsedData);
      }

      processarDados(parsedData);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    }
  };

  const processarDados = (dados) => {
    // Total no Período
    const totalNoPeriodo = dados.reduce((total, item) => total + parseFloat(item.ValorTotal), 0);
    const quantidadeNoPeriodo = dados.reduce((total, item) => total + parseInt(item.Qtd), 0);
    const ticketMedioNoPeriodo = quantidadeNoPeriodo > 0 ? totalNoPeriodo / quantidadeNoPeriodo : 0;

    setTotalPeriodo(totalNoPeriodo);
    setQuantidadeVendasPeriodo(quantidadeNoPeriodo);
    setTicketMedioPeriodo(ticketMedioNoPeriodo);

    // Vendas No Mês Anterior
    const dataInicialDate = new Date(dataInicial);
    const mesAnteriorDate = new Date(dataInicialDate.getFullYear(), dataInicialDate.getMonth() - 1, 1);
    const mesAnterior = mesAnteriorDate.getMonth() + 1;
    const anoAnterior = mesAnteriorDate.getFullYear();

    const dadosMesAnterior = dados.filter(item => item.Mes === mesAnterior && item.Ano === anoAnterior);

    const totalMesAnterior = dadosMesAnterior.reduce((total, item) => total + parseFloat(item.ValorTotal), 0);
    const quantidadeMesAnterior = dadosMesAnterior.reduce((total, item) => total + parseInt(item.Qtd), 0);
    const ticketMedioMesAnterior = quantidadeMesAnterior > 0 ? totalMesAnterior / quantidadeMesAnterior : 0;

    setTotalMesAnterior(totalMesAnterior);
    setQuantidadeVendasMesAnterior(quantidadeMesAnterior);
    setTicketMedioMesAnterior(ticketMedioMesAnterior);

    // No Mês
    const mesAtual = dataInicialDate.getMonth() + 1;
    const anoAtual = dataInicialDate.getFullYear();

    const dadosNoMes = dados.filter(item => item.Mes === mesAtual && item.Ano === anoAtual);

    const totalNoMes = dadosNoMes.reduce((total, item) => total + parseFloat(item.ValorTotal), 0);
    const quantidadeNoMes = dadosNoMes.reduce((total, item) => total + parseInt(item.Qtd), 0);
    const ticketMedioNoMes = quantidadeNoMes > 0 ? totalNoMes / quantidadeNoMes : 0;

    setTotalNoMes(totalNoMes);
    setQuantidadeNoMes(quantidadeNoMes);
    setTicketMedioNoMes(ticketMedioNoMes);

    // No Dia
    const dataHoje = new Date().toISOString().split('T')[0];

    const dadosNoDia = dados.filter(item => item.MesAno === `${dataInicialDate.getMonth() + 1}/${dataInicialDate.getFullYear()}` && dataHoje === dataInicial);

    const totalNoDia = dadosNoDia.reduce((total, item) => total + parseFloat(item.ValorTotal), 0);
    const quantidadeNoDia = dadosNoDia.reduce((total, item) => total + parseInt(item.Qtd), 0);
    const ticketMedioNoDia = quantidadeNoDia > 0 ? totalNoDia / quantidadeNoDia : 0;

    setTotalNoDia(totalNoDia);
    setQuantidadeNoDia(quantidadeNoDia);
    setTicketMedioNoDia(ticketMedioNoDia);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dataInicial && dataFinal) {
      const dataInicioDate = new Date(dataInicial);
      const dataFimDate = new Date(dataFinal);

      if (dataInicioDate > dataFimDate) {
        toast.error("A data inicial não pode ser maior que a data final.");
      } else {
        toast.success("Filtros aplicados com sucesso!");
        // Aqui você pode chamar fetchData() se quiser atualizar imediatamente após a submissão
        // fetchData();
      }
    } else {
      toast.error("Por favor, preencha todos os campos");
    }
  };

  return (
    <MainSection>
      <p><strong>Vendas</strong> Dashboard</p>
      <main className='first'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date-inicial">Data inicial:</label>
          <input
            type="date"
            id="date-inicial"
            name="date-inicial"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />

          <label htmlFor="date-final">Data final:</label>
          <input
            type="date"
            id="date-final"
            name="date-final"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />

          <label htmlFor="options">Selecione uma opção:</label>
          <select onChange={(e) => console.log(e.target.value)} id="options" name="options">
            <option value="option1">Por Valor</option>
            <option value="option2">Por Quantidade</option>
          </select>

          <button type="submit">Pesquisar</button>
        </form>

        <span>Movimento geral no período</span>
      </main>

      <main className='second'>
        {/* Total no Período */}
        <section>
          <div>
            <h4>Total no Período</h4>
            <MdAttachMoney />
          </div>
          <div>
            <p>Total R$</p>
            <span>R${totalPeriodo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div>
            <p>Quantidade de Vendas:</p>
            <span>{quantidadeVendasPeriodo}</span>
          </div>
          <div>
            <p>Ticket Médio:</p>
            <span>R${ticketMedioPeriodo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </section>

        {/* Vendas No Mês Anterior */}
        <section>
          <div>
            <h4>Vendas No Mês Anterior</h4>
            <FiShoppingBag />
          </div>
          <div>
            <p>Total R$</p>
            <span>R${totalMesAnterior.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div>
            <p>Quantidade de Vendas:</p>
            <span>{quantidadeVendasMesAnterior}</span>
          </div>
          <div>
            <p>Ticket Médio:</p>
            <span>R${ticketMedioMesAnterior.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </section>

        {/* No Mês */}
        <section>
          <div>
            <h4>No Mês</h4>
            <TbChartInfographic />
          </div>
          <div>
            <p>Total R$</p>
            <span>R${totalNoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div>
            <p>Quantidade de Vendas:</p>
            <span>{quantidadeNoMes}</span>
          </div>
          <div>
            <p>Ticket Médio:</p>
            <span>R${ticketMedioNoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </section>

        {/* No Dia */}
        <section>
          <div>
            <h4>No Dia</h4>
            <LuShoppingCart />
          </div>
          <div>
            <p>Total R$</p>
            <span>R${totalNoDia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div>
            <p>Quantidade de Vendas:</p>
            <span>{quantidadeNoDia}</span>
          </div>
          <div>
            <p>Ticket Médio:</p>
            <span>R${ticketMedioNoDia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </section>
      </main>
      <ToastContainer />
    </MainSection>
  );
};
