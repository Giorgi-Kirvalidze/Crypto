import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from './Coin';
import './App.css';

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=Gel&order=market_cap_desc&per_page=10&page=1&sparkline=false

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      setCoins(response.data)
    }
    fetchData()
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => (
    coin.name.toLowerCase().includes(search.toLowerCase())
  ))

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form >
          <input onChange={handleChange} type="text" placeholder="Search" className="coin-input" />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        )
      })}
    </div>
  );
}

export default App;
