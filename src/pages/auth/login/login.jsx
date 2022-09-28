
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
            navigate('/team');
        }
    }, [isConnected, navigate])

    const onLogin = (data) => {
        dispatch(loginUser(data));
        reset();
        navigate('/team')
    }

    return (
        <>
            <main>
                <div>
                    <h1>Se connecter</h1>

                    <article className='formLogin'>
                        <form onSubmit={handleSubmit(onLogin)}>
                            <div>
                                <label htmlFor="credential">Pseudo ou email</label>
                                <input id='credential' type='text' placeholder='Pseudo ou email' {...register('credential')} />
                            </div>
                            <div>
                                <label htmlFor="credpasswordential">Mot de passe</label>
                                <input id='password' type='text' placeholder='Mot de passe' {...register('password')} />
                            </div>
                            <div className='buttonContainer'>
                                <button type='submit'>Connexion</button>
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

export default Login;