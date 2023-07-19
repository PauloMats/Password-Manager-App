import React, { useState } from 'react';
import './form.css';

type FormData = {
  serviceName: string;
  login: string;
  password: string;
  url: string;
};

type Service = {
  id: number;
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
  const [services, setServices] = useState<Service[]>([]);
  const [hidePasswords, setHidePasswords] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      id: Date.now(),
      ...formData,
    };

    setServices((prevServices) => [...prevServices, newService]);

    // Limpar os campos do formulário
    setFormData({
      serviceName: '',
      login: '',
      password: '',
      url: '',
    });
  };

  const handleRemoveService = (id: number) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== id));
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

  const handleToggleHidePasswords = () => {
    setHidePasswords((prevHidePasswords) => !prevHidePasswords); // Inverte o valor do estado hidePasswords
  };

  const validateForm = React.useCallback(() => {
    const { serviceName, login, password } = formData;

    const isServiceNameValid = serviceName.trim() !== '';
    const isLoginValid = login.trim() !== '';
    const isPasswordValid = password.length >= 8
      && password.length <= 16
      && /\d/.test(password)
      && /[a-zA-Z]/.test(password)
      && /[!@#$%^&*]/.test(password);

    setIsFormValid(isServiceNameValid && isLoginValid && isPasswordValid);
  }, [formData]);

  // Atualiza a validação do formulário sempre que o formulário muda
  React.useEffect(() => {
    validateForm();
  }, [validateForm]);

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
          <button type="submit" disabled={ !isFormValid } onClick={ handleCancel }>
            Cadastrar
          </button>
          <button type="button" onClick={ handleCancel }>
            Cancelar
          </button>
        </div>
      </form>
    );
  }

  const renderServices = () => {
    if (services.length === 0) {
      return <p>Nenhuma senha cadastrada</p>;
    }

    return (
      <ul>
        {services.map((service) => (
          <li key={ service.id }>
            <a href={ service.url } target="_blank" rel="noopener noreferrer">
              {service.serviceName}
            </a>
            <p>
              Login:
              {' '}
              {service.login}
            </p>
            {hidePasswords ? (
              <p>******</p>
            ) : (
              <p>
                Senha:
                {' '}
                {service.password}
              </p>
            )}
            <button
              type="button"
              data-testid="remove-btn"
              onClick={ () => handleRemoveService(service.id) }
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {/* Checkbox para esconder/mostrar senhas */}
      <label>
        <input
          type="checkbox"
          checked={ hidePasswords }
          onChange={ handleToggleHidePasswords }
        />
        Esconder senhas
      </label>
      {renderServices()}
      <button type="button" onClick={ handleShowForm }>
        Cadastrar nova senha
      </button>
    </div>
  );
}
export default Form;
