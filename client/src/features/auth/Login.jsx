import react, { useEffect, useRef, useState } from "react"
import { useLoginMutation } from "./authApiSlice"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from "react-router-dom"
import { setToken } from "./authSlice";
import { useDispatch } from "react-redux";
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginFunc, {isError, error, isSuccess,data}] =useLoginMutation()
    const userName = useRef('')
    const password = useRef('')



    const [visible, setVisible] = useState(true);
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

const { roles } = useAuth()


    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
           console.log("data!!!",roles);
            if (isSuccess)
            navigate("/")

        }
    }, [isSuccess])
    const cancal=()=>{
        setVisible(false)
    }

    const toast = useRef(null);


const formik = useFormik({

        initialValues: {
            password: "",
            userName: "",
            name: "",
            email: "",
            address: "",
            phone: ""

        },
        validate: (data) => {
            let errors = {};

            if (!data.userName)
                errors.userName = 'UserName - userName is required.';

            if (!data.password)
                errors.password = 'Password - password is required.';

            return errors;
        },
        onSubmit: async (data) => {
            //data && show(data);

       await loginFunc(data)
            formik.resetForm();
            setVisible(false)
        }
    })
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFromData({
    //         ...formData,
    //         [name]: value,
    //     });
    // }
    // const handleLogin = () => {

    //     const data = { userName: userName.current, password: password.current }
    //     loginFunc(data)
    //    setVisible(false)
    // }

    return (
        <div className="card flex justify-content-center">

        {/* //<Button onClick={register}label="Update Details" severity="success" raised/> */}
        <Dialog
            visible={visible}
            modal
            onHide={() => setVisible(false)}
            content={({ hide }) => (
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">

                    <span className="p-float-label">
                        <Toast ref={toast} />
                        <InputText
                            id="userName"
                            name="userName"
                            value={formik.values.userName}
                            onChange={(e) => {
                                formik.setFieldValue('userName', e.target.value);
                            }}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('userName') })}
                        />
                        <label htmlFor="input_value">UserName</label>
                    </span>
                    {getFormErrorMessage('userName')}

                    <span className="p-float-label">
                        <Toast ref={toast} />
                        <InputText
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={(e) => {
                                formik.setFieldValue('password', e.target.value);
                            }}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                        />
                        <label htmlFor="input_value">Password</label>
                    </span>
                    {getFormErrorMessage('password')}
                    <Button type="submit" label="Login" />
                        <Button type="submit" onClick={cancal}label="Cancal" />
                    </form>
                )}
            ></Dialog>
        </div>

    )
}

export default Login