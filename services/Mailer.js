const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

const keys = require('../config/keys');


class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackSettings);
  }

  addRecipients() {
    const personalize = helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  async send() {
    try {
      const request = await this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
      });

      const response = await this.sgApi.API(request);
      return response;
    } catch(err) {
      console.log(err.response.body.errors);
    }
  }
}

module.exports = Mailer;
