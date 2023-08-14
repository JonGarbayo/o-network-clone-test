import { createSlice } from "@reduxjs/toolkit";
import { validateOrganization, createOrganization, fetchOrganization } from "../thunks/organization";


const initialState = {

    id: null,
    name: "",
    loading: false,
    error: null,
}

const slice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        cleanOrganizationState(state){
            state.id = null,
            state.name = "",
            state.loading = false,
            state.error = null
        }
       
    },
    extraReducers: builder => { 
        builder

            .addCase(validateOrganization.fulfilled, (state, {payload: organizationName}) => {
                state.name = organizationName
                state.loading= false
                state.error= null       
            })
            .addCase(validateOrganization.pending, (state) => {
                state.loading = true;
            })
            .addCase(validateOrganization.rejected, (state, {payload: error}) => { 
                state.name= ""
                state.loading = false
                state.error = error
            })

            .addCase(createOrganization.fulfilled, (state, {payload: newOrganization })=>{
                state.name = newOrganization.name
                state.id = newOrganization.id
                state.error=null
            })

            .addCase(createOrganization.rejected, (state, {payload: error})=>{
                state.id = null
                state.name = ""
                state.error = error
            })

            .addCase(fetchOrganization.fulfilled, (state, {payload:  organization })=>{
                state.id = organization.id
                state.name = organization.name
                state.error = null
            })
            .addCase(fetchOrganization.rejected, (state, {payload: error })=>{
                state.name= "erreur de chargement du nom"
                state.error = error
            })
    },
});


export default slice.reducer
export const {cleanOrganizationState} = slice.actions
export { validateOrganization, createOrganization, fetchOrganization } 

