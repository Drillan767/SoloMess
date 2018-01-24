class ContactMailer < ActionMailer::Base

  layout 'mailer'

  def contact_form(message)
    require 'rest-client'
    RestClient.post 'https://api:' + ENV['mailgun_api_key'] + '@api.mailgun.net/v3/' + ENV['mailgun_domain_name'] +'/messages',
                    from: 'Site web <contact@josephlevarato.fr>',
                    to: 'jd.levarato@gmail.com',
                    subject: 'Nouveau contact depuis le site',
                    html: render_to_string(
                      template: 'contact_mailer/new_mail_notification',
                      formats: [:html],
                      locals: { message: message }
                    )
  end

end