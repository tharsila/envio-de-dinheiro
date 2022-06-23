import './styles/App.scss';
import { useState, useEffect } from 'react';

function App() {
  const url = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce';
  const [users, setUsers] = useState([]);
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
          <div className="user-container">
            <div key={index} className="user-content">
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
                <button>Pagar</button>
              </div>
            </div> 
          </div>
        ))
      }
    </main>
  );
};

export default App;
