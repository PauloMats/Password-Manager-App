import React, { useState } from 'react';

type FormData = {
  serviceName: string;
  login: string;
  password: string;
  url: string;
};

function Form() {
  const [formData, setFormData] = useState<FormData>({
    serviceName: '',
    login: '',
    password: '',
    url: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode fazer o que quiser com os dados do formulário
    console.log(formData);
    // Limpar os campos do formulário
    setFormData({
      serviceName: '',
      login: '',
      password: '',
      url: '',
    });
  };

  const handleCancel = () => {
    // Limpar os campos do formulário
    setFormData({
      serviceName: '',
      login: '',
      password: '',
      url: '',
    });
    // Esconder o formulário
    setShowForm(false);
  };

  const handleShowForm = () => {
    // Exibir o formulário
    setShowForm(true);
  };

  if (showForm) {
    return (
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="serviceName">Nome do serviço:</label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            value={ formData.serviceName }
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            name="login"
            value={ formData.login }
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={ formData.password }
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={ formData.url }
            onChange={ handleChange }
          />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={ handleCancel }>
            Cancelar
          </button>
        </div>
      </form>
    );
  }
  return (
    <button type="button" onClick={ handleShowForm }>
      Cadastrar nova senha
    </button>
  );
}

export default Form;
