import React,{useState} from "react";

function Register() {
    const [state,setState] = useState({
        fullName:'',
        email:'',
        password:''
    })
    const handleInputValue = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // call API
        alert(JSON.stringify(state))
    }
    const handleChangeUser = () => {
        setState({
            ...state,
            "fullName":"Hồng Nhung",
            "email": 'nhung@gmail.com',
            "password": '123456'
        })
    }

    const {fullName, email, password } = state;
    return(
        <form onSubmit={handleSubmit} className="row col-sm-4 " style={{padding:"30px"}}>
        <h3 className="text-success">Register Form</h3>
        <div className="form-group mb-3">
            <label className="form-label">Full name</label>
            <input type="text" name="fullName" className="form-control"
                onInput={handleInputValue}
                value={fullName}
            />
        </div>
        <div className="form-group mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control"
                onInput={handleInputValue}
                value={email}
            />
        </div>
        <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control"
                onInput={handleInputValue}
                value={password}
            />
        </div>
        <div className="form-group mb-3">
            <button type="submit" className="btn btn-primary btn-sm me-2">Register</button>
            <button type="button" className="btn btn-danger btn-sm"
                    onClick={handleChangeUser}
                >Change User</button>   
        </div>
    </form>
    )
}

export default Register;