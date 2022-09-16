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
                <h1>Créer un compte</h1>
                <form onSubmit={handleSubmit(onRegister)}>
                    <input id='pseudo' type='text' placeholder='Pseudo' {...register('pseudo')} />
                    <input id='lastname' type='text' placeholder='Nom' {...register('lastname')} />
                    <input id='firstname' type='text' placeholder='Prénom' {...register('firstname')} />
                    <input id='adresse' type='text' placeholder='Rue, numéro – CP Localité' {...register('adresse')} />
                    <input id='password' type='password' placeholder='Mot de passe' {...register('password')} />
                    {/* <input id='role' type='text' placeholder='Rôle' /> */}
                    {/* <input id='position' type='text' placeholder='Position' /> */}
                    {/* <input id='team' type='text' placeholder='Équipe' /> */}
                    <input id='email' type='email' placeholder='Email' {...register('email')} />
                    <input id='phone' type='text' placeholder='Téléphone' {...register('phone')} />
                    <button type='submit'>Valider</button>

                    {errorMsg && (
                        <p>{errorMsg}</p>
                    )}
                </form>  
            </main>  
        </>
    );
};

export default Register;