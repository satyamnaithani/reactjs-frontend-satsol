import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index'
import axios from 'axios';
import {Redirect} from 'react-router-dom'



class FormLogin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
    }
  
   
    render() {
        console.log(this.props.token)
        if(Object.keys(this.props.loginData).length === 0) {}
        else {
            loginPostRequest(this.props.loginData)
        }
        if(localStorage.getItem('token') !== null) {
            this.props.loginSessionStart(localStorage.getItem('token'))
            return <Redirect to= '/dashboard'/>
        }
      return (
          <div style={{background: '#dbf7c3', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', width: '100%', position: 'fixed'}}>
        <div style={{backgroundColor: '#b9f783', width: '400px', height: '400px', margin: '150px auto', borderRadius: '15%', textAlign: 'left'}}>
        <h1 style={{textAlign: 'center', color: 'white'}}>Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                 this.props.loginCredentials(values); 
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form style= {{paddingLeft: '30px'}}>
                <label>
                    Email:<br/>
                <Field style={{width: '290px', height: '45px',border: 'none', borderRadius: '5%', margin: '15px auto' }} type="email" name="email" />
              <ErrorMessage name="email" component="div" />
                </label>
             
              <br/>
              <label>
                  Password:<br/>
                  <Field style={{width: '290px', height: '45px',border: 'none', borderRadius: '5%', margin: '15px auto' }} type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              </label><br/><br/>
              <button style={{width: '290px', height: '45px',border: 'none', borderRadius: '5%', margin: '15px auto' }} type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return state
};


function loginPostRequest(values) {
    axios({
        method: 'post',
        url: 'https://satsol-backend.herokuapp.com/user/login',
        data: {
          email: values.email,
          password: values.password
        }
      })
      .then(response => {
       localStorage.setItem('token', response.data.token)
      })
      .catch(error => console.log(error))
}

export default  connect (mapStateToProps,actionCreators)(FormLogin)