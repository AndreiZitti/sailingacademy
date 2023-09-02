import React, { useEffect } from 'react'; // import useEffect
import icon from '../../Assets/Cursor3.png';
import AboutUsCard from './AboutUsCard'
import './AboutUs.css'
function AboutUs() {

 
    return (
       
        
      
    <div className='body1'>
      <div className='oneRow'>
      <AboutUsCard
        className="card-1"
        title="CINE SUNTEM NOI?"
        description="
    
        Sailing Academy este o scoala de yachting cu programe de invatare si activitati recreative pentru copii, tineri si adulti. A fost infiintata din pasiunea pentru yachting, din dorinta de a-l aduce in atentia iubitorilor de sporturi nautice si de a le oferi posibilitatea de a le practica in Bucuresti, in tara sau in strainatate.
        Avem parteneriate cu cluburi unde unii dintre cei mai buni antrenori la ora actuala, din Grecia si din lume, au format de-a lungul anilor campioni europeni si mondiali. In acest proiect sunt alaturi de noi si de sportivii nostri care isi doresc sa mearga la urmatorul nivel si sa faca performanta."
      />
      <div className='oneRow-img'>
      <img  src = "/images/international.jpg"/>
      </div>
      </div>
      <div className='oneRow'>
      <AboutUsCard
        className="card-2"
        title="SCOPUL"
        description="Clubul nostru isi propune sa formeze o comunitate cat mai mare a celor care iubesc yachtingul, a tuturor celor ce indragesc apa, vantul, apropierea de natura, provocarile, aventura in necunoscut si, nu in ultimul rand, spiritul de fair play.

        Ne dorim sa contribuim la cresterea considerabila a numarului de tineri care indragesc acest sport si sa ii ajutam pe cei ce vor sa practice la nivel de performanta sa evolueze, punandu-le la dispozitie cele mai bune alternative si conditii de antrenament."
      />
       <div className='oneRow-img'>
      <img  src = "/images/concurs.jpg"/>
      </div>
      </div>
       </div>
     
     
       
    );
}

export default AboutUs;
