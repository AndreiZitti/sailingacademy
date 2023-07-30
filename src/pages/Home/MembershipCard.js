import React from 'react';
import FlipCard from './FlipCard';

function Membership() {
  return (
    <>
      <h1>To be the real deal, become a member!</h1>
      <div className="flip-card-grid">
        <FlipCard frontImage="images/Kayak.jpg" backText={{
          requirements: ["- Sa ai cursul de initiere Optimist sau Laser facut la Sailing Academy", "- Sa achiti integral taxa de 1200 lei / an"],
          benefits: ["- Card de acces club Sailing Academy", "- Reducere de 50% pentru inchiriere Kaiac, Stand Up Paddle si Barci cu vele", "- Legitimatie sportiv FRY"]
        }} title="JUNIORS" />
        <FlipCard frontImage="images/Kayak.jpg" backText={{
          requirements: ["- Sa ai legitimatie FRY din anii trecuti / Sa fi facut cursurile de sailing adulti la Sailing Academy", "- Sa achiti integral taxa de 2400 lei / an"],
          benefits: ["- Card de acces club Sailing Academy", "- Reducere de 25% pentru inchiriere Kaiac, Stand Up Paddle si Barci cu vele", "- Legitimatie sportiv FRY"]
        }} title="ADULTS" />
        <FlipCard frontImage="images/Kayak.jpg" backText={{
          requirements: ["-  Sa fi fost sportiv practicant de navigatie cu vele", "-Sa achiti integral taxa de 1800 lei / an"],
          benefits: ["- Card de acces club Sailing Academy", "- Reducere de 25% pentru inchiriere Kaiac, Stand Up Paddle si Barci cu vele", "- Legitimatie sportiv FRY"]
        }} title="NOSTALGIC ( 50+ )" />
        <FlipCard frontImage="images/Kayak.jpg" backText={{
          requirements: ["- Sa achiti integral taxa de 2400 lei / an"],
          benefits: ["- Card de acces club Sailing Academy", "- Reducere de 25% pentru inchiriere Kaiac, Stand Up Paddle si Barci cu vele", "- Drept de depozitare Kaiac/Stand Up Paddle proprietate personala, in spatiul clubului."]
        }} title="SIMPATIZANTI" />
      </div>
    </>
  );
}

export default Membership;
