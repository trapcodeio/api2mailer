"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const nodemailer = require("nodemailer");
class Api2Mailer {
    constructor() {
        this.endpoint = 'http://localhost:2222';
        this.useNodemailer = false;
    }
    /**
     * Create Transport
     * @param transporter
     * @param endpoint
     */
    static createTransport(transporter, endpoint) {
        const api2Mailer = new this;
        api2Mailer.transporter = transporter;
        if (endpoint)
            api2Mailer.setEndpoint(endpoint);
        return api2Mailer;
    }
    /**
     * Use local nodemailer instead of api.
     */
    useNodemailerInstead() {
        this.transporter = nodemailer.createTransport(this.transporter);
        this.useNodemailer = true;
        return this;
    }
    /**
     * Set Api's Endpoint
     * @param endpoint
     */
    setEndpoint(endpoint) {
        this.endpoint = endpoint;
        return this;
    }
    /**
     * Send mail
     * @param mail
     * @param otherConfig
     */
    async sendMail(mail, otherConfig) {
        if (this.useNodemailer) {
            return this.transporter.sendMail(mail);
        }
        else {
            try {
                let data = { mail, transporter: this.transporter };
                if (otherConfig) {
                    data = { ...data, ...otherConfig };
                }
                const response = await axios_1.default.post(this.endpoint, data);
                if (response) {
                    const { data } = response;
                    return data.info;
                }
            }
            catch (err) {
                throw Error(err.message);
            }
        }
    }
}
module.exports = Api2Mailer;
