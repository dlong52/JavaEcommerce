import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: "",
    username: "",
    email: "",
    address: "",
    phone_number: "",
    image: "",
    accessToken: "",
    role: "",
    isLoading: false,
}
export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { userId, username, email, phoneNumber, address, accessToken, image, role } = action.payload
            state.userId = userId
            state.username = username || email;
            state.email = email;
            state.address = address
            state.image = image
            state.phone_number = phoneNumber
            state.accessToken = accessToken
            state.role = role
        },
        resetUser: (state) => {
            state.userId = null
            state.username = null
            state.email = null
            state.address = null
            state.phone_number = null
            state.accessToken = null
            state.image = null
            state.role = null
        }
    }
})
export const { updateUser, resetUser } = userSlide.actions
export default userSlide.reducer