import React from 'react';
import './styles.css';

export default function Home() {
    return (
      <>
        <header className="header">
          <div className="logo">
            <img src="logo-icon.jpg" alt="Logo AlmoCIn" className="logo-icon"/>
            <h1> AlmoCIn </h1>
          </div>
  
          <div>
            <button className="menu-buttons"> Cardápio </button>
            <button className="menu-buttons"> Histórico de Pedidos </button>
            <button className="menu-buttons"> Estatísticas do Usuário </button>
          </div>
  
          <button> Usuário </button>
        </header>
      </>
    );
  }
  