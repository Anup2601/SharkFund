const TermsAndConditions = () => {
  return (
    <div className="max-w-full mx-auto p-6 text-gray-200 bg-gray-900 min-h-screen ">
      <h1 className="text-4xl font-bold text-teal-400 mb-6">Terms and Conditions</h1>

      <p className="mb-4 text-gray-300">
        These Terms and Conditions ("Terms") govern your use of our cloud services platform ("Service"). By accessing or using the Service, you agree to be bound by these Terms.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-teal-300 mb-2">1. Use of Service</h2>
        <p className="text-gray-400">
          You agree to use our cloud services only for lawful purposes and in accordance with all applicable laws and regulations. Unauthorized access, distribution, or misuse of the Service is strictly prohibited.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-teal-300 mb-2">2. Account Registration</h2>
        <p className="text-gray-400">
          To access certain features of the Service, you must register for an account. You are responsible for maintaining the confidentiality of your login information and for all activities under your account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-teal-300 mb-2">3. Data and Privacy</h2>
        <p className="text-gray-400">
          We respect your privacy and protect your data in accordance with our Privacy Policy. By using our Service, you consent to the collection and use of your data as outlined in the policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-teal-300 mb-2">4. Service Availability</h2>
        <p className="text-gray-400">
          We strive to maintain 99.9% uptime for our cloud services. However, we are not liable for any downtime, service interruptions, or loss of data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-teal-300 mb-2">5. Intellectual Property</h2>
        <p className="text-gray-400">
          All content, branding, and technology used in our Service are the intellectual property of the company. Unauthorized reproduction or use is strictly prohibited.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-teal-300 mb-2">6. Termination</h2>
        <p className="text-gray-400">
          We reserve the right to suspend or terminate your access to the Service at any time for violations of these Terms or for any other reason at our discretion.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-teal-300 mb-2">7. Changes to Terms</h2>
        <p className="text-gray-400">
          We may update these Terms from time to time. Continued use of the Service after any changes constitutes your acceptance of the new Terms.
        </p>
      </section>

      <p className="text-gray-400 mt-8">
        If you have any questions about these Terms, please contact our support team at <a href="mailto:support@cloudprovider.com" className="text-teal-400 underline">support@sharkfund.com</a>.
      </p>
    </div>
  );
};

export default TermsAndConditions;
