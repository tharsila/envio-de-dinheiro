import './styles/App.scss';
import { useState, useEffect } from 'react';
import Modal from './components/Modal';

function App() {
  const url = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce';
  const [users, setUsers] = useState([]);
  const [idUser, setIdUser] = useState('');

  /* states para o modal */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [select, setSelect] = useState('');

  /* state para o recibo */
  const [message, setMessage] = useState('');


  /* puxa os dados da api */
  useEffect(() => {
    const charge = async () => {
      const res = await fetch(url);
      const data = await res.json();

      setUsers(data);
    }
    charge();
  },[]);

  /* cartões parao usuario selecionar */
  let cards = [
    // valid card
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // invalid card
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const postInfo = {
      name,
      idUser,
      select,
      price,
    }

    const urlCard = 'https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989';

    const cardInfo = await fetch(urlCard, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postInfo),
    });

    const cardData = await cardInfo.json();

    console.log((cardData))

    if (postInfo.select !== '1' ) {
      setMessage('O pagamento não foi concluído com sucesso')

    } else {
      setMessage('O pagamento foi concluído com sucesso')
    } 
  }

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
                <button onClick={() =>{setIsModalOpen(true); setIdUser(user.id); setName(user.name)}}>Pagar</button>
              </div> 
            </div> 
          </div>
        ))
      }

      {isModalOpen &&
        <Modal onClose={() => {setIsModalOpen(false); setMessage(''); setPrice(''); setSelect('')}}>
          {message === '' ? (
            <>
              <span>Pagamento para <strong>{name}</strong></span>
              <form onSubmit={(event) => handleSubmit(event)}>  
                <input 
                  value={price} 
                  type="text" 
                  placeholder="R$ 0,00" 
                  inputMode='numeric' 
                  onChange={(event) => setPrice(event.target.value)} />

                <select 
                  defaultValue={'default'} 
                  onChange={(event) => setSelect(event.target.value)}>
                  <option value={'default'} disabled>Escolha um cartão</option>
                  {/* {cards.map((card, index) => (
                  <option key={index} value={[JSON.stringify(card), index]}>Cartão com o final {card.card_number.slice(-3)}</option>))} */}
                  <option value="1">Cartão com o final {cards[0].card_number.slice(-3)}</option>
                  <option value="2">Cartão com o final {cards[1].card_number.slice(-3)}</option>
                </select>
                <button disabled={select === '' || price === ''}>Pagar</button>
              </form>
            </>
            )
            :(
              <>
                <span>Recibo de Pagamento</span>
                <p style={{'marginTop': '2rem'}}>{message}</p>
              </>
            )
          }

        </Modal>
      }
    </main>
  );
};

export default App;
