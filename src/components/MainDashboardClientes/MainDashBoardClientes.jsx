import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainSection from './styled.js';
import { MdAttachMoney } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { TbChartInfographic } from "react-icons/tb";
import { LuShoppingCart } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FirstSectionClientes = () => {
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState('');
    const [selectedEstadoNome, setSelectedEstadoNome] = useState(''); // Para armazenar o nome do estado 
    const [selectedCidadeNome, setSelectedCidadeNome] = useState('');

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                setEstados(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar estados:', error);
            });
    }, []);

    const handleEstadoChange = (e) => {
        const estadoId = e.target.value;
        setSelectedEstado(estadoId);

        const estadoSelecionado = estados.find(estado => estado.id === parseInt(estadoId));
        setSelectedEstadoNome(estadoSelecionado ? estadoSelecionado.nome : '');

        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .then(response => {
                setCidades(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar cidades:', error);
            });
    };

    const handleCidadeChange = (e) => {
        const cidadeNome = e.target.options[e.target.selectedIndex].text;
        setSelectedCidadeNome(cidadeNome);
    };

    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    return (
        <MainSection>
            <p><strong>Clientes</strong> Dashboard</p>
            <main className='first'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    
                    setEstado(formData.get('estados'));
                    setCidade(formData.get('cidades'));

                    if (selectedCidadeNome && selectedEstadoNome) {
                        toast.success("Filtros aplicados com sucesso!");
                    } else {
                        toast.error("Por favor, preencha todos os campos");
                    }

                    // console.log('Estado:', selectedEstadoNome);
                    // console.log('Cidade:', selectedCidadeNome);
                }}>
                    <label htmlFor="estados">Estado:</label>
                    <select value={selectedEstado} id="estados" name="estados" onChange={handleEstadoChange}>
                        <option value="">Selecione um estado</option>
                        {estados.map(estado => (
                            <option key={estado.id} value={estado.id}>{estado.nome}</option>
                        ))}
                    </select>
                    <label htmlFor="cidades">Cidade:</label>
                    <select 
                      id="cidades" 
                      name="cidades" 
                      onChange={(e) => {
                        handleCidadeChange(e);
                        // console.log(e.target.options[e.target.selectedIndex].text);
                      }} 
                      value={selectedCidadeNome}
                    >
                        <option value="">Selecione uma cidade</option>
                        {cidades.map(cidade => (
                            <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                        ))}
                    </select>
                    <label htmlFor="categorias">Categoria:</label>
                    <select id="categorias" name="categorias">
                        <option value="escolas">ESCOLAS</option>
                        <option value="assistencia-tecnica">ASSISTÊNCIA TÉCNICA</option>
                    </select>
                    <button type="submit">Pesquisar</button>
                </form>
                <span>Movimento geral no período</span>
            </main>
            <main className='second'>
                <section>
                    <div>
                        <h4>Qtde Total Carteira</h4>
                        <MdAttachMoney />
                    </div>
                    <div>
                        <p>Total R$</p>
                        <span>196</span>
                    </div>
                </section>
                <section>
                    <div>
                        <h4>Clientes Novos no Mês Anterior</h4>
                        <FiShoppingBag />
                    </div>
                    <div>
                        <p>Total</p>
                        <span>3</span>
                    </div>
                </section>
                <section>
                    <div>
                        <h4>Clientes Novos no Mês</h4>
                        <TbChartInfographic />
                    </div>
                    <div>
                        <p>Total</p>
                        <span>0</span>
                    </div>
                </section>
                <section>
                    <div>
                        <h4>Média Mensal Clientes Novos</h4>
                        <LuShoppingCart />
                    </div>
                    <div>
                        <p>Total</p>
                        <span>0</span>
                    </div>
                </section>
            </main>
            <ToastContainer />
        </MainSection>
    );
};
