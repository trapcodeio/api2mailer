import axios from "axios";
import nodemailer = require("nodemailer");
import Mail = require("nodemailer/lib/mailer");

class Api2Mailer {

    public transporter: any;
    public endpoint: string = 'http://localhost:2222';
    public useNodemailer: boolean = false;

    /**
     * Create Transport
     * @param transporter
     * @param endpoint
     */
    static createTransport(transporter: any, endpoint?: string) {

        const api2Mailer = new this;
        api2Mailer.transporter = transporter;

        if (endpoint) api2Mailer.setEndpoint(endpoint);

        return api2Mailer;

    }

    /**
     * Use local nodemailer instead of api.
     */
    useNodemailerInstead() {
        this.transporter = nodemailer.createTransport(this.transporter)
        this.useNodemailer = true;
        return this;
    }

    /**
     * Set Api's Endpoint
     * @param endpoint
     */
    setEndpoint(endpoint: string) {
        this.endpoint = endpoint;
        return this;
    }

    /**
     * Send mail
     * @param mail
     * @param otherConfig
     */
    async sendMail(mail: Mail.Options, otherConfig?: { background: boolean }) {
        if (this.useNodemailer) {
            return (this.transporter as Mail).sendMail(mail);
        } else {
            try {

                let data: Record<string, any> = {mail, transporter: this.transporter};
                if (otherConfig) {
                    data = {...data, ...otherConfig};
                }

                const response = await axios.post(this.endpoint, data);
                if (response) {
                    const {data} = response;
                    return data.info;
                }
            } catch (err) {
                throw Error(err.message)
            }
        }
    }
}

export = Api2Mailer;