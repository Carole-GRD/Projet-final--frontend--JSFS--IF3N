
const Register = () => {

    return (
        <>
            <main> 
                <h1>Créer un compte</h1>
                <form>
                    <input id="lastname" type="text" placeholder="Nom" />
                    <input id="firstname" type="text" placeholder="Prénom" />
                    <input id="role" type="text" placeholder="Rôle" />
                    <input id="position" type="text" placeholder="Position" />
                    <input id="team" type="text" placeholder="Équipe" />
                    <input id="email" type="text" placeholder="Email" />
                    <input id="phone" type="text" placeholder="Téléphone" />
                    <button>Valider</button>

                    {/* {errorMsg && (
                        <p>{errorMsg}</p>
                    )} */}
                </form>  
            </main>  
        </>
    );
};

export default Register;