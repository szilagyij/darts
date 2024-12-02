import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export const DartsSinglePage =()=> {

    const params = useParams();
    const id = params.DartsId;
    const[darts,setDarts] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://darts.sulla.hu/darts/${id}`)
            const darts = await res.json();
            setDarts(darts);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setPending(false);
        }
    })
    ();
 }, [id]);

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !darts.id ? (
                <div className="spinner-border"></div>
            ) : (
                            <div className="card p-3">
                                <div className="card-body">
                                <h5 className="card-title">Dartsozó neve: {darts.name}</h5>
                                <div className="lead">Születési éve: {darts.birth_date}</div>
                                <div className="lead">Nyert világbajnokságai: {darts.world_ch_won}</div>
                                {/* Feltételes NavLink az abszolút URL-hez */}
{darts.profile_url.startsWith('http') ? (
                                    <a href={darts.profile_url} target="_blank" rel="noopener noreferrer">
                                        Profile link
                                    </a>
                                ) : (
                                    <NavLink to={darts.profile_url} exact>
                                        Profile link
                                    </NavLink>
                                )}
                                <br />
                                <NavLink key={darts.id} to={"/darts/" + darts.id}>
                                    <img alt={darts.nev}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={darts.image_url ? darts.image_url :
                                            "https://via.placeholder.com/400x800"} /></NavLink>
                                <br />
                                  </div>
                                  <div><NavLink to="/"><i className="bi bi-backspace"></i></NavLink> &nbsp;&nbsp;&nbsp;
<NavLink key="y" to={"/mod-darts/" + darts.id}><i className="bi bi-pencil"></i></NavLink></div>   
                            </div>
                        
                    )}
                </div>
            );
}