import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const DartsListPage=()=> {

    const[darts,setDarts] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);
    
    useEffect(() => {
        setFetchPending(true);
        fetch("https://darts.sulla.hu/darts")
            .then((res) => res.json())
            .then((dartsok) => setDarts(dartsok))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Dartsozók</h2>
                    {darts.map((darts, index) => (

                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="text-dark">Sakkozó neve: {darts.name}</p>
                            <p className="text-danger">Születési éve: {darts.birth_date}</p>
                            <p className="text-danger">Nyert világbajnokságai: {darts.world_ch_won}</p>
                            <div className="card-body">
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
                                <NavLink key="x" to={"/mod-darts/" + darts.id}>
                                    <i className="bi bi-pencil"></i></NavLink> &nbsp;&nbsp;
                                    <NavLink key="y" to={"/del-darts/" + darts.id}><i className="bi bi-trash3"></i></NavLink>&nbsp;&nbsp;
                                    <NavLink key={darts.id} to={"/darts/" + darts.id}><i class="bi bi-clipboard2-pulse"></i></NavLink>
                            </div>
                        </div>


                    ))}
                </div>
            )}
        </div>
    );
}
