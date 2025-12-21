
type allTextType = {
    header: {
        logIn: string,
        logOut: string,
        language: string
    },
    navigation: {
        profile: string,
        messages: string,
        users: string,
        posts: string
    },
    authorization: {
        logIn: string,
        signUp: string,
        emailPlaceholder: string,
        passwordPlaceholder: string,
        namePlaceholder: string,
        countryPlaceholder: string,
        cityPlaceholder: string,
        isRequired: string,
        submit: string,
        verifyTitle: string,
        verify: string,
        resendCode: string,
        back: string
    },
    profile: {
        country: string,
        city: string,
        setStatus: string,
        edit: string,
        changeProfilePhoto: string,
        changeAvatar: string,
        changeAbout: string,
        save: string,
        deleteAccount: string
    },
    posts: {
        post: string,
        newPostPlaceholder: string,
        morePosts: string
    },
    users: {
        follow: string,
        unFollow: string,
        findUsers: string,
        filterUsers: string,
        all: string,
        friends: string
    },
    messages: {
        send: string,
        save: string,
        newMessagePlaceholder: string,
        edit: string,
        delete: string,
        edited: string
    }
}

export default allTextType