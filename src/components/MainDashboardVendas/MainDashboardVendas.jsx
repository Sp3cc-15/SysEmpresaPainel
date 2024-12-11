import MainSection from './styled.js';
import { MdAttachMoney } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { TbChartInfographic } from "react-icons/tb";
import { LuShoppingCart } from "react-icons/lu";
import { useState } from 'react';

export const FirstSection = () => {
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    return (
        <MainSection>
            <p><strong>Vendas</strong> Dashboard</p>
            <main className='first'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const dataInicio = formData.get('date-inicial');
                    const dataFim = formData.get('date-final');
                    
                    setDataInicial(dataInicio);
                    setDataFinal(dataFim);

                    console.log('Data Inicial:', dataInicio);
                    console.log('Data Final:', dataFim);
                }}>
                    <label htmlFor="date-inicial">Data inicial:</label>
                    <input type="date" id="date-inicial" name="date-inicial" />

                    <label htmlFor="date-final">Data final:</label>
                    <input type="date" id="date-final" name="date-final" />

                    <label htmlFor="options">Selecione uma opção:</label>
                    <select id="options" name="options">
                        <option value="option1">Opção 1</option>
                        <option value="option2">Opção 2</option>
                    </select>

                    <button type="submit">Pesquisar</button>
                    <button type="button">+Filtros</button>
                </form>

                <span>Movimento geral no período</span>
            </main>

            <main className='second'>
                <section>
                    <div>
                        <h4>Total no Período</h4>
                        <MdAttachMoney />
                    </div>
                    <div>
                        <p>Total R$</p>
                        <span>R$22.022,58</span>
                    </div>
                    <div>
                        <p>Quantidade de Vendas:</p>
                        <span>34</span>
                    </div>
                    <div>
                        <p>Ticket Médio:</p>
                        <span>R$265,33</span>
                    </div>
                </section>

                <section>
                    <div>
                        <h4>Vendas No Mês Anterior</h4>
                        <FiShoppingBag />
                    </div>
                    <div>
                        <p>Total R$</p>
                        <span>R$2.193,02</span>
                    </div>
                    <div>
                        <p>Quantidade de Vendas:</p>
                        <span>13</span>
                    </div>
                    <div>
                        <p>Ticket Médio:</p>
                        <span>R$39,87</span>
                    </div>
                </section>

                <section>
                    <div>
                        <h4>No Mês</h4>
                        <TbChartInfographic />
                    </div>
                    <div>
                        <p>Total R$</p>
                        <span>R$20,99</span>
                    </div>
                    <div>
                        <p>Quantidade de Vendas:</p>
                        <span>2</span>
                    </div>
                    <div>
                        <p>Ticket Médio:</p>
                        <span>R$7,00</span>
                    </div>
                </section>

                <section>
                    <div>
                        <h4>No Dia</h4>
                        <LuShoppingCart />
                    </div>
                    <div>
                        <p>Total R$</p>
                        <span>R$0,00</span>
                    </div>
                    <div>
                        <p>Quantidade de Vendas:</p>
                        <span>0</span>
                    </div>
                    <div>
                        <p>Ticket Médio:</p>
                        <span>R$0,00</span>
                    </div>
                </section>
            </main>
        </MainSection>
    );
};
