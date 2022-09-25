import { registerUser } from '../../../store/actions/auth-action';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Register = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.auth.isConnected);
    const errorMsg = useSelector(state => state.auth.errorMsg);

    useEffect(() => {
        if (isConnected) {
            navigate('/home');
        }
    }, [isConnected, navigate])

    const onRegister = (data) => {
        dispatch(registerUser(data));
    }

    return (
        <>
            <main> 
                <div>
                    <h1>Créer un compte</h1>
                    <article className='formRegister'>
                        <form onSubmit={handleSubmit(onRegister)}>
                            <div>
                                <label for="pseudo">Pseudo</label>
                                <input id='pseudo' type='text' placeholder='Pseudo' {...register('pseudo')} />
                            </div>
                            <div>
                                <label for="lastname">Nom</label>
                                <input id='lastname' type='text' placeholder='Nom' {...register('lastname')} />
                            </div>
                            <div>
                                <label for="firstname">Prénom</label>
                                <input id='firstname' type='text' placeholder='Prénom' {...register('firstname')} />
                            </div>
                            <div>
                                <label for="adress">Adresse</label>
                                <input id='adress' type='text' placeholder='Rue, numéro – CP Localité' {...register('adress')} />
                            </div>
                            <div>
                                <label for="password">Mot de passe</label>
                                <input id='password' type='text' placeholder='Mot de passe' {...register('password')} />
                            </div>
                            {/* <input id='role' type='text' placeholder='Rôle' /> */}
                            {/* <input id='position' type='text' placeholder='Position' /> */}
                            {/* <input id='team' type='text' placeholder='Équipe' /> */}
                            <div>
                                <label for="email">Email</label>
                                <input id='email' type='email' placeholder='Email' {...register('email')} />
                            </div>
                            <div>
                                <label for="phone">Téléphone ou GSM</label>
                                <input id='phone' type='text' placeholder='Téléphone ou GSM' {...register('phone')} />
                            </div>
                            <div className='buttonContainer'>
                                <button type='submit'>Valider</button>
                            </div>

                            {errorMsg && (
                                <p>{errorMsg}</p>
                            )}
                        </form> 
                    </article>
                </div> 
            </main>  
        </>
    );
};

export default Register;