import { useState } from 'react';


function RegistrationForm() {
    const [Formdata, setFormdata] = useState({ username: "", password: "", email: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let validationErrors = {};
        const username= Formdata.username;
        const password= Formdata.password;
        const email= Formdata.email;
        if (!username) validationErrors.username = 'Username cannot be empty';
        if (!email) validationErrors.email = 'Email cannot be empty';
        if (!password) validationErrors.password = 'Password cannot be empty';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Submit the form
            console.log(Formdata);
        }
    };
    //  ["value={username}", "value={email}", "value={password}"]

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={Formdata.username}
                        onChange={handleChange}
                        
                    />
                    {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        value={Formdata.email}
                        onChange={handleChange}
                        
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={Formdata.password}
                        onChange={handleChange}
                        
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default RegistrationForm;
