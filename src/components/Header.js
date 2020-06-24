import React from 'react'

const Header = ({logout}) => { //componente para el Header
    return (
      <header className="header">
          <div className="content-container">
              <div className="header__content">               
                  <h1>Fiscalias MP</h1>
                  <button className="header__button" onClick={logout}>Logout</button>
              </div>
          </div>
      </header>
    )
  }

export {Header as default}