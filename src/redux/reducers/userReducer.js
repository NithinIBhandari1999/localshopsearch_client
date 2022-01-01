import type from '../types';
import appConstant from '../../constants/appConstant';

const initialState = {
    authLoading: 'true',

    userType: appConstant.userType.none,
    statusEmailVerified: appConstant.statusEmailVerified.false,

    userId: '',
    userFullName: '',
    userEmail: '',
};

const stateFunction = (state = initialState, action) => {
    switch (action.type) {
        case type.user.SET_USER_AUTH:
            return {
                statusIsLoggedIn: action.payload.statusIsLoggedIn,
                userType: action.payload.userType,
                statusEmailVerified: action.payload.statusEmailVerified,

                userId: action.payload.userId,
                userFullName: action.payload.userFullName,
                userEmail: action.payload.userEmail,
            };

        default:
            return state;
    }
};

export default stateFunction;
