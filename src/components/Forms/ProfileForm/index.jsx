import AvatarForm from "../AvatarForm";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { addUser, updateUser } from '../../../redux/reducers/user' // added updateUser
import { getUser, getIsLogged, getUserError } from '../../../redux/selectors/user'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";

import './style.scss'

function ProfileForm() {

    const dispatch = useDispatch();
    const isLog = useSelector(getIsLogged)
    const userError = useSelector(getUserError);

    const user = (useSelector(getUser));
    const surname = user.surname
    const name = user.name
    const job = user.job

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            surname: surname,
            name: name,
            job: job
        }
    });

    const title = (isLog) => {
        if (!isLog){
            return "Bienvenue sur la création de votre profil utilisateur"
        }
        return "Bienvenue sur la modification votre profil utilisateur"
    }

    const onSubmit = (data) => {
        if (!isLog){
            dispatch(addUser(data))
        }
        dispatch(updateUser(data))
    }

    return (
        <Box
            className="c-profile-form"
            component="form"
            noValidate
            sx={{
                '& .MuiTextField-root': {
                    mb: 2,
                    width: '100%'
                },
                maxWidth: '400px',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                px:'10px'
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* ****************************** If is notLogged ******************************** */}
            <h3 className="c-profile-form__title">{title(isLog)}</h3>
            {isLog === false && (
                <Box
                    className="c-profile-form__group"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <p className="c-profile-form__subtitle">Votre compte</p>
                    <TextField 
                        className="c-profile-form__input"
                        label="Email"
                        helperText= {errors.email?.message}
                        error = {!!errors.email}
                        type="email"{...register("email", {
                            required: "L'email est requis",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "L'email doit être valide.",
                            },
                        })}
                    />
                    <TextField
                        className="c-profile-form__input"
                        label="Mot de passe"
                        helperText= {errors.password?.message}
                        error = {!!errors.password}
                        type="password" {...register("password",{
                            required: "Le mot de passe est requis.",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[!@#$%^?&*])(?=.*[a-zA-Z]).{8,}$/,
                                message: "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.",
                            }
                        })}
                    />
                </Box>
            )}
            {/* **************************** End if is notLogged ****************************** */}

            {/* ******************************** If is logged ********************************** */}
            {isLog === true && (
                <Box
                    className="c-profile-form__group"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <p className="c-profile-form__subtitle">Votre compte</p>
                    <TextField
                        className="c-profile-form__input"
                        label="Ancien mot de passe"
                        helperText= {errors.currentPassword?.message}
                        error = {!!errors.currentPassword}
                        type="password" {...register("currentPassword",{
                            required: "L'ancien mot de passe est requis.",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[!@#$%^?&*])(?=.*[a-zA-Z]).{8,}$/,
                                // message: "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.",
                                message: "Le mot de passe n'est pas valide"
                            }
                        })}
                    />
                    <TextField
                        className="c-profile-form__input"
                        label="Nouveau mot de passe"
                        helperText= {errors.newPassword?.message}
                        error = {!!errors.newPassword}
                        type="password" {...register("newPassword",{
                            required: "Le nouveau mot de passe est requis.",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[!@#$%^?&*])(?=.*[a-zA-Z]).{8,}$/,
                                message: "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.",
                            }
                        })}
                    />

                    {userError !== null && <p className="c-profile-form__error">{userError?.message}</p>}

                </Box>
            )}
            {/* ****************************** End if is logged ******************************** */ }
            <Box
                className="c-profile-form__group"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <p className="c-profile-form__subtitle">Vous</p>
                <AvatarForm
                    className="c-profile-form__avatar"
                    register={register}
                />
                <TextField
                    className="c-profile-form__input"
                    label="Nom"
                    helperText= {errors.surname?.message}
                    error = {!!errors.surname}
                    type= "text"{...register("surname", {
                        required: "Le nom est requis.",
                        minLength: {
                            value : 3,
                            message: "Le nom doit comporter 3 lettres minimum.",
                        }
                    })}
                />
                <TextField
                    className="c-profile-form__input"
                    label="Prénom"
                    helperText= {errors.name?.message}
                    error = {!!errors.name}
                    type= "text"{...register("name", {
                        required: "Le prénom est requis.",
                        minLength: {
                            value : 3,
                            message: "Le prénom doit comporter 3 lettres minimum.",
                        }
                    })}
                />
            </Box>
            <Box
                className="c-profile-form__group"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <p className="c-profile-form__subtitle">Votre poste</p>
                <p className="c-profile-form__textfield">Indiquez ici l’intitulé du poste que vous occupez au sein de l’organisation (p. ex. : graphiste, responsable markteting, etc.)</p>
                <TextField
                    className="c-profile-form__input"
                    label="Intitulé de poste"
                    helperText= {errors.job?.message}
                    error = {!!errors.job}
                    type= "text"{...register("job", {
                        required: "L'intitulé de poste est requis.",
                        minLength: {
                            value : 3,
                            message: "Le titre du poste.",
                        }
                    })}
                />
            </Box>
            <Button
                className="c-profile-form__button"
                sx={{
                    mt:1,
                    mb:3
                }}
                variant="contained"
                type="submit"
            >
                Enregistrer
            </Button>
        </Box>    )
}

export default ProfileForm