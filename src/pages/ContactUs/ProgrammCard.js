import React from 'react';
import './ProgrammCard.css'; 
import { useTranslation } from 'react-i18next';

function ProgrammCard() {
    const { t } = useTranslation();

    return (
        <div className="programm-card">
            <h2>{t('Opening Hours')}</h2>
            <ul>
                <li>{t('Monday: Closed')}</li>
                <li>{t('Tuesday: 9:00 - 20:00')}</li>
                <li>{t('Wednesday: 9:00 - 20:00')}</li>
                <li>{t('Thursday: 9:00 - 20:00')}</li>
                <li>{t('Friday: 9:00 - 20:00')}</li>
                <li>{t('Saturday: 9:00 - 20:00')}</li>
                <li>{t('Sunday: 9:00 - 20:00')}</li>
            </ul>
        </div>
    );
}

export default ProgrammCard;
