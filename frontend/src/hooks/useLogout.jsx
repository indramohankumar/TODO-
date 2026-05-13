import { useAuthcontext } from './useauthcontext';
import { useTodocontext } from '../components/usetodocontext';

export const useLogout = () => {
    const { dispatch } = useAuthcontext();
    const { dispatch: todoDispatch } = useTodocontext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({ type: 'LOGOUT' });
        todoDispatch({ type: 'SET_TODOS', payload: null });
    };

    return { logout };
};
