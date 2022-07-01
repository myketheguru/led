import create from "zustand";

interface IUseUser {
    userType: ('mentor' | 'learner')
    setUserType: (type: ('mentor' | 'learner')) => void
}

const useUser = create<IUseUser>(set => ({
    userType: 'learner',
    setUserType: (type: IUseUser['userType']) => set(state => ({
        userType: type
    }))
}))

export default useUser