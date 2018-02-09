import React from 'react';

export default class Notifications extends React.Component {
    render() {

        let message = this.props.message;

        return (
            message !== null &&
            <div>
                {
                    message.notice !== null &&
                    <div className="alert alert-success" role="alert">
                        <strong>Thank you!</strong> I'll contact you back as soon as I can!
                    </div>
                }
                {
                    message.alert !== null &&
                    <div className="alert alert-danger" role="alert">
                        <strong>The following errors blocked the message from being sent:</strong>
                        <ul>
                            {
                                message.alert.split('&').map(function(message, i) {
                                    return (
                                        <li key={i}>{message}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
        )
    }
}