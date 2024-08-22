import React, { useState } from 'react';
import { auth, db } from '../store/env';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cep: '',
    rua: '',
    cidade: '',
    estado: '',
    bairro: '',
    numero: '',
    complemento: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        phone: formData.phone,
        cep: formData.cep,
        rua: formData.rua,
        cidade: formData.cidade,
        estado: formData.estado,
        bairro: formData.bairro,
        numero: formData.numero,
        complemento: formData.complemento,
      });

      // Exibe o alerta e redireciona após o usuário clicar em "Ok"
      alert('Cadastro realizado com sucesso!');
      onClose(); // Fechar o modal de registro, caso necessário
      window.location.href = '/'; // Redireciona para a página inicial
    } catch (error) {
      alert('Erro ao realizar cadastro: ' + error.message);
    }
  };

  const buscarCep = () => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!('erro' in data)) {
            setFormData({
              ...formData,
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf,
            });
          } else {
            alert('CEP não encontrado.');
          }
        })
        .catch(() => {
          alert('Erro ao buscar CEP.');
        });
    } else {
      alert('Por favor, insira um CEP válido.');
    }
  };

  return (
    <form className="register-form" id="register-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" name="name" value={formData.name} onChange={handleChange} required />
      <input type="text" placeholder="Telefone" name="phone" value={formData.phone} onChange={handleChange} required />
      <input type="text" placeholder="CEP" id="cep" name="cep" value={formData.cep} onChange={handleChange} required />
      <button id="buscar-cep" type="button" onClick={buscarCep}>Buscar CEP</button>
      <div className="address-inputs">
        <input type="text" placeholder="Rua" id="rua" name="rua" value={formData.rua} onChange={handleChange} required />
        <input type="text" placeholder="Cidade" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} required />
        <select name="estado" id="estado" value={formData.estado} onChange={handleChange} required>
          <option value="">Selecione o Estado</option>
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
        </select>
        <input type="text" placeholder="Bairro" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} required />
        <input type="text" placeholder="Número" name="numero" value={formData.numero} onChange={handleChange} required />
        <input type="text" placeholder="Complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
      </div>
      <input type="email" placeholder="E-mail" name="email" value={formData.email} onChange={handleChange} required />
      <input type="password" placeholder="Senha" name="password" value={formData.password} onChange={handleChange} required />
      <button type="submit" id="register-button">Cadastrar</button>
    </form>
  );
};

export default RegisterForm;
