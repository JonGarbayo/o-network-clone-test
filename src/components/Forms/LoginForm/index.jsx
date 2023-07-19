import { useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom"
import {login} from "../../../redux/reducers/user"
import { getIsLogged, getUserError } from '../../../redux/selectors/user'

import './style.scss'


function LoginForm() {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const isLog = useSelector(getIsLogged)
    const navigate = useNavigate();
    const userError = useSelector(getUserError);
    

    const onSubmit = (user) => {
        dispatch(login(user))
    }

    useEffect(() => {
        if (isLog) {
            navigate('/:organization-id');
        }
    }, [isLog, navigate]);


    return (
        <div className="c-user-login">
            <h2 className ="c-user-login___title">Connexion</h2>
            <p className="c-user-login__text">Si vous êtes déjà membre d'une organisation, veuillez remplir les champs ci-dessous pour vous connecter.</p>
      
            <form className="c-user-login__form" onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    name="email"
                    type="email"
                    label="email"
                    {...register('email',{required: "Email requis"})}
                    autoComplete="email"
                />
                <TextField 
                    name="password"
                    label="Mot de passe"
                    {...register('password',{required:'Mot de passe requis'})}
                />

                {userError !== null && (
                    <p className="c-user-login__error">{userError.message}</p>
                )}

                <Button type="sumbit" sx={{ m:1,}} className="c-user-login__button" variant="contained" >Connexion</Button>
            </form>
        </div>
    )
}

export default LoginForm
