import PropTypes from 'prop-types';
import React, { useState, Fragment, useRef } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const formValues = {
  name: '',
  email: '',
  message: '',
};

const ContactModal = ({ closeModal }) => {
  const formRef = useRef();
  const [validForm, setValidForm] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [sent, setSent] = useState(false);

  const onChangeInput = (field, value) => {
    formValues[field] = value;
    const { name, email, message } = formValues;
    const invalidEmail = !emailRegex.test(formValues.email);
    setValidForm(name.length > 3 && email.length > 3 && message.length > 3 && !invalidEmail);
    setShowEmailError(invalidEmail && email.length > 0);
  };
  const onSubmit = () => {
    setSent(true);
    formRef.current.submit();
    setTimeout(() => {
      closeModal();
    }, 2500);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Contact me</p>
          <button type="button" className="delete" aria-label="close" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          {sent ? (
            <div>
              <center>
                <h2 style={{ marginBottom: '18px' }}>
                  Email is being sent... I&apos;ll reply soon. Thanks!
                </h2>
              </center>
            </div>
          ) : (
            <form method="POST" action="https://formspree.io/martinsporto@gmail.com" ref={formRef}>
              <input type="hidden" name="_subject" value="Contact" />
              <input type="hidden" name="_next" value="//" />
              <div className="field">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <div className="control">
                  <input
                    name="name"
                    className="input"
                    type="text"
                    placeholder="Your name"
                    onChange={e => onChangeInput('name', e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <div className="control">
                  <input
                    name="_replyto"
                    className={`input ${showEmailError ? 'is-danger' : ''}`}
                    type="email"
                    placeholder="Your email"
                    onChange={e => onChangeInput('email', e.target.value)}
                  />
                </div>
                {showEmailError && <p className="help is-danger">This email is invalid</p>}
              </div>
              <div className="field">
                <label htmlFor="message" className="label">
                  Message
                </label>
                <div className="control">
                  <textarea
                    name="message"
                    className="textarea"
                    placeholder="Your message"
                    onChange={e => onChangeInput('message', e.target.value)}
                  />
                </div>
              </div>
            </form>
          )}
        </section>
        <footer className="modal-card-foot">
          {!sent && (
            <Fragment>
              <button
                type="button"
                className="button is-primary"
                disabled={!validForm}
                onClick={onSubmit}
              >
                Send
              </button>
              <button type="button" className="button" onClick={closeModal}>
                Cancel
              </button>
            </Fragment>
          )}
        </footer>
      </div>
    </div>
  );
};

ContactModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ContactModal;
