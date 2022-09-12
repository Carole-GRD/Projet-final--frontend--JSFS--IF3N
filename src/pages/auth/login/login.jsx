
import { Link } from "react-router-dom";


const Login = () => {

    return (
        <>
            <main>
                <h1>Se connecter</h1>
                <form>
                    <input id="creedential" type="text" placeholder="Pseudo ou email" />
                    <input id="password" type="text" placeholder="Mot de passe" />
                    <button type="submit">Connexion</button>
                    <Link to="/enregistrement">Créer un compte</Link>
                </form>
            </main>
        </>
    );
};

export default Login;