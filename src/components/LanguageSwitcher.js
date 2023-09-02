import React from 'react';
import i18n from '../../src/i18n';
import './LanguageSwitcher.css'
function LanguageSwitcher() {
  return (
    <div className="language-switcher">
      <button onClick={() => i18n.changeLanguage('en')}>
        <img src={'images/enFlag.png'} alt="English" />
      </button>
      <button onClick={() => i18n.changeLanguage('ro')}>
        <img src={'images/roFlag.png'} alt="Română" />
      </button>
    </div>
  );
}

export default LanguageSwitcher;
