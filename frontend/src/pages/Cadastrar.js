import axios from 'axios'
import { useState } from 'react'
import style from '../styles/Cadastrar.module.css'
import { useNavigate } from 'react-router-dom'
import Headers from '../components/Header'

function Cadastrar() {


    const data = { username: "", email: "", password: "" }
    const [dataInput, setDataInput] = useState(data)

    const handleInput = (e) => {
        setDataInput({ ...dataInput, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://127.0.0.1:8000/users", dataInput)
                .then((res) =>


                    navigate("/")

                )
                .catch((err) => console.log(err.data))
        } catch (error) {
            console.log(error)

        }


    }
    const links = [
        { path: "/", label: "Login" },
    ];

    return (

        <div>
            <Headers links={links}/>
        <div className={style.cadastrouserform}>

            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='username' onChange={handleInput} placeholder='Username'></input><br /><br />
                    <input type='email' name='email' onChange={handleInput} placeholder='E-mail'></input><br /><br />
                    <input type='password' name='password' onChange={handleInput} placeholder='Password'></input><br /><br />

                    <button type='submit'>Cadastrar</button>


                </form>
                <ul>
            <li>JJá tem uma conta ?<a href="/">Logar</a></li>
            </ul>
                </div>

        </div></div>
    )



}

export default Cadastrar