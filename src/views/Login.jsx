import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Validator from 'validator';

//Components
import {
    Page,
    Post,
    Form,
    FormInput,
    FormSubmit
} from '../components';

const Login = () => {
    const [inputResponse,setInputResponse] = useState('');
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [isAnimating,setIsAnimating] = useState(false);

    if(window.sessionStorage.getItem('isLoggedIn') || isLoggedIn){
        return <Redirect to={`/user/${window.sessionStorage.getItem('loggedUser')}`}/>
    }else{
        const submitForm = (e) => {
            e.preventDefault();

            const form = e.target;
            const data = new FormData(form);

            if(!Validator.isEmail(data.get('e-mailInput'))){
                setIsAnimating(true);
                setInputResponse('Please insert a valid e-mail and try again');

                return;
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const myBody = {
                email: data.get('e-mailInput'),
                password: data.get('passwordInput')
            };
    
            fetch(form.action, {
                headers: myHeaders,
                method: form.method,
                credentials: 'include',
                body: JSON.stringify(myBody)
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(!data.wasSuccessful){
                    setIsAnimating(true);
                    setInputResponse(data.description);
                }else{
                    window.sessionStorage.setItem('isLoggedIn', true);
                    window.sessionStorage.setItem('loggedUser', data.loggedUser);
                    setIsLoggedIn(true);
                }
            })
            .catch(() => {
                setIsAnimating(true);
                setInputResponse('Server error, please try again');
            })
        };

        const focusForm = () => {
            if(isAnimating && inputResponse !== ''){
                setIsAnimating(false);
                setInputResponse('');
            }
        };
        
        return(
            <Page>
                <Post>
                    <Form
                        formAction={`${process.env.REACT_APP_BACK_END_HOST}/api/v1/auth`}
                        formMethod="POST"
                        formSubmitHandler={submitForm}
                        formFocusHandler={focusForm}
                        formTitle='Login Page'
                        animationState={isAnimating}
                        feedbackText={inputResponse}
                    >
                        <FormInput
                            inputType='text'
                            inputLabel='E-mail'
                        />
                        <FormInput
                            inputType='password'
                            inputLabel='Password'
                        />
                        <FormSubmit
                            isDisabled={isAnimating}
                            submitText='Login'
                        />
                    </Form>
                </Post>
            </Page>
        );
    }
}

export default Login;