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

  const [isFormValid, setIsFormValid] = useState(false);
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

  const validateForm = () => {
    const { serviceName, login, password } = formData;

    const isServiceNameValid = serviceName.trim() !== '';
    const isLoginValid = login.trim() !== '';
    const isPasswordValid = password.length >= 8
      && password.length <= 16
      && /\d/.test(password)
      && /[a-zA-Z]/.test(password)
      && /[!@#$%^&*]/.test(password);

    setIsFormValid(isServiceNameValid && isLoginValid && isPasswordValid);
  };

  // Atualiza a validação do formulário sempre que o formulário muda
  React.useEffect(() => {
    validateForm();
  }, [formData]);

  const renderPasswordCheck = (message: string, isValid: boolean) => {
    return (
      <p className={ isValid ? 'valid-password-check' : 'invalid-password-check' }>
        {message}
      </p>
    );
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
          {renderPasswordCheck(
            'Possuir 8 ou mais caracteres',
            formData.password.length >= 8,
          )}
          {renderPasswordCheck(
            'Possuir até 16 caracteres',
            formData.password.length <= 16,
          )}
          {renderPasswordCheck('Possuir letras e números', /\d/.test(formData.password) && /[a-zA-Z]/.test(formData.password))}
          {renderPasswordCheck('Possuir algum caractere especial', /[!@#$%^&*]/.test(formData.password))}
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
          <button type="submit" disabled={ !isFormValid }>
            Cadastrar
          </button>
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
