'use client'

import { useState } from "react";
import { useTranslation } from '@/app/i18n/client';

export default function ContactForm({
  fromEmail = "noreply@mail.visionaryadvance.com",
  toEmails = ["brandon@visionaryadvance.com"],
  subject = "New Contact Form Submission"
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      from: fromEmail,
      to: toEmails,
      reply_to: formData.email,
      subject: `${subject} from ${formData.firstName} ${formData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #059669;">New Contact Submission</h2>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Message:</strong><br>${formData.message}</p>
        </div>
      `,
      text: `
        New Contact Submission
        
        Name: ${formData.firstName} ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Message: ${formData.message}
      `
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();

      if (res.ok) {
        alert(t('contact.form.success'));
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        console.error("Email error:", resJson);
        alert(t('contact.form.error'));
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert(t('contact.form.server_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-white text-base font-medium">{t('contact.form.first_name')}</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t('contact.form.first_name_placeholder')}
              className="w-full h-12 px-3 rounded-full border border-primary-green bg-gray-50 text-black-900 placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-primary-green"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-white text-base font-medium">{t('contact.form.last_name')}</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t('contact.form.last_name_placeholder')}
              className="w-full h-12 px-3 rounded-full border border-black-200 bg-gray-50 text-black-900 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-white text-base font-medium">{t('contact.form.email_label')}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('contact.form.email_placeholder')}
            className="w-full h-12 px-3 rounded-full border border-black-200 bg-gray-50 text-black-900 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green"
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="block text-white text-base font-medium">{t('contact.form.phone_label')}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('contact.form.phone_placeholder')}
            className="w-full h-12 px-3 rounded-full border border-black-200 bg-gray-50 text-black-900 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-white text-base font-medium">{t('contact.form.message_label')}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('contact.form.message_placeholder')}
            rows={5}
            className="w-full p-3 rounded-2xl border border-black-200 bg-gray-50 text-black-900 placeholder-black-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green"
            required
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center h-12 px-5 bg-primary-green text-black-900 rounded-full font-medium text-base hover:bg-primary-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit_button')}
      </button>
    </form>
  );
}