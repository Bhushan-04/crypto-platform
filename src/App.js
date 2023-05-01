import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';
import 'cors';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(()=>{
    axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    ).then(res =>{
      setCoins(res.data);
    })
    .catch(error => console.log(error));
  },[]);

  const handleChange = (e)=>{
    setSearch(e.target.value);
  }
  const filtered = coins.filter(coin =>coin.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>Seach currency</h1>
        <form>
          <input type='text' placeholder='enter currency'
          className='coin-input' onChange={handleChange}/>
        </form>
      </div>
      <div>
        {filtered.map(coin =>{
          // console.log(coin);
          return (<Coin
            key = {coin.id}
            name = {coin.name}
            image = {coin.image}
            symbol = {coin.symbol}
            marketcap = {coin.market_cap}
            price = {coin.current_price}
            priceChange = {coin.price_change_percentage_24h}
            volume = {coin.total_volume}
          />)
        })}
      </div>
    </div>
  );
}

export default App;
