import './styles/App.scss';
import { useState, useEffect } from 'react';
import Modal from './components/Modal';

function App() {
  const url = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce';
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const charge = async () => {
      const res = await fetch(url);
      const data = await res.json();

      setUsers(data);
    }
    charge();
  },[]);

  return (
    <main>
      { 
        users.map((user, index) => (
          <div key={index} className="user-container">
            <div className="user-content">
              <div className="user-info">
                <div className="user-img">
                  <img src={user.img} alt="imagem do usuario" />
                </div>
                <div className="user-data">
                  <span>Nome do Usuário: {user.name}</span>
                  <p><span>ID: {user.id}</span> - <span>Username: {user.username}</span></p>
                </div>
              </div>
              <div className="btn">
                <button onClick={() =>{setIsModalOpen(true); setName(user.name)}}>Pagar</button>
              </div> 
            </div> 
          </div>
        ))
      }
      {isModalOpen ? 
        <Modal onClose={() => setIsModalOpen(false)}> 
          <span>Pagamento para <strong>{name}</strong></span>
          <input type="text" placeholder="R$ 0,00" inputMode='numeric' onChange={(event) => setPrice(event.target.value)}/>
          <select>
            <option value="">Cartão com o final 123</option>
            <option value="">Cartão com o final 321</option>
          </select>
          <button>Pagar</button>
        </Modal>
        : null
      }
    </main>
  );
};

export default App;
