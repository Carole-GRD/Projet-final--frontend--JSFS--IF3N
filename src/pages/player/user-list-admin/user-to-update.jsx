import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useParams } from "react-router-dom";

const UserToUpdate = () => {

    const { idUserToUpdate } = useParams();
    const { handleSubmit, register, setValue } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/${idUserToUpdate}`)
            .then(function (response) {
                console.log(response.data);
                console.log(response.data.pseudo);
                // const inputModification = ['pseudo', 'lastname', 'firstname', 'adress', 'email', 'phone'];
                // inputModification.forEach(input => {setValue('input', response.data[input])});
                setValue('pseudo', response.data.pseudo)
                setValue('lastname', response.data.lastname)
                setValue('firstname', response.data.firstname)
                setValue('adress', response.data.adress)
                setValue('email', response.data.email)
                setValue('phone', response.data.phone)
            })
    }, [idUserToUpdate, setValue])

    const onUpdatedUser = (data) => {
        console.log('mise à jour utilisateur');

        axios.put(`http://localhost:8080/api/user/admin/${idUserToUpdate}`, data)
            .then(function (response) {
                console.log(response);
                navigate('/user');
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (


        <>
            <main>    
                <div>
                    <div className='userToUpdateTitleAndButton'>
                        <h1>Finaliser l'enregistrement de l'utilisateur</h1>
                        <Link to='/user'><button className='buttonAdmin'>Retourner à la liste des joueurs</button></Link>
                    </div>

                    <article className='formUserToUpdate'>
                        <form onSubmit={handleSubmit(onUpdatedUser)}>
                            <div>
                                <label htmlFor="pseudo">Pseudo</label>
                                <input id='pseudo' type='text' placeholder='Pseudo' {...register('pseudo')} />
                            </div>
                            <div>
                                <label htmlFor="lastname">Nom</label>
                                <input id='lastname' type='text' placeholder='Nom' {...register('lastname')} />
                            </div>
                            <div>
                                <label htmlFor="firstname">Prénom</label>
                                <input id='firstname' type='text' placeholder='Prénom' {...register('firstname')} />
                            </div>
                            <div>
                                <label htmlFor="adress">Adresse</label>
                                <input id='adress' type='text' placeholder='Rue, numéro – CP Localité' {...register('adress')} />
                            </div>
                            {/* <div>
                                <label for="password">Mot de passe</label>
                                <input id='password' type='text' placeholder='Mot de passe' {...register('password')} />
                            </div> */}
                            <div>
                                <label htmlFor='role'>Rôle</label>
                                <select id='role' {...register('role')}>
                                    <option>player</option>
                                    <option>coach</option>
                                    <option>admin</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='position'>Position</label>
                                <select id='position' {...register('position')}>
                                    <option>réceptionneur attaquant</option>
                                    <option>pointu</option>
                                    <option>central</option>
                                    <option>passeur</option>
                                    <option>libéro</option>
                                    <option>aucune</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input id='email' type='email' placeholder='Email' {...register('email')} />
                            </div>
                            <div>
                                <label htmlFor="phone">Téléphone ou GSM</label>
                                <input id='phone' type='text' placeholder='Téléphone ou GSM' {...register('phone')} />
                            </div>
                            <div>
                                <label htmlFor="licence">Numéro de licence</label>
                                <input id='licence' type='text' placeholder='Numéro de licence' {...register('licence')} />
                            </div>
                            <div className='buttonContainer'>
                                <button type='submit'>Valider</button>
                            </div>

                            {/* {errorMsg && (
                                <p>{errorMsg}</p>
                            )} */}
                        </form> 
                        
                    </article>
                </div>            
            </main>
        </>
    )
};

export default UserToUpdate;