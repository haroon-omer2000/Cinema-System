import React from 'react';
import Current from './Current';

function Currents({currents,openPopup}){
    return(
        <div>
        <h2 className="Now-Showing">Now Showing</h2>
        <section className="currents" >
            {
                currents.map((current)=>(
                    <Current key={current.imdbID} current={current} openPopup={openPopup} />
                ))
            }
        </section>
        </div>
    );
}

export default Currents;