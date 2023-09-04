import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
    username: yup.string().trim().required('Required'),
    email: yup.string().lowercase().trim().required('Required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is incorrect'),
    password: yup.string().trim().required('Required').matches(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d`~₴/*!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]{8,}$/gm,
        "The password must contain at least eight characters, one english letter and one number"
    ),
})

export const loginSchema = yup.object().shape({
    emailOrUsername: yup.string().required('Required'),
    password: yup.string().required('Required'),
})