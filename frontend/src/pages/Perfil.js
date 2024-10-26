import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from '../styles/Perfil.module.css';
import Headers from '../components/Header';

function Perfil() {
    const [posts, setPosts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const getPost = async () => {
        try {
            const tokenauth = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:8000/users/${id}`, {
                headers: { 'Authorization': `Bearer ${tokenauth}` }
            });
            setPosts(res.data[0]);
            setUsername(res.data[0].username);
            setEmail(res.data[0].email);
        } catch (error) {
            setError(error.response?.data.error.message || 'Erro ao carregar os dados');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPost();
    }, [id]);

    const handleChange = async (event) => {
        event.preventDefault();
        const tokenauth = localStorage.getItem('token');

        try {
            await axios.put(`http://localhost:8000/users/${id}`, 
                { username, email, password }, 
                {
                    headers: {
                        'Authorization': `Bearer ${tokenauth}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setPosts(prevPosts => ({ ...prevPosts, username, email }));
            setPassword('');
            alert("Dados atualizados com sucesso!");
        } catch (err) {
            setError('Erro ao atualizar os dados');
            alert('Erro ao atualizar os dados');
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        if (!window.confirm("Tem certeza que deseja deletar sua conta?")) {
            return;
        }

        const tokenauth = localStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:8000/users/${id}`, {
                headers: { 'Authorization': `Bearer ${tokenauth}` }
            });
            localStorage.removeItem('token');
            navigate("/");
        } catch (err) {
            setError('Erro ao deletar a conta');
            alert('Erro ao deletar a conta');
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    
    const links = [
        { path: "/todolist", label: "Tarefas" },
    ];

    return (
        <div>
            <Headers links={links} />
            <div>
                {posts ? (
                    <div className={style.perfilpage}>
                        <h2>Username: {posts.username}</h2>
                        <h3>E-mail: {posts.email}</h3>
    
                        <div>
                            <form onSubmit={handleChange}>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    placeholder="Username" 
                                />
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="E-mail" 
                                />
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Senha" 
                                />
                                <button type="submit">Mudar Dados</button>
                            </form>
                            <div className={style['button-container']}>
                                <form onSubmit={handleDelete}>
                                    <button type="submit">Deletar Conta</button>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Vazio...</p>
                )}
            </div>
        </div>
    );
}

export default Perfil;