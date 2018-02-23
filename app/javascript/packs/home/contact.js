import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import utils from '../lib/functionsLibrary';
import Notifications from "../layout/notifications";

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {contact: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.href + '.json', function(contact) {
            self.setState({contact: contact});
        });
    }
    render() {

        let contact = this.state.contact;

        return(
            <div>
                <Notifications message={contact}/>
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

        )
    }
}