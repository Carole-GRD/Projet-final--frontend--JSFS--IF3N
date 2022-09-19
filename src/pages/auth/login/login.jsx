
import { loginUser } from '../../../store/actions/auth-action';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Login = () => {

    const { handleSubmit, register, reset } = useForm();
    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.auth.isConnected);
    const errorMsg = useSelector(state => state.auth.errorMsg);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isConnected) {
            navigate('/home');
        }
    }, [isConnected, navigate])

    const onLogin = (data) => {
        dispatch(loginUser(data));
        reset();
    }

    return (
        <>
            <main>
                <h1>Se connecter</h1>
                <form onSubmit={handleSubmit(onLogin)}>
                    <input id='credential' type='text' placeholder='Pseudo ou email' {...register('credential')} />
                    <input id='password' type='text' placeholder='Mot de passe' {...register('password')} />
                    <button type='submit'>Connexion</button>
                    
                    {errorMsg && (
                        <p>{errorMsg}</p>
                    )}
                </form>
            </main>
        </>
    );
};

export default Login;