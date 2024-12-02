import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export const DartsDelPage=()=> {
    const params = useParams();
    const id = params.DartsId;
    const navigate = useNavigate();
    const[darts,setdarts] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://darts.sulla.hu/darts/${id}`)
            const darts = await res.json();
            setdarts(darts);
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
                            <h5 className="card-title">Törlendő elem: {darts.name}</h5>
                            <div className="lead">Születési éve: {darts.birth_date}</div>
                            <div className="lead">Nyert világbajnokságok: {darts.world_ch_won}</div>
                            <div className="lead">Profil: {darts.profile_url}</div>
                                <img alt={darts.name}
                                className="img-fluid rounded"
                                style={{maxHeight: "500px"}}
                                src={darts.image_url ? darts.image_url : 
                                "https://via.placeholder.com/400x800"} 
                                />
                              </div>
                              <form onSubmit={(event) => {
            event.persist();
            event.preventDefault();
            fetch(`https://darts.sulla.hu/darts/${id}`, {
                method: "DELETE",
            })
            .then(() =>
            {   
                navigate("/");
            })
            .catch(console.log);
            }}>
                              <div>
<NavLink to={"/"}><button className="bi bi-backspace">&nbsp;Mégsem</button></NavLink>
&nbsp;&nbsp;
<button className="bi bi-trash3">&nbsp;Törlés</button></div></form>   
                        </div>
                    
                )}
            </div>
        );
};