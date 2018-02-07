import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import utils from '../lib/functionsLibrary';

export default class Contact extends React.Component {
    render() {
        return(
            <div>
                <Header settings={this.props.settings} />
                <div>
                    <h1>Contact</h1>
                    <form className="form-horizontal" id="new_contact" action="/contact" acceptCharset="UTF-8" method="post">
                        <input name="utf8" type="hidden" value="✓" />
                        <input type="hidden" name="authenticity_token" value={utils.getCSRF()} />

                        <div className="field">
                            <input placeholder="name" type="text" name="contact[nom]" id="contact_nom" />
                        </div>
                        <div className="field">
                            <input placeholder="email" type="text" name="contact[email]" id="contact_email" />
                        </div>
                        <div className="field">
                            <input placeholder="object" type="text" name="contact[objet]" id="contact_objet" />
                        </div>
                        <div className="field">
                            <textarea name="contact[message]" id="contact_message" />
                        </div>

                        <input type="submit" name="commit" value="Send message" data-disable-with="Send message" />
                    </form>
                </div>
                <Footer settings={this.props.settings} />
            </div>

        )
    }
}