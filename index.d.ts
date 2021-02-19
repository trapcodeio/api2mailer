import Mail = require("nodemailer/lib/mailer");
declare class Api2Mailer {
    transporter: any;
    endpoint: string;
    useNodemailer: boolean;
    /**
     * Create Transport
     * @param transporter
     * @param endpoint
     */
    static createTransport(transporter: any, endpoint?: string): Api2Mailer;
    /**
     * Use local nodemailer instead of api.
     */
    useNodemailerInstead(): this;
    /**
     * Set Api's Endpoint
     * @param endpoint
     */
    setEndpoint(endpoint: string): this;
    /**
     * Send mail
     * @param mail
     * @param otherConfig
     */
    sendMail(mail: Mail.Options, otherConfig?: {
        background: boolean;
    }): Promise<any>;
}
export = Api2Mailer;
