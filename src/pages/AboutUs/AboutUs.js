import React, { useEffect } from 'react'; // import useEffect
import icon from '../../Assets/Cursor3.png';
import AboutUsCard from './AboutUsCard'
import './AboutUs.css'
function AboutUs() {

    useEffect(() => {
        const icon = document.getElementById('scroll-icon');

        const handleScroll = () => {
            const scrollY = window.pageYOffset;
            const newTop = scrollY;
            const newLeft = 50 + 20 * Math.sin(scrollY / 100);

            icon.style.top = `${newTop}px`;
            icon.style.left = `${newLeft}%`;
        };

        window.addEventListener('scroll', handleScroll);

        // remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // empty dependency array so this runs once on mount

    return (
        <div className='body2'>
         <div>
        <img id="scroll-icon" src={icon} alt="Scroll icon" />
       
    <div className='body1'>

      <AboutUsCard
        className="card-1"
        image='images/ClubPhoto.jpg'
        title="CINE SUNTEM NOI?1"
        description="
        CINE SUNTEM NOI?
        Sailing Academy este o scoala de yachting cu programe de invatare si activitati recreative pentru copii, tineri si adulti. A fost infiintata din pasiunea pentru yachting, din dorinta de a-l aduce in atentia iubitorilor de sporturi nautice si de a le oferi posibilitatea de a le practica in Bucuresti, in tara sau in strainatate.
        Avem parteneriate cu cluburi unde unii dintre cei mai buni antrenori la ora actuala, din Grecia si din lume, au format de-a lungul anilor campioni europeni si mondiali. In acest proiect sunt alaturi de noi si de sportivii nostri care isi doresc sa mearga la urmatorul nivel si sa faca performanta."
      />
      <AboutUsCard
        className="card-2"
        image='images/GroupPhotoInternational.jpg'
        title="SCOPUL2"
        description="Clubul nostru isi propune sa formeze o comunitate cat mai mare a celor care iubesc yachtingul, a tuturor celor ce indragesc apa, vantul, apropierea de natura, provocarile, aventura in necunoscut si, nu in ultimul rand, spiritul de fair play.

        Ne dorim sa contribuim la cresterea considerabila a numarului de tineri care indragesc acest sport si sa ii ajutam pe cei ce vor sa practice la nivel de performanta sa evolueze, punandu-le la dispozitie cele mai bune alternative si conditii de antrenament."
      />
       <AboutUsCard
        className="card-3"
        image='images/ClubPhoto.jpg'
        title="SCOPUL3"
        description="Clubul nostru isi propune sa formeze o comunitate cat mai mare a celor care iubesc yachtingul, a tuturor celor ce indragesc apa, vantul, apropierea de natura, provocarile, aventura in necunoscut si, nu in ultimul rand, spiritul de fair play.

        Ne dorim sa contribuim la cresterea considerabila a numarului de tineri care indragesc acest sport si sa ii ajutam pe cei ce vor sa practice la nivel de performanta sa evolueze, punandu-le la dispozitie cele mai bune alternative si conditii de antrenament."
      />
       </div>
     </div>
        </div>
    );
}

export default AboutUs;
