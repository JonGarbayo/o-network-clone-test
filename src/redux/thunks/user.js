import { createAsyncThunk } from '@reduxjs/toolkit'
import  users  from "../../data/AppUser"

export const login = createAsyncThunk("users/login", async (credentials, thunkApi) => {
    try { 
        console.log(users)
        const user = users.find(user => user.email === credentials.email && user.password === credentials.password);

        if (!user)
            return thunkApi.rejectWithValue({
                status: 401,
                message: 'Identifiants invalides'
            })

        if (user.disabled)
            return thunkApi.rejectWithValue({
                status: 403,
                message: "Votre compte est desactivée. Veuillez contacté le gérant de l'organisation."
            })

        return user

    }
    catch (error) {
        return thunkApi.rejectWithValue({ 
            status: 500, 
            message: "Une erreur s'est produite lors de la connexion." 
        });
    }
})

export const addUser = createAsyncThunk("user/addUser", async (data, thunkAPI) => {
    try {
        // TODO remove fix before Api connect
        // Temporary profile_picture fix to remove before Api connect
        data.profilePicture = "https://randomuser.me/api/portraits/women/33.jpg"
        // End Temporary profile_picture fix

        const newUserEmail = users.find(({email}) => email === data.email)
        console.log(data.email)
        if (newUserEmail) {
            return thunkAPI.rejectWithValue({status: 409, message: "Cette adresse e-mail est déjà associée à un compte"});
        }
        return data
    }
    catch (error) {
        return thunkAPI.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (data, thunkAPI) => {
    try {
        if (!data.currentPassword) {
            delete data.currentPassword
            delete data.newPassword
        }
        // TODO: Remove the else part when the server is ready
        else {
            const user = thunkAPI.getState().user;

            const isValid = users.some(({email, password}) =>
                email === user.email &&
                password === data.currentPassword
            );

            if (!isValid) {
                return thunkAPI.rejectWithValue({status: 422, message: "L'ancien mot de passe est incorrect"});
            }
    
            delete data.currentPassword;
            delete data.newPassword;
        }

        // TODO remove fix before Api connect
        // Temporary profile_picture fix to remove before Api connect
        data.profilePicture = "https://randomuser.me/api/portraits/women/33.jpg"
        // End Temporary profile_picture fix
        return data
    }
    catch (error) {
        return thunkAPI.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
    }
})
