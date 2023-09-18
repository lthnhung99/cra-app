import React from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const registerSchema = yup.object({
    usename: yup.string()
        .required("Use name là bắt buộc")
        .max(30, "Use name tối đa là 30 ký tự")
        .min(5, "Use name tối thiểu là 5 ký tự"),
    email: yup.string()
        .required("Email là bắt buộc")
        .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email không hợp lệ"),
    password: yup.string()
        .required("Password là bắt buộc")
        .min(8, "Password tối thiểu là 8 ký tự"),
    confirmPassword: yup.string()
        .required("Confirm password là bắt buộc")
        .min(8, "Password tối thiểu là 8 ký tự")
        .oneOf([yup.ref("password")], "Password không trùng nhau")
})
const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(registerSchema)
    })
    const handleRegister = (data) => {
        console.log(data);
    }
    return (
        <div className="container d-flex justify-content-center" style={{ backgroundColor: "lightblue" }}>
            <div className="row col-md-6">
                <h1 className="text-center mt-5">Register Form</h1>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="form-group mb-3">
                        <label className="lable-form">Use Name</label>
                        <input type="text" className="form-control" {...register("usename")} />
                        <span className="text-danger">{errors?.usename?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Email</label>
                        <input type="text" className="form-control" {...register("email")} />
                        <span className="text-danger">{errors?.email?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Password</label>
                        <input type="password" className="form-control" {...register("password")} />
                        <span className="text-danger">{errors?.password?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Confirm Password</label>
                        <input type="password" className="form-control" {...register("confirmPassword")} />
                        <span className="text-danger">{errors?.confirmPassword?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary me-3">Register</button>
                        <button type="button" className="btn btn-danger" onClick={() => reset()}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;